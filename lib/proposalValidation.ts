export interface ProposalFormValues {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  companyName: string;
  country: string;
  industry: string;
  companySize: string;
  serviceRequired: string;
  estimatedBudget: string;
  preferredTimeline: string;
  expectedGoLive: string;
  servicesOfInterest: string[];
  projectDescription: string;
  file: File | null;
}

export type ProposalErrors = Partial<Record<keyof ProposalFormValues, string>>;

export const proposalOptions = {
  industry: [
    "Retail & E-commerce",
    "Healthcare & Pharma",
    "Manufacturing & Industrial",
    "Finance & Banking",
    "Technology & SaaS",
    "Logistics & Supply Chain",
    "Government & NGO",
    "Other",
  ],
  companySize: ["1 - 10", "11 - 50", "51 - 200", "201 - 500", "500+ employees"],
  serviceRequired: [
    "Artificial Intelligence & ML",
    "Business Intelligence & Data Analytics",
    "ERP (Odoo) Implementation",
    "Cloud Migration & Architecture",
    "Custom Software Development",
    "Digital Transformation",
  ],
  estimatedBudget: ["Under $2,000", "$2,000 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000+"],
  preferredTimeline: ["Immediately", "Within 30 Days", "1 - 3 Months", "3 - 6 Months", "Flexible / Planning Stage"],
  servicesOfInterest: [
    "AI Solutions",
    "Machine Learning",
    "Business Intelligence",
    "Cloud Computing",
    "ERP (Odoo)",
    "Microsoft Fabric",
    "Azure",
    "Data Warehousing",
    "Web Applications",
    "Mobile Applications",
    "Automation",
    "Managed Support",
  ],
} as const;

const invalidText = (value: string) => /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value) || /<\/?[a-z][^>]*>/i.test(value);
const namePattern = /^[\p{L}\p{M}][\p{L}\p{M} .'\u2019-]*$/u;
const phonePattern = /^\+?[0-9().\-\s]+$/;

function validateOptionalText(value: string, label: string, maxLength: number): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length > maxLength) return `${label} must be ${maxLength} characters or fewer.`;
  if (invalidText(trimmed)) return `${label} contains unsupported characters.`;
  return undefined;
}

function isValidDateOnly(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validateFile(file: File | null): string | undefined {
  if (!file) return undefined;
  if (file.size > 10 * 1024 * 1024) return "Attachments must be 10 MB or smaller.";
  const extension = file.name.split(".").pop()?.toLowerCase();
  const allowedMimeTypes: Record<string, string[]> = {
    pdf: ["application/pdf"],
    doc: ["application/msword", "application/octet-stream"],
    docx: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/octet-stream"],
    xls: ["application/vnd.ms-excel", "application/octet-stream"],
    xlsx: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/octet-stream"],
    ppt: ["application/vnd.ms-powerpoint", "application/octet-stream"],
    pptx: ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/octet-stream"],
    png: ["image/png"],
    jpg: ["image/jpeg"],
    jpeg: ["image/jpeg"],
  };
  if (!extension || !allowedMimeTypes[extension]?.includes(file.type)) {
    return "Choose a PDF, Office document, PNG, or JPEG file.";
  }
  return undefined;
}

export function validateProposalStep(step: number, values: ProposalFormValues): ProposalErrors {
  const errors: ProposalErrors = {};

  if (step === 0) {
    const name = values.fullName.trim();
    if (name.length < 2 || name.length > 120 || !namePattern.test(name)) {
      errors.fullName = "Enter a name (2–120 characters; letters, spaces, apostrophes, periods, and hyphens).";
    }
    if (values.email.trim().length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      errors.email = "Enter a valid email address.";
    }
    const jobTitleError = validateOptionalText(values.jobTitle, "Job title", 100);
    if (jobTitleError) errors.jobTitle = jobTitleError;
    const phone = values.phone.trim();
    if (phone && (!phonePattern.test(phone) || phone.replace(/\D/g, "").length < 7 || phone.replace(/\D/g, "").length > 15)) {
      errors.phone = "Enter a valid phone number with 7–15 digits.";
    }
  }

  if (step === 1) {
    const companyError = validateOptionalText(values.companyName, "Company name", 160);
    if (companyError) errors.companyName = companyError;
    const countryError = validateOptionalText(values.country, "Country / region", 100);
    if (countryError) errors.country = countryError;
    if (values.industry && !proposalOptions.industry.includes(values.industry as (typeof proposalOptions.industry)[number])) {
      errors.industry = "Choose an industry from the list.";
    }
    if (values.companySize && !proposalOptions.companySize.includes(values.companySize as (typeof proposalOptions.companySize)[number])) {
      errors.companySize = "Choose a company size from the list.";
    }
  }

  if (step === 2) {
    if (values.serviceRequired && !proposalOptions.serviceRequired.includes(values.serviceRequired as (typeof proposalOptions.serviceRequired)[number])) {
      errors.serviceRequired = "Choose a service from the list.";
    }
    if (values.estimatedBudget && !proposalOptions.estimatedBudget.includes(values.estimatedBudget as (typeof proposalOptions.estimatedBudget)[number])) {
      errors.estimatedBudget = "Choose a budget range from the list.";
    }
    if (values.preferredTimeline && !proposalOptions.preferredTimeline.includes(values.preferredTimeline as (typeof proposalOptions.preferredTimeline)[number])) {
      errors.preferredTimeline = "Choose a timeline from the list.";
    }
    if (values.expectedGoLive) {
      if (!isValidDateOnly(values.expectedGoLive)) {
        errors.expectedGoLive = "Enter a valid target date.";
      } else if (values.expectedGoLive < new Date().toISOString().slice(0, 10)) {
        errors.expectedGoLive = "Target date cannot be in the past.";
      }
    }
  }

  if (step === 3) {
    if (values.servicesOfInterest.length > 12 || new Set(values.servicesOfInterest).size !== values.servicesOfInterest.length ||
      values.servicesOfInterest.some((item) => !proposalOptions.servicesOfInterest.includes(item as (typeof proposalOptions.servicesOfInterest)[number]))) {
      errors.servicesOfInterest = "Please select valid services from the list.";
    }
  }

  if (step === 4) {
    const description = values.projectDescription.trim();
    if (description.length > 5000) {
      errors.projectDescription = "Project description must be 5,000 characters or fewer.";
    } else if (description.length > 0 && description.length < 20) {
      errors.projectDescription = "If provided, describe your project in at least 20 characters.";
    } else if (invalidText(description)) {
      errors.projectDescription = "Project description contains unsupported characters.";
    }
    const fileError = validateFile(values.file);
    if (fileError) errors.file = fileError;
  }

  return errors;
}
