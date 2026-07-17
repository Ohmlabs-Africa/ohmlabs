import {
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export interface Capability {

  id: string;

  title: string;

  short: string;

  icon: LucideIcon;

  color: string;

  position: {
    desktop: {
      x: number;
      y: number;
    };

    mobile: {
      x: number;
      y: number;
    };
  };

  technologies: string[];

  description: string;
}

export const capabilities: Capability[] = [
  {
    id: "software",

    title: "Software Engineering",

    short: "Applications",

    icon: Code2,

    color: "#e50914",

    position: {
      desktop: {
        x: 14,
        y: 20,
      },

      mobile: {
        x: 50,
        y: 6,
      },
    },

    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Flutter",
      "REST APIs",
      "GraphQL",
    ],

    description:
      "We engineer enterprise-grade applications using modern frontend and backend technologies. Every solution is designed around modular architecture, performance, maintainability and cloud-first deployment principles.",
  },

  {
    id: "cloud",

    title: "Cloud Infrastructure",

    short: "Cloud",

    icon: Cloud,

    color: "#e50914",

    position: {
      desktop: {
        x: 50,
        y: 6,
      },

      mobile: {
        x: 50,
        y: 24,
      },
    },

    technologies: [
      "Azure",
      "AWS",
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD",
      "GitHub Actions",
    ],

    description:
      "We design resilient cloud infrastructure that supports scalability, security and business continuity using containerization, orchestration and Infrastructure as Code.",
  },

  {
    id: "erp",

    title: "ERP Systems",

    short: "ERP",

    icon: ShieldCheck,

    color: "#e50914",

    position: {
      desktop: {
        x: 86,
        y: 20,
      },

      mobile: {
        x: 50,
        y: 42,
      },
    },

    technologies: [
      "Odoo",
      "SAP",
      "Microsoft Dynamics",
      "Automation",
      "Finance",
      "Inventory",
      "CRM",
    ],

    description:
      "We implement enterprise resource planning systems that unify finance, procurement, inventory, manufacturing and customer operations into a single digital ecosystem.",
  },

  {
    id: "data",

    title: "Data Engineering",

    short: "Data",

    icon: Database,

    color: "#e50914",

    position: {
      desktop: {
        x: 80,
        y: 74,
      },

      mobile: {
        x: 50,
        y: 60,
      },
    },

    technologies: [
      "Fabric",
      "Power BI",
      "PostgreSQL",
      "SQL Server",
      "ETL",
      "Data Lake",
      "Azure Data Factory",
    ],

    description:
      "Transforming fragmented enterprise data into trusted business intelligence through robust pipelines, modern data warehouses and real-time analytics.",
  },

  {
    id: "ai",

    title: "Artificial Intelligence",

    short: "AI",

    icon: BrainCircuit,

    color: "#e50914",

    position: {
      desktop: {
        x: 50,
        y: 92,
      },

      mobile: {
        x: 50,
        y: 78,
      },
    },

    technologies: [
      "OpenAI",
      "LangChain",
      "Machine Learning",
      "Computer Vision",
      "Automation",
      "LLMs",
      "Prediction",
    ],

    description:
      "Building intelligent systems that automate workflows, understand natural language, extract knowledge and generate business insights using modern AI technologies.",
  },

  {
    id: "analytics",

    title: "Analytics",

    short: "Insights",

    icon: BarChart3,

    color: "#e50914",

    position: {
      desktop: {
        x: 20,
        y: 74,
      },

      mobile: {
        x: 50,
        y: 96,
      },
    },

    technologies: [
      "Power BI",
      "Dashboards",
      "KPIs",
      "Reporting",
      "Forecasting",
      "Executive Analytics",
    ],

    description:
      "Delivering executive dashboards and decision-support systems that transform operational metrics into actionable business intelligence.",
  },
];

export const centerNode = {

  title: "OHM LABS",

  subtitle: "AFRICA",

  description:
    "Engineering intelligent digital ecosystems through software, enterprise platforms, cloud infrastructure and artificial intelligence.",
};