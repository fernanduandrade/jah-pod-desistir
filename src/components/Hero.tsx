"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EASTER_EGG_PHRASE,
  EASTER_EGG_THRESHOLD,
  PHRASES,
} from "@/data/phrases";
import {
  DEFAULT_PROGRESS,
  XP_PER_LEVEL,
  loadProgress,
  saveProgress,
} from "@/lib/progress-db";
import { QuitTraps } from "./QuitTraps";
import { StudyWarrior } from "./StudyWarrior";
import { XpBar } from "./XpBar";

function pickPhrase(exclude?: string) {
  const pool = exclude
    ? PHRASES.filter((p) => p !== exclude)
    : [...PHRASES];
  return pool[Math.floor(Math.random() * pool.length)] ?? PHRASES[0];
}

export function Hero() {
  const [answered, setAnswered] = useState(false);
  const [phrase, setPhrase] = useState<string>("");
  const [clicks, setClicks] = useState(DEFAULT_PROGRESS.clicks);
  const [secretUnlocked, setSecretUnlocked] = useState(
    DEFAULT_PROGRESS.secretUnlocked,
  );
  const [level, setLevel] = useState(DEFAULT_PROGRESS.level);
  const [xp, setXp] = useState(DEFAULT_PROGRESS.xp);
  const [hydrated, setHydrated] = useState(false);
  const [levelUp, setLevelUp] = useState(false);
  const [blink, setBlink] = useState(false);
  const [shake, setShake] = useState(false);
  const levelUpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadProgress().then((progress) => {
      if (cancelled) return;
      setLevel(progress.level);
      setXp(progress.xp);
      setClicks(progress.clicks);
      setSecretUnlocked(progress.secretUnlocked);
      setHydrated(true);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    void saveProgress({ level, xp, clicks, secretUnlocked });
  }, [level, xp, clicks, secretUnlocked, hydrated]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    return () => {
      if (levelUpTimer.current) clearTimeout(levelUpTimer.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    const nextClicks = clicks + 1;
    setClicks(nextClicks);
    setAnswered(true);
    setShake(true);
    setTimeout(() => setShake(false), 280);

    if (nextClicks === EASTER_EGG_THRESHOLD) {
      setPhrase(EASTER_EGG_PHRASE);
      setSecretUnlocked(true);
    } else {
      setPhrase((prev) => pickPhrase(prev));
    }

    setXp((prevXp) => {
      const nextXp = prevXp + 1;
      if (nextXp >= XP_PER_LEVEL) {
        setLevel((l) => l + 1);
        setLevelUp(true);
        if (levelUpTimer.current) clearTimeout(levelUpTimer.current);
        levelUpTimer.current = setTimeout(() => setLevelUp(false), 900);
        return 0;
      }
      setLevelUp(true);
      if (levelUpTimer.current) clearTimeout(levelUpTimer.current);
      levelUpTimer.current = setTimeout(() => setLevelUp(false), 450);
      return nextXp;
    });

    requestAnimationFrame(() => {
      answerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, [clicks]);

  return (
    <section className="hero">
      <div className="hero-atmosphere" aria-hidden="true" />

      <p className="brand">jahpoddesistir</p>

      <h1 className="hero-title">Já posso desistir?</h1>

      <p className="hero-sub">
        A resposta nunca muda. A sua disciplina, sim.
      </p>

      <div className={`warrior-stage ${shake ? "shake" : ""}`}>
        <StudyWarrior levelUp={levelUp} blink={blink} />
        {levelUp && <span className="level-up-tag">LEVEL UP!</span>}
      </div>

      <XpBar xp={xp} maxXp={XP_PER_LEVEL} level={level} />

      <button type="button" className="cta-btn" onClick={handleClick}>
        Já posso desistir?
      </button>

      <div
        ref={answerRef}
        className={`answer-panel ${answered ? "answer-panel--visible" : ""}`}
        aria-live="polite"
      >
        {answered && (
          <>
            <p className="answer-no">NÃO</p>
            <p className="answer-phrase">{phrase}</p>
            {secretUnlocked && (
              <p className="answer-secret">★ frase secreta desbloqueada</p>
            )}
          </>
        )}
      </div>

      <QuitTraps />
    </section>
  );
}
