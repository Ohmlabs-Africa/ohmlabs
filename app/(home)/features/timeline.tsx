"use client";

import { useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
    useReducedMotion,
} from "framer-motion";

import TimelineCard from "@/components/timeline/timelineCard";
import { timelineSteps } from "@/components/timeline/timelineData";

export default function ProcessTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    // Track scrolling through this section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end center"],
    });

    // Timeline grows from top to bottom
    const lineHeight = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "100%"]
    );

    // Track which step is active
    const [activeStep, setActiveStep] = useState(1);

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        const total = timelineSteps.length;

        const step = Math.min(
            total,
            Math.max(
                1,
                Math.floor(value * total) + 1
            )
        );

        setActiveStep(step);
    });

    return (
        <section
            ref={sectionRef}
            className="
                relative
                isolate
                overflow-hidden
                bg-[var(--color-brand-bg-deep)]
                bg-[url('/Collage.png')]
                bg-cover
                bg-[center_42%]
                py-24
                sm:py-32
            "
        >
            <div
                aria-hidden="true"
                className="absolute inset-0 z-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.92)_0%,rgba(20,20,20,0.88)_45%,rgba(20,20,20,0.95)_100%)]"
            />
            <div className="relative z-10">
            {/* Header */}

            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : .8 }}
                className="mx-auto mb-16 max-w-[1440px] px-5 text-left sm:mb-20 sm:px-8 lg:px-12"
            >
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-brand-accent)]">
                    OUR PROCESS
                </p>

                <h2 className="max-w-4xl text-[clamp(2.8rem,6vw,6rem)] font-medium leading-[0.95] tracking-[-0.065em] text-white">
                    From Vision
                    <span className="text-[var(--color-brand-accent)]">
                        {" "}
                        to Delivery
                    </span>
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-brand-text-secondary)] sm:text-lg sm:leading-8">
                    Every engagement follows a structured,
                    collaborative implementation process that
                    ensures transparency, efficiency and
                    measurable business outcomes.
                </p>
            </motion.div>

            {/* Timeline */}

            <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

                {/* Grey background line */}

                <div
                    className="
                        absolute
                        left-8
                        top-0
                        h-full
                        w-[4px]
                        sm:left-1/2
                        sm:-translate-x-1/2
                        rounded-full
                        bg-neutral-800
                    "
                />

                {/* Animated Red Line */}

                <motion.div
                    style={{ height: lineHeight }}
                    className="
                        absolute
                        left-8
                        top-0
                        w-[4px]
                        sm:left-1/2
                        sm:-translate-x-1/2
                        rounded-full
                        bg-[var(--color-brand-accent)]
                    "
                />

                {/* Timeline Steps */}

                <div className="space-y-10 sm:space-y-16">

                    {timelineSteps.map((step, index) => {

                        const left = index % 2 === 0;

                        const active = step.id <= activeStep;

                        return (

                            <div
                                key={step.id}
                                className="
                                    relative
                                    grid
                                    items-center
                                    grid-cols-[48px_1fr]
                                    gap-x-5
                                    sm:grid-cols-[64px_1fr]
                                    sm:gap-x-8
                                    lg:grid-cols-[1fr_90px_1fr]
                                "
                            >
                                {/* LEFT */}

                                <div
                                    className={`
                                        flex
                                        ${left ? "col-start-2 row-start-1 lg:col-start-1 lg:row-start-auto lg:justify-end lg:pr-10" : "hidden lg:flex"}
                                    `}
                                >
                                    {left && (
                                        <TimelineCard
                                            step={step}
                                            active={active}
                                            left={true}
                                        />
                                    )}
                                </div>

                                {/* CENTER */}

                                <div className="relative col-start-1 row-start-1 flex justify-start sm:justify-center lg:col-start-2 lg:row-start-auto">

                                    {/* Animated Node */}

                                    <motion.div

                                        animate={
                                            active
                                                ? shouldReduceMotion
                                                  ? { scale: 1 }
                                                  : {
                                                      scale: [
                                                          1,
                                                          1.15,
                                                          1,
                                                      ],
                                                  }
                                                : {
                                                      scale: 1,
                                                  }
                                        }

                                        transition={{
                                            repeat: active
                                                ? shouldReduceMotion
                                                  ? 0
                                                  : Infinity
                                                : 0,
                                            duration: shouldReduceMotion ? 0 : 1.8,
                                        }}

                                        className={`
                                            z-10
                                            flex
                                            h-12
                                            w-12
                                            sm:h-16
                                            sm:w-16
                                            items-center
                                            justify-center
                                            rounded-full
                                            border-4
                                            text-lg
                                            font-bold
                                            transition-all
                                            duration-500

                                            ${
                                                active
                                                    ? "border-[var(--color-brand-accent)] bg-[var(--color-brand-accent)] text-white shadow-[0_0_40px_rgba(229,9,20,.45)]"
                                                    : "border-neutral-700 bg-[var(--color-brand-bg-card)] text-neutral-500"
                                            }
                                        `}
                                    >
                                        {step.id}
                                    </motion.div>

                                </div>

                                {/* RIGHT */}

                                <div
                                    className={`
                                        flex
                                        ${!left ? "col-start-2 row-start-1 lg:col-start-3 lg:row-start-auto lg:justify-start lg:pl-10" : "hidden lg:flex"}
                                    `}
                                >
                                    {!left && (
                                        <TimelineCard
                                            step={step}
                                            active={active}
                                            left={false}
                                        />
                                    )}
                                </div>

                            </div>

                        );

                    })}

                </div>

            </div>
            </div>

        </section>
    );
}