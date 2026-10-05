import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand, personal } from "../data";
import "./Loader.css";

interface LoaderProps {
    onReveal: () => void;
    onComplete: () => void;
}

const GREET_MS = 340;

// Background flips with every greeting; the name lands on ink.
const SCENES = [
    { bg: "#12111a", fg: "#f7f0e3", acc: "#f2d98a" },
    { bg: "#25306b", fg: "#f7f0e3", acc: "#f2d98a" },
    { bg: "#d8643f", fg: "#12111a", acc: "#f7f0e3" },
    { bg: "#d6cdea", fg: "#12111a", acc: "#25306b" },
    { bg: "#f2d98a", fg: "#12111a", acc: "#25306b" },
] as const;

export default function Loader({ onReveal, onComplete }: LoaderProps) {
    const [i, setI] = useState(0);
    const [showName, setShowName] = useState(false);
    const [leaving, setLeaving] = useState(false);
    const done = useRef(false);

    const leave = useCallback(() => {
        if (done.current) return;
        done.current = true;
        setShowName(true);
        setLeaving(true);
        onReveal();
    }, [onReveal]);

    useEffect(() => {
        const timers: ReturnType<typeof setTimeout>[] = [];
        brand.greetings.forEach((_, n) => {
            if (n > 0) timers.push(setTimeout(() => setI(n), n * GREET_MS));
        });
        const nameAt = brand.greetings.length * GREET_MS;
        timers.push(setTimeout(() => setShowName(true), nameAt));
        timers.push(setTimeout(leave, nameAt + 900));
        return () => timers.forEach(clearTimeout);
    }, [leave]);

    useEffect(() => {
        window.addEventListener("keydown", leave);
        return () => window.removeEventListener("keydown", leave);
    }, [leave]);

    const scene = showName ? SCENES[0] : SCENES[i % SCENES.length];

    return (
        <motion.div
            className="loader"
            style={{ backgroundColor: scene.bg, color: scene.fg, ["--acc" as string]: scene.acc }}
            onClick={leave}
            role="status"
            aria-label="Loading"
            initial={{ y: 0 }}
            animate={{ y: leaving ? "-100%" : 0 }}
            transition={{ duration: 0.9, delay: leaving ? 0.25 : 0, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => leaving && onComplete()}
        >
            <div className="loader__stage">
                {!showName ? (
                    <motion.p
                        key={i}
                        className="loader__greet serif"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <span className="loader__dot" />
                        {brand.greetings[i]}
                    </motion.p>
                ) : (
                    <motion.p
                        className="loader__name serif"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {personal.first} <em>Suresh</em>
                    </motion.p>
                )}
            </div>
            <span className="loader__skip">{personal.role} · click to skip</span>
        </motion.div>
    );
}
