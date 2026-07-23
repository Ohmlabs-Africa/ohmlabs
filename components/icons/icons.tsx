import React from "react";

const IconBase = ({ label, color }: { label: string; color: string }) => (
    <svg viewBox="0 0 64 64" className="w-full h-full">
        <circle cx="32" cy="32" r="28" fill={color} opacity="0.18" />
        <circle cx="32" cy="32" r="14" fill={color} />
        <text
            x="32"
            y="36"
            textAnchor="middle"
            fontSize="12"
            fontFamily="Inter, sans-serif"
            fill="#fff"
        >
            {label}
        </text>
    </svg>
);

export const FormBoldLogo = () => <IconBase label="FB" color="#2563EB" />;
export const GrayGridsLogo = () => <IconBase label="GG" color="#6B7280" />;
export const LineIconsLogo = () => <IconBase label="LI" color="#10B981" />;
export const NextJsTemplatesLogo = () => <IconBase label="NT" color="#000000" />;
export const PimjoLogo = () => <IconBase label="OL" color="#8B5CF6" />;
export const SaasBoldLogo = () => <IconBase label="SB" color="#F59E0B" />;
export const StaticRunLogo = () => <IconBase label="SR" color="#EF4444" />;
export const TailAdminLogo = () => <IconBase label="TA" color="#3B82F6" />;
export const TailgridsLogo = () => <IconBase label="TG" color="#0EA5E9" />;
export const UideckLogo = () => <IconBase label="UD" color="#F97316" />;