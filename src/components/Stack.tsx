import { motion } from "framer-motion";
import { stack } from "../data";
import Reveal from "./Reveal";
import "./Stack.css";

export default function Stack() {
    return (
        <section id="stack" className="section stack t t-lilac">
            <div className="wrap">
                <div className="label"><b>04</b> Stack</div>
                <div className="stack__grid">
                    {stack.map((g, i) => (
                        <Reveal key={g.group} delay={i * 0.06}>
                            <h3>{g.group}</h3>
                            <ul>
                                {g.items.map((it, n) => (
                                    <motion.li
                                        key={it}
                                        initial={{ opacity: 0, scale: 0.6, y: 16 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ type: "spring", stiffness: 260, damping: 16, delay: i * 0.05 + n * 0.04 }}
                                        whileHover={{ y: -4, rotate: -2 }}
                                    >
                                        {it}
                                    </motion.li>
                                ))}
                            </ul>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
