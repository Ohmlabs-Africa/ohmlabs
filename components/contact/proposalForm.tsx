"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  Send,
  User,
  Briefcase,
  Clock,
  Upload,
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
} from "lucide-react";
import { ApiError, apiRequest } from "@/lib/api";
import { toast } from "sonner";
import {
  proposalOptions,
  validateProposalStep,
  type ProposalErrors,
} from "@/lib/proposalValidation";

// Initial Form State
interface FormDataState {
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

const initialFormData: FormDataState = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  companyName: "",
  country: "",
  industry: "",
  companySize: "",
  serviceRequired: "",
  estimatedBudget: "",
  preferredTimeline: "",
  expectedGoLive: "",
  servicesOfInterest: [],
  projectDescription: "",
  file: null,
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
    scale: 0.98,
  }),
};

export default function ProposalForm() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<ProposalErrors>({});
  const [website, setWebsite] = useState("");

  const totalSteps = 5;

  const updateField = <K extends keyof FormDataState>(field: K, value: FormDataState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const toggleServiceOfInterest = (service: string) => {
    setValidationErrors((prev) => {
      if (!prev.servicesOfInterest) return prev;
      const next = { ...prev };
      delete next.servicesOfInterest;
      return next;
    });
    setFormData((prev) => {
      const exists = prev.servicesOfInterest.includes(service);
      return {
        ...prev,
        servicesOfInterest: exists
          ? prev.servicesOfInterest.filter((s) => s !== service)
          : [...prev.servicesOfInterest, service],
      };
    });
  };

  const handleNext = useCallback(() => {
    const errors = validateProposalStep(currentStep, formData);
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, formData, totalSteps]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        // Don't trigger if user is inside a textarea
        if ((e.target as HTMLElement).tagName === "TEXTAREA") return;
        e.preventDefault();
        if (currentStep < totalSteps - 1) {
          handleNext();
        }
      } else if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, handleNext, handlePrev, totalSteps]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const errors: ProposalErrors = {};
    let firstInvalidStep: number | undefined;
    for (let step = 0; step < totalSteps; step += 1) {
      const stepErrors = validateProposalStep(step, formData);
      Object.assign(errors, stepErrors);
      if (firstInvalidStep === undefined && Object.keys(stepErrors).length > 0) firstInvalidStep = step;
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      if (firstInvalidStep !== undefined && firstInvalidStep !== currentStep) {
        setDirection(firstInvalidStep > currentStep ? 1 : -1);
        setCurrentStep(firstInvalidStep);
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload = new FormData();
    payload.set("name", formData.fullName.trim());
    payload.set("email", formData.email.trim());
    payload.set("company", formData.companyName.trim());
    payload.set("message", formData.projectDescription.trim() || "Proposal request");
    payload.set("website", website);
    payload.set("details", JSON.stringify({
      jobTitle: formData.jobTitle.trim(),
      phone: formData.phone.trim(),
      country: formData.country.trim(),
      industry: formData.industry,
      companySize: formData.companySize,
      serviceRequired: formData.serviceRequired,
      estimatedBudget: formData.estimatedBudget,
      preferredTimeline: formData.preferredTimeline,
      expectedGoLive: formData.expectedGoLive,
      servicesOfInterest: formData.servicesOfInterest,
      projectDescription: formData.projectDescription.trim(),
    }));
    if (formData.file) payload.set("attachment", formData.file);

    try {
      const result = await apiRequest<{ notificationSent?: boolean }>("/api/contact", { method: "POST", body: payload });
      if (result.notificationSent === false) {
        toast.warning("Your proposal was received, but the email notification could not be delivered.");
      } else {
        toast.success("Your proposal was received. We’ll be in touch soon.");
      }
      setIsSubmitted(true);
    } catch (error) {
      const message = error instanceof ApiError ? error.message : "Your proposal could not be submitted. Please try again.";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto flex min-h-[550px] max-w-3xl flex-col items-center justify-center rounded-3xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-8 text-center shadow-2xl">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-brand-accent)]/20 text-[var(--color-brand-accent)]"
        >
          <Check size={40} />
        </motion.div>
        <h2 className="mt-6 text-3xl font-bold text-[var(--color-brand-text-primary)]">
          Proposal Request Received!
        </h2>
        <p className="mt-3 max-w-md text-[var(--color-brand-text-secondary)]">
          Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. Our consultants are reviewing your details and will prepare a tailored proposal shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex min-h-[640px] max-w-3xl flex-col justify-between overflow-hidden rounded-3xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-6 shadow-2xl md:p-10 lg:p-12">
      
      {/* Dynamic Top Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--color-brand-bg-deep)]">
        <motion.div
          className="h-full bg-[var(--color-brand-accent)]"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
      </div>
      <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="proposal-website">Leave this field empty</label>
        <input
          id="proposal-website"
          name="website"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--color-brand-accent)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-accent)]">
            Request For Proposal
          </span>
        </div>
        <div className="flex items-baseline gap-1 text-xs font-medium">
          <span className="text-lg font-bold text-[var(--color-brand-text-primary)]">
            {currentStep + 1}
          </span>
          <span className="text-[var(--color-brand-text-muted)]">/ {totalSteps}</span>
        </div>
      </div>

      {/* Step Content Area */}
      <div className="relative flex-1 flex flex-col justify-center pb-4 pt-0">
        <AnimatePresence mode="wait" custom={direction}>
          {currentStep === 0 && (
            <motion.div
              key="step0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-brand-text-primary)] md:text-xl">
                  Let&apos;s start with your contact info
                </h2>
                <p className="mt-1 text-sm text-[var(--color-brand-text-muted)]">
                  Please share who we&apos;ll be presenting this proposal to.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  icon={<User size={18} />}
                  label="Full Name *"
                  id="proposal-name"
                  autoComplete="name"
                  maxLength={120}
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  autoFocus
                  error={validationErrors.fullName}
                />
                <Input
                  icon={<Briefcase size={18} />}
                  label="Job Title"
                  id="proposal-job-title"
                  maxLength={100}
                  placeholder="e.g. Chief Technology Officer"
                  value={formData.jobTitle}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                  error={validationErrors.jobTitle}
                />
                <Input
                  icon={<Mail size={18} />}
                  type="email"
                  label="Email Address *"
                  id="proposal-email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  placeholder="sarah@company.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  error={validationErrors.email}
                />
                <Input
                  icon={<Phone size={18} />}
                  label="Phone Number"
                  id="proposal-phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={30}
                  inputMode="tel"
                  placeholder="+254 700 000 000"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  error={validationErrors.phone}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-brand-text-primary)] md:text-3xl">
                  Tell us about your organization 
                </h2>
                <p className="mt-1 text-sm text-[var(--color-brand-text-muted)]">
                  This helps us tailor our implementation strategy to your scale.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  icon={<Building2 size={18} />}
                  label="Company Name"
                  id="proposal-company"
                  autoComplete="organization"
                  maxLength={160}
                  placeholder="e.g. Acme Corp"
                  value={formData.companyName}
                  onChange={(e) => updateField("companyName", e.target.value)}
                  autoFocus
                  error={validationErrors.companyName}
                />
                <Input
                  icon={<Globe size={18} />}
                  label="Country / Region"
                  id="proposal-country"
                  autoComplete="country-name"
                  maxLength={100}
                  placeholder="e.g. Kenya"
                  value={formData.country}
                  onChange={(e) => updateField("country", e.target.value)}
                  error={validationErrors.country}
                />
                
                <Select
                  label="Industry"
                  id="proposal-industry"
                  value={formData.industry}
                  onChange={(e) => updateField("industry", e.target.value)}
                  options={proposalOptions.industry}
                  error={validationErrors.industry}
                />

                <Select
                  label="Company Size"
                  id="proposal-company-size"
                  value={formData.companySize}
                  onChange={(e) => updateField("companySize", e.target.value)}
                  options={proposalOptions.companySize}
                  error={validationErrors.companySize}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-brand-text-primary)] md:text-3xl">
                  Project scope & timeline 
                </h2>
                <p className="mt-1 text-sm text-[var(--color-brand-text-muted)]">
                  Select your key drivers so we can align our resources.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Select
                  label="Primary Service Required"
                  id="proposal-service"
                  value={formData.serviceRequired}
                  onChange={(e) => updateField("serviceRequired", e.target.value)}
                  options={proposalOptions.serviceRequired}
                  error={validationErrors.serviceRequired}
                />

                <Select
                  label="Estimated Budget Range"
                  id="proposal-budget"
                  value={formData.estimatedBudget}
                  onChange={(e) => updateField("estimatedBudget", e.target.value)}
                  options={proposalOptions.estimatedBudget}
                  error={validationErrors.estimatedBudget}
                />

                <Select
                  label="Preferred Timeline"
                  id="proposal-timeline"
                  value={formData.preferredTimeline}
                  onChange={(e) => updateField("preferredTimeline", e.target.value)}
                  options={proposalOptions.preferredTimeline}
                  error={validationErrors.preferredTimeline}
                />

                <Input
                  icon={<Clock size={18} />}
                  label="Target Go-Live Date"
                  id="proposal-go-live"
                  type="date"
                  value={formData.expectedGoLive}
                  onChange={(e) => updateField("expectedGoLive", e.target.value)}
                  placeholder=""
                  min={new Date().toISOString().slice(0, 10)}
                  error={validationErrors.expectedGoLive}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-brand-text-primary)] md:text-3xl">
                  Services & Technologies of Interest ⚡
                </h2>
                <p className="mt-1 text-sm text-[var(--color-brand-text-muted)]">
                  Select all that apply to your technical goals.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {proposalOptions.servicesOfInterest.map((item) => {
                  const isSelected = formData.servicesOfInterest.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleServiceOfInterest(item)}
                      className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                        isSelected
                          ? "border-[var(--color-brand-accent)] bg-[var(--color-brand-accent)]/10 text-white"
                          : "border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] text-[var(--color-brand-text-secondary)] hover:border-[var(--color-brand-border)]"
                      }`}
                    >
                      <span className="text-xs font-medium md:text-sm">{item}</span>
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded transition ${
                          isSelected
                            ? "bg-[var(--color-brand-accent)] text-white"
                            : "border border-[var(--color-brand-border-muted)]"
                        }`}
                      >
                        {isSelected && <Check size={12} />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {validationErrors.servicesOfInterest && (
                <p role="alert" className="text-sm text-red-400">{validationErrors.servicesOfInterest}</p>
              )}
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-brand-text-primary)] md:text-3xl">
                  Final Details & Attachments 
                </h2>
                <p className="mt-1 text-sm text-[var(--color-brand-text-muted)]">
                  Provide context or upload existing spec sheets / RFPs.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-text-secondary)]">
                    Project Description
                  </label>
                  <textarea
                    id="proposal-description"
                    rows={4}
                    maxLength={5000}
                    value={formData.projectDescription}
                    onChange={(e) => updateField("projectDescription", e.target.value)}
                    placeholder="Briefly describe your objectives, existing stack, users, or challenges..."
                    className="w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] p-4 text-sm text-[var(--color-brand-text-primary)] placeholder-[var(--color-brand-text-muted)] outline-none transition focus:border-[var(--color-brand-accent)]"
                    autoFocus
                    aria-invalid={Boolean(validationErrors.projectDescription)}
                    aria-describedby={validationErrors.projectDescription ? "proposal-description-error" : undefined}
                  />
                  {validationErrors.projectDescription && (
                    <p id="proposal-description-error" role="alert" className="mt-2 text-sm text-red-400">
                      {validationErrors.projectDescription}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-text-secondary)]">
                    Supporting Documents
                  </label>
                  <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] p-6 text-center transition hover:border-[var(--color-brand-accent)]">
                    <Upload className="mb-2 text-[var(--color-brand-accent)]" size={28} />
                    <p className="text-xs text-[var(--color-brand-text-secondary)]">
                      {formData.file ? (
                        <span className="font-semibold text-white">{formData.file.name}</span>
                      ) : (
                        "Upload requirements, RFPs, or architecture diagrams"
                      )}
                    </p>
                    <input
                      type="file"
                      id="proposal-attachment"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        updateField("file", file);
                        const errors = validateProposalStep(4, { ...formData, file });
                        if (errors.file) setValidationErrors((prev) => ({ ...prev, file: errors.file }));
                      }}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                  </div>
                  {validationErrors.file && <p role="alert" className="mt-2 text-sm text-red-400">{validationErrors.file}</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between border-t border-[var(--color-brand-border)] pt-6">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-medium transition ${
            currentStep === 0
              ? "opacity-30 cursor-not-allowed text-[var(--color-brand-text-muted)]"
              : "text-[var(--color-brand-text-secondary)] hover:bg-[var(--color-brand-bg-deep)] hover:text-white"
          }`}
        >
          <ChevronLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1 text-[11px] text-[var(--color-brand-text-muted)] sm:flex">
            Press <kbd className="rounded border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-1.5 py-0.5 text-[10px]">Enter ↵</kbd>
          </span>

          {currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 rounded-xl bg-[var(--color-brand-accent)] px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-[var(--color-brand-accent-hover)] active:scale-95"
            >
              Continue <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-[var(--color-brand-accent)] px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-[var(--color-brand-accent-hover)] active:scale-95 disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit Proposal"} <Send size={14} />
            </button>
          )}
        </div>
      </div>
      {submitError && (
        <p role="alert" className="mt-4 text-right text-sm text-red-400">
          {submitError}
        </p>
      )}
    </div>
  );
}

/* Helper Reusable Input Component */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  label: string;
  error?: string;
}

function Input({ icon, label, error, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={props.id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-text-secondary)]">
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3.5 py-2.5 transition focus-within:border-[var(--color-brand-accent)]">
        <div className="text-[var(--color-brand-accent)]">{icon}</div>
        <input
          {...props}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${props.id}-error` : undefined}
          className="w-full bg-transparent text-sm text-[var(--color-brand-text-primary)] placeholder-[var(--color-brand-text-muted)] outline-none"
        />
      </div>
      {error && <p id={`${props.id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* Helper Reusable Select Component */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly string[];
  error?: string;
}

function Select({ label, options, error, ...props }: SelectProps) {
  return (
    <div>
      <label htmlFor={props.id} className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-text-secondary)]">
        {label}
      </label>
      <select
        {...props}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${props.id}-error` : undefined}
        className="w-full rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3.5 py-3 text-sm text-[var(--color-brand-text-primary)] outline-none transition focus:border-[var(--color-brand-accent)]"
      >
        <option value="" disabled className="bg-[var(--color-brand-bg-deep)] text-[var(--color-brand-text-muted)]">
          Select an option...
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[var(--color-brand-bg-deep)] text-[var(--color-brand-text-primary)]"
          >
            {option}
          </option>
        ))}
      </select>
      {error && <p id={`${props.id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
