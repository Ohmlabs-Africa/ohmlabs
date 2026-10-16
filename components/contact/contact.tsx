"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-brand-bg-deep)]">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-20 h-80 w-80 rounded-full bg-[var(--color-brand-accent)]/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-white/[0.03]" />
        <div className="absolute top-1/2 right-10 h-48 w-48 rounded-full border border-white/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:px-8 lg:px-12">

        {/* Breadcrumb */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="mb-8 flex items-center gap-2 text-sm text-[var(--color-brand-text-muted)]"
        >
          <Link
            href="/"
            className="transition hover:text-white"
          >
            Home
          </Link>

          <ChevronRight size={16} />

          <span className="text-white">
            Let&apos;s Talk
          </span>
        </motion.div>

        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

          {/* Left Side */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
          >
            <span className="inline-flex rounded-full bg-[var(--color-brand-accent)]/15 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-brand-accent)]">
              Ready to Start?
            </span>

            <h1 className="mt-6 max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-4xl">
              Let&apos;s build your next digital success story.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-[var(--color-brand-text-secondary)] sm:text-sm">
              Whether you&apos;re looking to modernize your business,
              automate operations, develop enterprise software,
              build AI-powered solutions, or migrate to the cloud,
              OHM Labs Africa is ready to partner with you from
              strategy through implementation.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/contact/proposal"
                className="inline-flex items-center rounded-xl bg-[var(--color-brand-accent)] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-600/30"
              >
                Request Proposal
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>

              <Link
                href="/contact/schedule"
                className="inline-flex items-center rounded-xl border border-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:border-[var(--color-brand-accent)] hover:bg-white/5"
              >
                Book a Strategy Call
              </Link>

              <Link
                href="/contact/font-submission"
                className="inline-flex items-center rounded-xl border border-white/10 px-8 py-4 text-sm font-semibold text-white transition hover:border-[var(--color-brand-accent)] hover:bg-white/5"
              >
                Submit a Font
              </Link>

            </div>

            {/* Trust indicators */}

            <div className="mt-8 flex flex-wrap gap-8 text-sm text-[var(--color-brand-text-muted)]">

              <div>
                <p className="text-lg font-bold text-white">
                  24 hrs
                </p>
                <span>Average response time</span>
              </div>

              <div>
                <p className="text-lg font-bold text-white">
                  End-to-End
                </p>
                <span>Implementation Support</span>
              </div>

              <div>
                <p className="text-lg font-bold text-white">
                  Enterprise
                </p>
                <span>Solutions</span>
              </div>

            </div>
          </motion.div>

          {/* Right Card */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .7 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[var(--color-brand-bg-card)] p-10 shadow-2xl">

              <div className="absolute -top-16 right-0 h-44 w-44 rounded-full bg-[var(--color-brand-accent)]/10" />

              <div className="relative">

                <h3 className="text-xl font-bold text-white">
                  What happens next?
                </h3>

                <div className="mt-6 space-y-8">

                  {[
                    {
                      step: "01",
                      title: "Discovery Meeting",
                      desc: "Understand your business goals, challenges, and technical environment."
                    },
                    {
                      step: "02",
                      title: "Tailored Proposal",
                      desc: "Receive a detailed technical and commercial proposal aligned to your requirements."
                    },
                    {
                      step: "03",
                      title: "Project Delivery",
                      desc: "Our team designs, develops, deploys, and supports your solution."
                    }
                  ].map((item) => (

                    <div
                      key={item.step}
                      className="flex gap-5"
                    >

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-accent)] font-bold text-white">
                        {item.step}
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg text-white">
                          {item.title}
                        </h4>

                        <p className="mt-1 text-sm leading-7 text-[var(--color-brand-text-secondary)]">
                          {item.desc}
                        </p>
                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}