"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TimelineStep } from "./timelineData";

interface TimelineCardProps {
    step: TimelineStep;
    active: boolean;
    left: boolean;
}

export default function TimelineCard({
    step,
    active,
    left,
}: TimelineCardProps) {
    const shouldReduceMotion = useReducedMotion();
    const Icon = step.icon;

    return (
        <motion.div
            initial={shouldReduceMotion ? false : {
                opacity: 0,
                x: left ? -100 : 100,
            }}
            whileInView={{
                opacity: 1,
                x: 0,
            }}
            viewport={{
                once: true,
                amount: 0.35,
            }}
            transition={{
                duration: shouldReduceMotion ? 0 : 0.7,
                ease: "easeOut",
            }}
            whileHover={shouldReduceMotion ? undefined : {
                y: -8,
                transition: {
                    duration: 0.25,
                },
            }}
            className="w-full max-w-md"
        >
            <div
                className={`
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    p-4
                    transition-all
                    duration-500
                    backdrop-blur-lg

                    ${
                        active
                            ? "border-[var(--color-brand-accent)] shadow-[0_0_40px_rgba(229,9,20,.18)]"
                            : "border-[var(--color-brand-border)]"
                    }

                    bg-[var(--color-brand-bg-card)]
                `}
            >
                {/* Top Accent */}
                <div
                    className={`
                        absolute
                        top-0
                        left-0
                        h-1
                        transition-all
                        duration-700

                        ${
                            active
                                ? "w-full bg-[var(--color-brand-accent)]"
                                : "w-0"
                        }
                    `}
                />

                {/* Icon */}

                <motion.div
                    animate={
                        active && !shouldReduceMotion
                            ? {
                                  scale: [1, 1.12, 1],
                                  rotate: [0, 4, -4, 0],
                              }
                            : { scale: 1, rotate: 0 }
                    }
                    transition={{
                        duration: shouldReduceMotion ? 0 : 2,
                        repeat: active && !shouldReduceMotion ? Infinity : 0,
                    }}
                    className="
                        mb-5
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-full
                        bg-[var(--color-brand-accent)]
                        text-white
                    "
                >
                    <Icon size={22} />
                </motion.div>

                {/* Subtitle */}

                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[var(--color-brand-text-muted)]">
                    {step.subtitle}
                </p>

                {/* Title */}

                <h3 className="mb-4 text-xl font-bold text-white">
                    {step.title}
                </h3>

                {/* Description */}

                <p className="text-sm leading-6 text-[var(--color-brand-text-secondary)]">
                    {step.description}
                </p>

                {/* Active Badge */}

                {active && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.2,
                        }}
                        className="
                            absolute
                            right-5
                            top-5
                            h-3
                            w-3
                            rounded-full
                            bg-[var(--color-brand-accent)]
                            shadow-[0_0_20px_rgba(229,9,20,.8)]
                        "
                    />
                )}
            </div>
        </motion.div>
    );
}