"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock3,
  Video,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Mail,
  Sparkles,
  CalendarDays,
} from "lucide-react";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
  }),
};

export default function CalendarBooking() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const totalSteps = 2;

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentStep < totalSteps - 1) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, handleNext, totalSteps]);

  return (
    <div className="relative mx-auto flex min-h-[580px] max-w-3xl flex-col justify-between overflow-hidden rounded-3xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-card)] p-6 shadow-2xl md:p-8">
      {/* Dynamic Top Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--color-brand-bg-deep)]">
        <motion.div
          className="h-full bg-[var(--color-brand-accent)]"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <div className="mb-1 flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--color-brand-accent)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-brand-accent)]">
            Strategy Session
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
      <div className="relative flex-1 flex flex-col justify-center pb-4 pt-1">
        <AnimatePresence mode="wait" custom={direction}>
          {currentStep === 0 && (
            <motion.div
              key="step0"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-brand-text-primary)] md:text-3xl">
                  Schedule a Discovery Call
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-brand-text-secondary)]">
                  Book a complimentary 1-on-1 consultation with our technical consultants to discuss your goals, existing stack, and implementation roadmap.
                </p>
              </div>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3.5 py-2 text-xs font-medium text-[var(--color-brand-text-primary)]">
                  <Clock3 size={15} className="text-[var(--color-brand-accent)]" />
                  30–60 Minutes
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3.5 py-2 text-xs font-medium text-[var(--color-brand-text-primary)]">
                  <Users size={15} className="text-[var(--color-brand-accent)]" />
                  1-on-1 Consultation
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-3.5 py-2 text-xs font-medium text-[var(--color-brand-text-primary)]">
                  <Video size={15} className="text-[var(--color-brand-accent)]" />
                  Virtual Meeting
                </div>
              </div>

              {/* Simplified Outcomes */}
              <div className="rounded-2xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] p-5 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand-text-secondary)]">
                  What You'll Gain
                </h3>
                <ul className="grid gap-2.5 text-xs text-[var(--color-brand-text-secondary)] sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0 text-[var(--color-brand-accent)]" />
                    Business Needs Assessment
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0 text-[var(--color-brand-accent)]" />
                    Technology Evaluation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0 text-[var(--color-brand-accent)]" />
                    Tailored Solution Recommendation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="shrink-0 text-[var(--color-brand-accent)]" />
                    Clear Implementation Roadmap
                  </li>
                </ul>
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
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-brand-text-primary)] md:text-3xl">
                  Pick a Time Slot
                </h2>
                <p className="mt-1 text-xs text-[var(--color-brand-text-muted)]">
                  Select a convenient slot directly from our calendar.
                </p>
              </div>

              {/* Zoho Calendar Container */}
              <div className="h-[400px] w-full overflow-hidden rounded-2xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)]">
                <iframe
                  src="https://calendar.zoho.com/zc/view/slot-booking/zz08011220c73b4b086b81d41d251474a2e4ed7c6dfc322620b4dfa1fd3118cb01417e3221"
                  title="Appointment Booking"
                  className="h-full w-full rounded-xl border-0 bg-white"
                />
              </div>

              {/* Direct Urgent Email Notice */}
              <div className="flex items-center justify-between rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-2.5 text-xs">
                <span className="text-[var(--color-brand-text-muted)]">
                  Need an urgent consultation?
                </span>
                <a
                  href="mailto:admin@ohmlabs.africa"
                  className="flex items-center gap-1 font-semibold text-[var(--color-brand-accent)] hover:underline"
                >
                  Contact Direct <Mail size={12} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between border-t border-[var(--color-brand-border)] pt-5">
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

        {currentStep === 0 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 rounded-xl bg-[var(--color-brand-accent)] px-6 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-[var(--color-brand-accent-hover)] active:scale-95"
          >
            Select Date & Time <ChevronRight size={16} />
          </button>
        ) : (
          <a
            href="mailto:admin@ohmlabs.africa"
            className="flex items-center gap-2 rounded-xl border border-[var(--color-brand-border-muted)] bg-[var(--color-brand-bg-deep)] px-4 py-2.5 text-xs font-medium text-[var(--color-brand-text-secondary)] transition hover:text-white"
          >
            Email Support <Mail size={14} />
          </a>
        )}
      </div>
    </div>
  );
}