// ============================================================
//  data.ts  –  EDIT THIS FILE TO UPDATE THE WHOLE PORTFOLIO
// ============================================================

const base = import.meta.env.BASE_URL;

// ── Identity ─────────────────────────────────────────────────
export const personal = {
    name: "Barath Suresh",
    first: "Barath",
    role: "Backend engineer",
    location: "Tempe, Arizona",
    timeZone: "America/Phoenix",
    email: "barathsuresh.dev@gmail.com",
    availability: "Open to roles from 2027",
    profileImage: `${base}profile.jpg`,
    resumeUrl: `${base}Barath_Suresh_Resume.pdf`,
};

// ── Brand: one idea, repeated everywhere ─────────────────────
export const brand = {
    idea: "Systems you can see inside.",
    greetings: ["Hello", "வணக்கம்", "नमस्ते", "Hola", "Bonjour"],
    heroLine: { before: "Backend systems you can", emphasis: "see", after: "inside." },
    heroIntro:
        "I'm Barath, a backend engineer. I build services, queues and AI infrastructure with tracing, metrics and logs from the first commit, so when something breaks, it explains itself.",
    keywords: [
        "Distributed systems",
        "Spring Boot",
        "Observability",
        "Event-driven design",
        "AI infrastructure",
        "RAG",
        "Cloud-native",
    ],
    letter: [
        "I like the part of software most people only notice when it breaks: queues, caches, auth, logs.",
        "My rule is simple. If I can't see inside a system, I don't trust it, so I build with tracing and metrics from the start and treat dashboards as part of the product.",
        "Lately that curiosity has pulled me toward AI infrastructure: retrieval, fine-tuning, and keeping inference endpoints standing when traffic spikes.",
    ],
};

export const socials = {
    github: "https://github.com/barathsuresh",
    linkedin: "https://linkedin.com/in/barath-suresh",
    x: "https://x.com/baraxh_s",
    email: `mailto:${personal.email}`,
};

export const navLinks = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
];

// ── Work ─────────────────────────────────────────────────────
export interface Role {
    org: string;
    title: string;
    place: string;
    period: string;
    summary: string;
    points: string[];
}

export const work: Role[] = [
    {
        org: "Tata Elxsi",
        title: "Software Engineer",
        place: "Chennai",
        period: "Dec 2024 – Jul 2025",
        summary: "Owned backend reliability for an OTT content platform: ingestion, auth and incident response.",
        points: [
            "Rebuilt the catalog bulk import as an asynchronous RabbitMQ pipeline, so 20,000-row files stopped timing out the UI.",
            "Secured 50+ REST APIs with Spring Security, Azure AD OAuth 2.0 and JWT, and made auth fast enough to vanish from the latency graph.",
            "Built a Spring AI and Gemma 3 pipeline that reads logs across six microservices and flags batch-upload crashes in minutes instead of hours.",
            "Streamed crash logs through RabbitMQ into Grafana Loki for live triage, and added Hazelcast caching for hot catalog reads.",
        ],
    },
    {
        org: "Tata Elxsi",
        title: "Software Engineer Intern",
        place: "Bengaluru",
        period: "Jan 2024 – Jun 2024",
        summary: "First taste of production telemetry: streaming data from set-top boxes to live dashboards.",
        points: [
            "Built FastAPI and MQTT ingestion pipelines to stream set-top box metrics at high throughput.",
            "Wrote WebSocket relay services and PostgreSQL persistence that fed real-time Grafana dashboards.",
        ],
    },
];

// ── Education ────────────────────────────────────────────────
export const education = [
    { school: "Arizona State University", degree: "M.S. Computer Science", period: "2025 – 2027" },
    { school: "SASTRA Deemed University", degree: "B.Tech Computer Science", period: "2020 – 2024" },
];

// ── Projects ─────────────────────────────────────────────────
export interface Project {
    name: string;
    kind: string;
    summary: string;
    tags: string[];
    url: string;
}

export const projects: Project[] = [
    {
        name: "Throttlr",
        kind: "Distributed rate limiting",
        summary:
            "A rate limiter that shields APIs and LLM endpoints from traffic spikes, using atomic Redis Lua scripts on GCP Cloud Run. Tuned and load-tested until throughput climbed more than tenfold with zero errors, plus a live dashboard for rules.",
        tags: ["Java", "Spring Boot", "Redis", "Lua", "Terraform", "React"],
        url: "https://github.com/barathsuresh/throttlr", // verify repo URL
    },
    {
        name: "Prism",
        kind: "Video streaming platform",
        summary:
            "Eight Spring Boot services where RabbitMQ keeps big uploads away from FFmpeg transcoding, with a reactive gateway, multi-tenant API keys, and every request traced end to end through Zipkin, Prometheus, Grafana and Loki.",
        tags: ["Spring Boot", "WebFlux", "RabbitMQ", "Zipkin", "AWS S3"],
        url: "https://github.com/barathsuresh/prism",
    },
    {
        name: "Sift",
        kind: "Semantic codebase search",
        summary:
            "Ask questions of a repository and get answers with file and line citations. Tree-sitter parsing, NVIDIA NIM embeddings and hybrid search on pgvector, with incremental caching that turns a half-hour re-index into seconds.",
        tags: ["Python", "pgvector", "tree-sitter", "NVIDIA NIM"],
        url: "https://github.com/barathsuresh/sift", // verify repo URL
    },
    {
        name: "NeuroScribe",
        kind: "MRI-to-report AI pipeline",
        summary:
            "Fine-tuned language models that draft radiology reports from MRI scans, with a segmentation check that keeps every measurement grounded in the scan. Deployed on SageMaker with Terraform.",
        tags: ["PyTorch", "MONAI", "QLoRA", "SageMaker"],
        url: "https://github.com/barathsuresh/neuroscribe", // verify repo URL
    },
];

// ── Stack ────────────────────────────────────────────────────
export const stack = [
    { group: "Languages", items: ["Java", "Python", "TypeScript", "Go", "SQL", "C / C++"] },
    { group: "Backend", items: ["Spring Boot", "Spring Security", "Spring AI", "FastAPI", "WebFlux", "Microservices"] },
    { group: "AI / ML", items: ["RAG", "pgvector", "PyTorch", "LoRA / QLoRA", "NVIDIA NIM"] },
    { group: "Cloud", items: ["AWS", "GCP Cloud Run", "Docker", "Kubernetes", "Terraform", "CI/CD"] },
    { group: "Data & Observability", items: ["PostgreSQL", "Redis", "RabbitMQ", "Kafka", "Prometheus", "Grafana", "Zipkin"] },
];

// ── GA4 Measurement ID ───────────────────────────────────────
export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
