import {
    Rocket,
    Search,
    FileText,
    Settings,
    CircleCheckBig,
} from "lucide-react";

export interface TimelineStep {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    icon: any;
}

export const timelineSteps: TimelineStep[] = [
    {
        id: 1,
        title: "Project Inception",
        subtitle: "Initial Consultation",
        description:
            "We begin with an introductory meeting to understand your business objectives, expected outcomes, stakeholders, timelines and project vision.",
        icon: Rocket,
    },

    {
        id: 2,
        title: "Discovery Meeting",
        subtitle: "Requirements & Infrastructure",
        description:
            "Our specialists evaluate your current infrastructure, workflows, software landscape and business processes to identify opportunities and technical requirements.",
        icon: Search,
    },

    {
        id: 3,
        title: "Proposal & Planning",
        subtitle: "Project Approval",
        description:
            "We prepare a detailed proposal covering scope, timelines, deliverables, milestones, implementation strategy and commercial terms before project kickoff.",
        icon: FileText,
    },

    {
        id: 4,
        title: "Implementation",
        subtitle: "Development & Deployment",
        description:
            "Our engineers configure, develop, integrate and rigorously test the solution while keeping stakeholders informed throughout the implementation process.",
        icon: Settings,
    },

    {
        id: 5,
        title: "Delivery",
        subtitle: "Training & Support",
        description:
            "We deploy the final solution, onboard your users, monitor performance and provide ongoing support to ensure long-term operational success.",
        icon: CircleCheckBig,
    },
];