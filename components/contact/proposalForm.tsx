"use client";

import { motion } from "framer-motion";
import {
  Building2,
  DollarSign,
  FileText,
  Globe,
  Mail,
  Phone,
  Send,
  User,
  Briefcase,
  Clock,
  Upload,
} from "lucide-react";

export default function ProposalForm() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[var(--color-brand-bg-card)] p-6 shadow-2xl md:p-8 lg:p-10">

      {/* Header */}

      <div className="mb-10">

        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-brand-accent)]">
          Request For Proposal
        </span>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          Let's Build Something Exceptional
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-[var(--color-brand-text-secondary)]">
          Tell us about your organization, your current challenges and
          your project goals. Our consultants will review your
          requirements and prepare a tailored proposal including
          architecture, implementation roadmap, timelines and pricing.
        </p>

      </div>

      <form className="space-y-10">

        {/* -------------------------------- */}
        {/* Contact Information */}
        {/* -------------------------------- */}

        <section>

          <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold text-white">

            <User
              size={22}
              className="text-[var(--color-brand-accent)]"
            />

            Contact Information

          </h3>

          <div className="grid gap-6 md:grid-cols-2">

            <Input
              icon={<User size={18} />}
              label="Full Name"
              placeholder="John Doe"
            />

            <Input
              icon={<Briefcase size={18} />}
              label="Job Title"
              placeholder="Managing Director"
            />

            <Input
              icon={<Mail size={18} />}
              type="email"
              label="Email Address"
              placeholder="john@company.com"
            />

            <Input
              icon={<Phone size={18} />}
              label="Phone Number"
              placeholder="+254..."
            />

          </div>

        </section>

        {/* -------------------------------- */}
        {/* Company */}
        {/* -------------------------------- */}

        <section>

          <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold text-white">

            <Building2
              size={22}
              className="text-[var(--color-brand-accent)]"
            />

            Company Information

          </h3>

          <div className="grid gap-6 md:grid-cols-2">

            <Input
              icon={<Building2 size={18} />}
              label="Company Name"
              placeholder="OHM Labs Africa"
            />

            <Input
              icon={<Globe size={18} />}
              label="Country"
              placeholder="Kenya"
            />

            <Select
              label="Industry"
              options={[
                "Retail",
                "Healthcare",
                "Manufacturing",
                "Government",
                "Finance",
                "Education",
                "Technology",
                "Logistics",
                "Agriculture",
                "NGO",
                "Other",
              ]}
            />

            <Select
              label="Company Size"
              options={[
                "1 - 10",
                "11 - 50",
                "51 - 200",
                "201 - 500",
                "500+",
              ]}
            />

          </div>

        </section>

        {/* -------------------------------- */}
        {/* Project */}
        {/* -------------------------------- */}

        <section>

          <h3 className="mb-6 flex items-center gap-3 text-xl font-semibold text-white">

            <FileText
              size={22}
              className="text-[var(--color-brand-accent)]"
            />

            Project Information

          </h3>

          <div className="grid gap-6 md:grid-cols-2">

            <Select
              label="Service Required"
              options={[
                "Artificial Intelligence",
                "Business Intelligence",
                "Data Analytics",
                "ERP Implementation",
                "Cloud Migration",
                "Software Development",
                "Mobile Applications",
                "Web Development",
                "Cybersecurity",
                "Digital Transformation",
                "Automation",
                "Other",
              ]}
            />

            <Select
              label="Estimated Budget"
              options={[
                "Under $2,000",
                "$2,000 - $5,000",
                "$5,000 - $10,000",
                "$10,000 - $25,000",
                "$25,000+",
              ]}
            />

            <Select
              label="Preferred Timeline"
              options={[
                "Immediately",
                "Within 30 Days",
                "1 - 3 Months",
                "3 - 6 Months",
                "Flexible",
              ]}
            />

            <Input
              icon={<Clock size={18} />}
              label="Expected Go-Live"
              type="date"
              placeholder=""
            />

          </div>

        </section>

        {/* -------------------------------- */}
        {/* Services */}
        {/* -------------------------------- */}

        <section>

          <h3 className="mb-6 text-xl font-semibold text-white">
            Services of Interest
          </h3>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {[
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
            ].map((item) => (

              <label
                key={item}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[var(--color-brand-bg-main)] p-4 transition hover:border-[var(--color-brand-accent)]"
              >

                <input
                  type="checkbox"
                  className="h-5 w-5 accent-red-600"
                />

                <span className="text-white">
                  {item}
                </span>

              </label>

            ))}

          </div>

        </section>

        {/* -------------------------------- */}
        {/* Description */}
        {/* -------------------------------- */}

        <section>

          <label className="mb-3 block text-xl font-semibold text-white">
            Project Description
          </label>

          <textarea
            rows={8}
            placeholder="Describe your project, existing infrastructure, business challenges, desired outcomes, integrations required, users, reporting requirements and any additional information..."
            className="w-full rounded-2xl border border-white/10 bg-[var(--color-brand-bg-main)] px-5 py-4 text-white outline-none transition focus:border-[var(--color-brand-accent)]"
          />

        </section>

        {/* -------------------------------- */}
        {/* Upload */}
        {/* -------------------------------- */}

        <section>

          <label className="mb-4 block text-xl font-semibold text-white">
            Supporting Documents
          </label>

          <div className="rounded-2xl border-2 border-dashed border-white/10 bg-[var(--color-brand-bg-main)] p-10 text-center">

            <Upload
              className="mx-auto text-[var(--color-brand-accent)]"
              size={36}
            />

            <p className="mt-4 text-white">
              Upload Requirement Documents,
              Architecture Diagrams,
              Existing RFPs,
              Presentations or Specifications.
            </p>

            <input
              type="file"
              className="mt-6 text-white"
            />

          </div>

        </section>

        {/* -------------------------------- */}
        {/* Submit */}
        {/* -------------------------------- */}

        <motion.button

          whileHover={{
            scale: 1.03,
          }}

          whileTap={{
            scale: .97,
          }}

          type="submit"
          className="inline-flex items-center rounded-xl bg-[var(--color-brand-accent)] px-8 py-4 font-semibold text-white shadow-lg transition"
        >

          Submit Proposal

          <Send
            size={20}
            className="ml-3"
          />

        </motion.button>

      </form>

    </div>
  );
}


interface InputProps {

  icon: React.ReactNode;

  label: string;

  placeholder: string;

  type?: string;

}

function Input({

  icon,

  label,

  placeholder,

  type = "text",

}: InputProps) {

  return (

    <div>

      <label className="mb-2 block text-sm font-medium text-white">

        {label}

      </label>

      <div className="flex items-center rounded-xl border border-white/10 bg-[var(--color-brand-bg-main)] px-4">

        <div className="text-[var(--color-brand-accent)]">

          {icon}

        </div>

        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent px-3 py-4 text-white outline-none"
        />

      </div>

    </div>

  );

}

/* ===================================================== */

interface SelectProps {

  label: string;

  options: string[];

}

function Select({

  label,

  options,

}: SelectProps) {

  return (

    <div>

      <label className="mb-2 block text-sm font-medium text-white">

        {label}

      </label>

      <select
        className="w-full rounded-xl border border-white/10 bg-[var(--color-brand-bg-main)] px-4 py-4 text-white outline-none"
        defaultValue=""
      >

        <option value="" disabled>
          Select...
        </option>

        {options.map((option) => (

          <option
            key={option}
            value={option}
          >

            {option}

          </option>

        ))}

      </select>

    </div>

  );

}