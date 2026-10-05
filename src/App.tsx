import { useCallback, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Projects from "./components/Projects";
import ScrollBar from "./components/ScrollBar";
import Stack from "./components/Stack";
import Work from "./components/Work";
import "./styles/globals.css";

const SEEN_KEY = "bs-intro-seen";

// Intro plays once per tab session, never for reduced-motion users.
function shouldSkipIntro() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export default function App() {
  const [skip] = useState(shouldSkipIntro);
  const [revealed, setRevealed] = useState(skip);
  const [loaderDone, setLoaderDone] = useState(skip);

  const handleReveal = useCallback(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* storage unavailable – intro simply replays next visit */
    }
    setRevealed(true);
  }, []);

  const handleComplete = useCallback(() => setLoaderDone(true), []);

  return (
    <>
      {!loaderDone && <Loader onReveal={handleReveal} onComplete={handleComplete} />}
      {revealed && (
        <>
          <ScrollBar />
          <Cursor />
          <Nav />
          <main>
            <Hero />
            <About />
            <Work />
            <Projects />
            <Stack />
          </main>
          <Contact />
        </>
      )}
    </>
  );
}
