import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { work } from "../data";
import Reveal from "./Reveal";
import "./Work.css";

export default function Work() {
    const [open, setOpen] = useState(0);

    return (
        <section id="work" className="section work t t-cobalt">
            <div className="wrap">
                <div className="label"><b>02</b> Work</div>

                <ul className="work__list">
                    {work.map((r, i) => {
                        const isOpen = open === i;
                        return (
                            <Reveal key={`${r.org}-${r.period}`}>
                                <li className={`work__item ${isOpen ? "is-open" : ""}`}>
                                    <button
                                        className="work__head"
                                        aria-expanded={isOpen}
                                        onClick={() => setOpen(isOpen ? -1 : i)}
                                    >
                                        <span className="work__period">{r.period}</span>
                                        <span className="work__title serif">
                                            {r.title}, <em>{r.org}</em>
                                        </span>
                                        <span className="work__place">{r.place}</span>
                                        <span className="work__icon" aria-hidden>+</span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                className="work__panel"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                            >
                                                <div className="work__panel-inner">
                                                    <p className="work__summary">{r.summary}</p>
                                                    <ul>
                                                        {r.points.map((p, n) => (
                                                            <motion.li
                                                                key={p}
                                                                initial={{ opacity: 0, x: -24 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.15 + n * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                            >
                                                                {p}
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            </Reveal>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
