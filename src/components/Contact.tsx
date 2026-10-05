import { motion } from "framer-motion";
import { personal, socials } from "../data";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import "./Contact.css";

// Parent observes the viewport; masks only clip, so the observer never sees a zero-size box.
const RISE = {
    hide: { y: "115%" },
    show: { y: 0, transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] as const } },
};

const links = [
    { label: "GitHub", href: socials.github },
    { label: "LinkedIn", href: socials.linkedin },
    { label: "X", href: socials.x },
    { label: "Resume", href: personal.resumeUrl },
];

export default function Contact() {
    return (
        <section id="contact" className="contact t t-tomato">
            <div className="wrap">
                <Reveal>
                    <p className="contact__label">05 · Contact</p>
                    <motion.h2
                        className="contact__title serif"
                        initial="hide"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10% 0px" }}
                        transition={{ staggerChildren: 0.08 }}
                    >
                        {["Let's", "build", "something", "you", "can"].map((w) => (
                            <span className="contact__mask" key={w}>
                                <motion.span variants={RISE}>{w}</motion.span>
                            </span>
                        ))}
                        <span className="contact__mask">
                            <motion.em variants={RISE}>see inside.</motion.em>
                        </span>
                    </motion.h2>
                    <Magnetic pull={0.18}>
                        <a className="contact__mail serif" href={socials.email}>
                            {personal.email} <span aria-hidden>↗</span>
                        </a>
                    </Magnetic>
                </Reveal>

                <footer className="contact__foot">
                    <ul>
                        {links.map((l) => (
                            <li key={l.label}>
                                <a href={l.href} target="_blank" rel="noopener noreferrer">
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="contact__top"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    >
                        Back to top ↑
                    </button>
                    <p>© {new Date().getFullYear()} {personal.name}</p>
                </footer>
            </div>
        </section>
    );
}
