"use client";

import { useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from "framer-motion";

import TimelineCard from "@/components/timeline/timelineCard";
import { timelineSteps } from "@/components/timeline/timelineData";

export default function ProcessTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);

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
                overflow-hidden
                bg-[var(--color-brand-bg-deep)]
                py-0
            "
        >
            {/* Header */}

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: .8 }}
                className="mx-auto mb-24 max-w-3xl text-center"
            >
                <p className="mb-4 uppercase tracking-[0.35em] text-[var(--color-brand-accent)]">
                    OUR PROCESS
                </p>

                <h2 className="text-4xl font-bold text-white">
                    From Vision
                    <span className="text-[var(--color-brand-accent)]">
                        {" "}
                        to Delivery
                    </span>
                </h2>

                <p className="mt-6 text-base text-[var(--color-brand-text-secondary)]">
                    Every engagement follows a structured,
                    collaborative implementation process that
                    ensures transparency, efficiency and
                    measurable business outcomes.
                </p>
            </motion.div>

            {/* Timeline */}

            <div className="relative mx-auto max-w-7xl px-8 lg:px-16">

                {/* Grey background line */}

                <div
                    className="
                        absolute
                        left-1/2
                        top-0
                        h-full
                        w-[4px]
                        -translate-x-1/2
                        rounded-full
                        bg-neutral-800
                    "
                />

                {/* Animated Red Line */}

                <motion.div
                    style={{ height: lineHeight }}
                    className="
                        absolute
                        left-1/2
                        top-0
                        w-[4px]
                        -translate-x-1/2
                        rounded-full
                        bg-[var(--color-brand-accent)]
                    "
                />

                {/* Timeline Steps */}

                <div className="space-y-16">

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
                                    lg:grid-cols-[1fr_90px_1fr]
                                "
                            >
                                {/* LEFT */}

                                <div
                                    className={`
                                        flex
                                        ${left ? "justify-end pr-10" : ""}
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

                                <div className="relative flex justify-center">

                                    {/* Animated Node */}

                                    <motion.div

                                        animate={
                                            active
                                                ? {
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
                                                ? Infinity
                                                : 0,
                                            duration: 1.8,
                                        }}

                                        className={`
                                            z-10
                                            flex
                                            h-16
                                            w-16
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
                                        ${!left ? "justify-start pl-10" : ""}
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

        </section>
    );
}