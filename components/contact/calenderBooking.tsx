"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Users,
  CheckCircle2,
  ArrowRight,
  Video,
  Laptop,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

export default function CalendarBooking() {
  return (
    <div className="rounded-3xl border border-white/10 bg-[var(--color-brand-bg-card)] p-6 shadow-2xl md:p-8 lg:p-10">

      {/* Header */}

      <div className="mb-10">

        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-brand-accent)]">
          Strategy Session
        </span>

        <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
          Schedule a Discovery Call
        </h2>

        <p className="mt-4 max-w-3xl leading-8 text-[var(--color-brand-text-secondary)]">
          Every successful digital transformation begins with understanding your
          business. Book a complimentary consultation with our consultants to
          discuss your goals, existing systems, and opportunities for innovation.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-3">

        <StatCard
          icon={<Clock3 size={28} />}
          value="30-60"
          label="Minutes"
        />

        <StatCard
          icon={<Users size={28} />}
          value="1-on-1"
          label="Consultation"
        />

        <StatCard
          icon={<Video size={28} />}
          value="Online"
          label="Meeting"
        />

      </div>

      {/* Benefits */}

      <div className="mt-12">

        <h3 className="mb-6 text-2xl font-semibold text-white">
          What You'll Gain
        </h3>

        <div className="grid gap-5 md:grid-cols-2">

          <Benefit
            icon={<Briefcase size={20} />}
            title="Business Needs Assessment"
            description="Understand your current business processes, challenges and growth opportunities."
          />

          <Benefit
            icon={<Laptop size={20} />}
            title="Technology Evaluation"
            description="Review your existing infrastructure and identify modernization opportunities."
          />

          <Benefit
            icon={<ShieldCheck size={20} />}
            title="Solution Recommendation"
            description="Receive expert recommendations tailored to your organization."
          />

          <Benefit
            icon={<CheckCircle2 size={20} />}
            title="Implementation Roadmap"
            description="Walk away with clear next steps and an implementation strategy."
          />

        </div>

      </div>

      {/* Process */}

      <div className="mt-14">

        <h3 className="mb-6 text-2xl font-semibold text-white">
          Consultation Process
        </h3>

        <div className="space-y-5">

          <Step
            number="01"
            title="Choose a convenient date and time."
          />

          <Step
            number="02"
            title="Receive an instant meeting confirmation."
          />

          <Step
            number="03"
            title="Meet our consultants virtually."
          />

          <Step
            number="04"
            title="Receive a tailored proposal and roadmap."
          />

        </div>

      </div>

      {/* Calendar */}

      <div className="mt-14">

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-semibold text-white">
              Available Time Slots
            </h3>

            <p className="mt-2 text-[var(--color-brand-text-secondary)]">
              Select an available slot directly from our scheduling calendar.
            </p>

          </div>

          <CalendarDays
            className="text-[var(--color-brand-accent)]"
            size={32}
          />

        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-brand-bg-main)]">
          <iframe src="https://calendar.zoho.com/zc/view/slot-booking/zz08011220c73b4b086b81d41d251474a2e4ed7c6dfc322620b4dfa1fd3118cb01417e3221" 
            title="Appointment Booking" frameBorder="0" 
            className="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:100%;width:100%;position:absolute;top:0px;left:0px;right:0px;bottom:0px" height="100%" width="100%"
             />

        </div>

      </div>

      {/* CTA */}

      <motion.div

        whileHover={{
          scale: 1.02,
        }}

        className="mt-12 rounded-2xl border border-[var(--color-brand-accent)]/30 bg-[var(--color-brand-accent)]/10 p-6"

      >

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-2xl font-bold text-white">
              Need an urgent consultation?
            </h3>

            <p className="mt-2 leading-7 text-[var(--color-brand-text-secondary)]">
              If your project is time-sensitive or requires immediate attention,
              contact us directly and we'll prioritize your request.
            </p>

          </div>

          <motion.a

            whileHover={{
              x: 5,
            }}

            href="mailto:admin@ohmlabs.africa"

            className="inline-flex items-center rounded-xl bg-[var(--color-brand-accent)] px-6 py-3 font-semibold text-white"

          >

            Contact Our Team

            <ArrowRight
              className="ml-2"
              size={18}
            />

          </motion.a>

        </div>

      </motion.div>

    </div>
  );
}

/* ---------------------------------------------------------------- */

interface StatCardProps {

  icon: React.ReactNode;

  value: string;

  label: string;

}

function StatCard({

  icon,

  value,

  label,

}: StatCardProps) {

  return (

    <div className="rounded-2xl border border-white/10 bg-[var(--color-brand-bg-main)] p-6 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)]">

        {icon}

      </div>

      <h3 className="mt-4 text-2xl font-bold text-white">

        {value}

      </h3>

      <p className="mt-1 text-sm text-[var(--color-brand-text-secondary)]">

        {label}

      </p>

    </div>

  );

}

/* ---------------------------------------------------------------- */

interface BenefitProps {

  icon: React.ReactNode;

  title: string;

  description: string;

}

function Benefit({

  icon,

  title,

  description,

}: BenefitProps) {

  return (

    <div className="rounded-2xl border border-white/10 bg-[var(--color-brand-bg-main)] p-6">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-accent)]/10 text-[var(--color-brand-accent)]">

        {icon}

      </div>

      <h4 className="mt-5 text-lg font-semibold text-white">

        {title}

      </h4>

      <p className="mt-3 leading-7 text-[var(--color-brand-text-secondary)]">

        {description}

      </p>

    </div>

  );

}

/* ---------------------------------------------------------------- */

interface StepProps {

  number: string;

  title: string;

}

function Step({

  number,

  title,

}: StepProps) {

  return (

    <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[var(--color-brand-bg-main)] p-5">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-accent)] font-bold text-white">

        {number}

      </div>

      <span className="text-white">

        {title}

      </span>

    </div>

  );

}