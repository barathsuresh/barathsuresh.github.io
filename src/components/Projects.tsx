import { projects } from "../data";
import { trackEvent } from "../utils/analytics";
import Reveal from "./Reveal";
import "./Projects.css";

// Each project owns a colour that floods the row on hover.
const HOVER = [
    { bg: "#25306b", fg: "#f7f0e3", acc: "#f2d98a" },
    { bg: "#d8643f", fg: "#12111a", acc: "#f7f0e3" },
    { bg: "#d6cdea", fg: "#12111a", acc: "#25306b" },
    { bg: "#f2d98a", fg: "#12111a", acc: "#25306b" },
] as const;

export default function Projects() {
    return (
        <section id="projects" className="section t t-cream">
            <div className="wrap">
                <div className="label"><b>03</b> Projects</div>

                <ul className="projects">
                    {projects.map((p, i) => (
                        <Reveal key={p.name}>
                            <li>
                                <a
                                    className="project"
                                    href={p.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => trackEvent("project_click", { project_name: p.name })}
                                    style={
                                        {
                                            "--hbg": HOVER[i % HOVER.length].bg,
                                            "--hfg": HOVER[i % HOVER.length].fg,
                                            "--hacc": HOVER[i % HOVER.length].acc,
                                        } as React.CSSProperties
                                    }
                                >
                                    <span className="project__idx">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="project__name serif">{p.name}</span>
                                    <span className="project__kind">{p.kind}</span>
                                    <p className="project__summary">{p.summary}</p>
                                    <ul className="project__tags">
                                        {p.tags.map((t) => (
                                            <li key={t}>{t}</li>
                                        ))}
                                    </ul>
                                    <span className="project__arrow" aria-hidden>↗</span>
                                </a>
                            </li>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
