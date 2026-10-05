import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { brand, personal } from "../data";
import Magnetic from "./Magnetic";
import "./Hero.css";

const EASE = [0.76, 0, 0.24, 1] as const;

function Words({ text, start, em }: { text: string; start: number; em?: boolean }) {
    return (
        <>
            {text.split(" ").map((w, i) => (
                <span className="hero__mask" key={`${w}-${i}`}>
                    <motion.span
                        className={em ? "hero__em" : undefined}
                        initial={{ y: "115%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.9, delay: start + i * 0.08, ease: EASE }}
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </>
    );
}

function useLocalTime() {
    const fmt = () =>
        new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            timeZone: personal.timeZone,
        }).format(new Date());
    const [t, setT] = useState(fmt);
    useEffect(() => {
        const id = setInterval(() => setT(fmt()), 30_000);
        return () => clearInterval(id);
    }, []);
    return t;
}

function useMouseParallax() {
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    useEffect(() => {
        const move = (e: PointerEvent) => {
            mx.set(e.clientX / window.innerWidth - 0.5);
            my.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
    }, [mx, my]);
    const cfg = { stiffness: 60, damping: 18, mass: 0.6 };
    return { x: useSpring(mx, cfg), y: useSpring(my, cfg) };
}

export default function Hero() {
    const time = useLocalTime();
    const { x, y } = useMouseParallax();
    const circleX = useTransform(x, (v) => v * -70);
    const circleY = useTransform(y, (v) => v * -70);
    const starX = useTransform(x, (v) => v * 90);
    const starY = useTransform(y, (v) => v * 90);
    const moonX = useTransform(x, (v) => v * -40);
    const moonY = useTransform(y, (v) => v * 50);
    const { before, emphasis, after } = brand.heroLine;
    const fade = (delay: number) => ({
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay, ease: "easeOut" as const },
    });

    return (
        <section id="top" className="hero t t-sun">
            <div className="hero__shapes" aria-hidden="true">
                <motion.span
                    className="shape shape--circle"
                    style={{ x: circleX, y: circleY }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.5 }}
                >
                    <span className="hero__badge">
                        <svg viewBox="0 0 120 120" className="hero__badge-ring">
                            <defs>
                                <path id="ring" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                            </defs>
                            <text>
                                <textPath href="#ring" textLength="284" lengthAdjust="spacing">SEE INSIDE · SEE INSIDE · SEE INSIDE ·</textPath>
                            </text>
                        </svg>
                        <span className="hero__badge-dot">✦</span>
                    </span>
                </motion.span>
                <motion.span
                    className="shape shape--star"
                    style={{ x: starX, y: starY }}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 10, delay: 0.7 }}
                >
                    <i />
                </motion.span>
                <motion.span
                    className="shape shape--moon"
                    style={{ x: moonX, y: moonY }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.9 }}
                />
            </div>

            <div className="wrap hero__inner">
                <motion.p className="hero__eyebrow" {...fade(0.1)}>
                    <span className="hero__pulse" /> {personal.name} — {personal.role}
                </motion.p>

                <h1 className="hero__title serif">
                    <Words text={before} start={0.2} />
                    <Words text={emphasis} start={0.55} em />
                    <Words text={after} start={0.65} />
                </h1>

                <div className="hero__row">
                    <motion.p className="hero__intro" {...fade(1.0)}>
                        {brand.heroIntro}
                    </motion.p>

                    <motion.div className="hero__meta" {...fade(1.1)}>
                        <p>
                            <span>Based in</span>
                            {personal.location} · {time}
                        </p>
                        <p>
                            <span>Status</span>
                            {personal.availability}
                        </p>
                    </motion.div>
                </div>

                <motion.div className="hero__ctas" {...fade(1.2)}>
                    <Magnetic>
                        <a className="btn btn--solid" href="#projects">
                            See the work <span aria-hidden>↓</span>
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a className="btn btn--line" href={personal.resumeUrl} download>
                            Resume
                        </a>
                    </Magnetic>
                </motion.div>
            </div>

            <div className="hero__marquee" aria-hidden="true">
                <div className="hero__track">
                    {[0, 1].map((n) => (
                        <ul key={n}>
                            {brand.keywords.map((k) => (
                                <li key={k}>{k}</li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
}
