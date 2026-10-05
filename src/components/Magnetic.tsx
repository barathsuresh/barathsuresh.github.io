import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

// Pulls its child toward the pointer.
export default function Magnetic({ children, pull = 0.35 }: { children: ReactNode; pull?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const x = useSpring(mx, { stiffness: 220, damping: 16, mass: 0.4 });
    const y = useSpring(my, { stiffness: 220, damping: 16, mass: 0.4 });

    return (
        <motion.div
            ref={ref}
            style={{ x, y, display: "inline-block" }}
            onPointerMove={(e) => {
                const r = ref.current!.getBoundingClientRect();
                mx.set((e.clientX - (r.left + r.width / 2)) * pull);
                my.set((e.clientY - (r.top + r.height / 2)) * pull);
            }}
            onPointerLeave={() => {
                mx.set(0);
                my.set(0);
            }}
        >
            {children}
        </motion.div>
    );
}
