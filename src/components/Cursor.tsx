import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

// Replaces the system cursor on mouse devices: a soft circle that trails the
// pointer and swells over anything clickable.
export default function Cursor() {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const sx = useSpring(x, { stiffness: 500, damping: 36, mass: 0.35 });
    const sy = useSpring(y, { stiffness: 500, damping: 36, mass: 0.35 });
    const [big, setBig] = useState(false);
    const [fine] = useState(
        () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
    );

    useEffect(() => {
        if (!fine) return;
        document.documentElement.classList.add("has-cursor");
        const move = (e: PointerEvent) => {
            x.set(e.clientX);
            y.set(e.clientY);
            setBig(!!(e.target as Element)?.closest("a, button"));
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => {
            window.removeEventListener("pointermove", move);
            document.documentElement.classList.remove("has-cursor");
        };
    }, [fine, x, y]);

    if (!fine) return null;
    return (
        <motion.div
            className="cursor"
            aria-hidden="true"
            style={{ x: sx, y: sy }}
            animate={{ width: big ? 64 : 20, height: big ? 64 : 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
        />
    );
}
