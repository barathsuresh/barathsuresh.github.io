import { useEffect, useState } from "react";
import { navLinks, personal } from "../data";
import "./Nav.css";

export default function Nav() {
    const [active, setActive] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const els = navLinks
            .map((l) => document.querySelector(l.href))
            .filter(Boolean) as Element[];
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => e.isIntersecting && setActive("#" + e.target.id)),
            { rootMargin: "-45% 0px -50% 0px" }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    const go = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className="nav">
            <div className="nav__bar">
                <a href="#top" className="nav__brand" onClick={(e) => go(e, "#top")}>
                    {personal.name}
                </a>

                <nav className="nav__links" aria-label="Primary">
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className={active === l.href ? "is-active" : ""}
                            onClick={(e) => go(e, l.href)}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <button
                    className="nav__toggle"
                    aria-expanded={open}
                    aria-label="Menu"
                    onClick={() => setOpen((o) => !o)}
                >
                    {open ? "Close" : "Menu"}
                </button>
            </div>

            {open && (
                <nav className="nav__sheet" aria-label="Mobile">
                    {navLinks.map((l) => (
                        <a key={l.href} href={l.href} className="serif" onClick={(e) => go(e, l.href)}>
                            {l.label}
                        </a>
                    ))}
                </nav>
            )}
        </header>
    );
}
