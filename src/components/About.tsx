import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { brand, education, personal } from "../data";
import Reveal from "./Reveal";
import "./About.css";

export default function About() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
    const rot = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

    return (
        <section id="about" className="section t t-cream" ref={ref}>
            <div className="wrap">
                <div className="label"><b>01</b> About</div>

                <div className="about">
                    <Reveal className="about__photo">
                        <motion.div className="about__frame" style={{ rotate: rot }}>
                            <motion.img
                                src={personal.profileImage}
                                alt={personal.name}
                                loading="lazy"
                                style={{ y: imgY, scale: 1.08, transformOrigin: "50% 40%" }}
                            />
                        </motion.div>
                        <p>{personal.location}</p>
                    </Reveal>

                    <div className="about__body">
                        {brand.letter.map((p, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <p className={i === 0 ? "about__lead serif" : "about__p"}>{p}</p>
                            </Reveal>
                        ))}

                        <Reveal>
                            <ul className="about__edu">
                                {education.map((e) => (
                                    <li key={e.school}>
                                        <span>{e.period}</span>
                                        <div>
                                            <strong>{e.school}</strong>
                                            {e.degree}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
