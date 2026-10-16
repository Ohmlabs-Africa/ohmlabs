"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Mail,
    MapPin,
} from "lucide-react";

// Inline Brand Icons (Replaces missing lucide-react brand exports)
const GithubIcon = ({ size = 18 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const company = [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "Solutions", href: "/solutions" },
    { label: "Admin", href: "/login" },
];

const services = [
    { label: "Artificial Intelligence", href: "/services" },
    { label: "Cloud Solutions", href: "/services" },
    { label: "ERP Implementation", href: "/services" },
    { label: "Software Development", href: "/services" },
    { label: "Data Analytics", href: "/services" },
    { label: "Managed Support", href: "/contact" },
];


export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-[var(--color-brand-border)] bg-[var(--color-brand-bg-deep)]">

            {/* Animated top line
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="h-1 bg-[var(--color-brand-accent)]"
            /> */}

            {/* Background Blur */}
            <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--color-brand-accent)] opacity-5 blur-[150px]" />

            <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12">

                <div className="grid gap-12 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <h2 className="text-xl font-black uppercase tracking-wider text-white">
                            OHM
                            <span className="text-[var(--color-brand-accent)]">
                                {" "}LABS
                            </span>
                        </h2>

                        <p className="mt-6 text-sm leading-5 text-[var(--color-brand-text-secondary)]">
                            Engineering digital transformation through
                            Artificial Intelligence, Cloud Computing,
                            ERP Solutions, Data Intelligence and
                            Enterprise Software.
                        </p>

                        <p className="mt-5 text-sm italic text-[var(--color-brand-text-muted)]">
                            Built for Africa. Engineered for Scale.
                        </p>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold text-white">
                            Company
                        </h3>

                        <ul className="space-y-2">
                            {company.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="group flex items-center gap-2 text-sm text-[var(--color-brand-text-secondary)] transition hover:text-[var(--color-brand-accent)]"
                                    >
                                        {item.label}
                                        <ArrowUpRight
                                            size={15}
                                            className="translate-x-0 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold text-white">
                            Services
                        </h3>

                        <ul className="space-y-2">
                            {services.map((service) => (
                                <li key={service.label}>
                                    <Link
                                        href={service.href}
                                        className="text-sm text-[var(--color-brand-text-secondary)] transition hover:text-[var(--color-brand-accent)]"
                                    >
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold text-white">
                            Contact
                        </h3>

                        <div className="space-y-2 text-sm text-[var(--color-brand-text-secondary)]">
                            <div className="flex gap-3">
                                <MapPin
                                    className="mt-1 text-[var(--color-brand-accent)]"
                                    size={18}
                                />
                                <div>
                                    Nairobi, Kenya
                                    <div className="text-sm text-[var(--color-brand-text-muted)]">
                                        East Africa
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Mail
                                    className="mt-1 text-[var(--color-brand-accent)]"
                                    size={18}
                                />
                                admin@ohmlabs.africa
                            </div>

                            {/* <div className="flex gap-3">
                                <Phone
                                    className="mt-1 text-[var(--color-brand-accent)]"
                                    size={18}
                                />
                                +254 710 100 036
                            </div> */}
                        </div>

                        {/* Social Links */}
                        <div className="mt-8 flex gap-4">
                            {[
                                { Icon: GithubIcon, href: "https://github.com" },
                                { Icon: LinkedinIcon, href: "https://www.linkedin.com/company/135717760/" },
                            ].map((item, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{
                                        y: -4,
                                        scale: 1.1,
                                    }}
                                    href={item.href}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-brand-border)] bg-[var(--color-brand-bg-card)] text-[var(--color-brand-text-secondary)] transition hover:border-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent)] hover:text-white"
                                >
                                    <item.Icon size={18} />
                                </motion.a>
                            ))}
                        </div>

                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-0 flex flex-col items-center justify-between gap-6 border-t border-[var(--color-brand-border)] pt-8 text-sm text-[var(--color-brand-text-muted)] lg:flex-row">
                    <p>
                        © {new Date().getFullYear()} OHM Labs Africa. All rights reserved.
                    </p>

                    <div className="flex flex-wrap gap-8">
                        <Link href="/privacy" className="transition hover:text-white">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="transition hover:text-white">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="transition hover:text-white">
                            Cookie Policy
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
