"use client";

import { useRef, useState, type MouseEvent } from "react";

const TRAPS = [
  { id: "quit", label: "Desistir agora", dodge: true },
  { id: "exit", label: "Sair da missão", dodge: false },
  { id: "real", label: "Desistir de verdade", dodge: true },
  { id: "please", label: "Por favor, deixa eu desistir", dodge: false },
] as const;

type Offset = { x: number; y: number };

export function QuitTraps() {
  const [offsets, setOffsets] = useState<Record<string, Offset>>({});
  const [mockClicks, setMockClicks] = useState(0);
  const zoneRef = useRef<HTMLDivElement>(null);

  function dodge(id: string) {
    const zone = zoneRef.current;
    if (!zone) return;

    const rect = zone.getBoundingClientRect();
    const maxX = Math.max(40, rect.width * 0.28);
    const maxY = Math.max(24, rect.height * 0.35);
    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;

    setOffsets((prev) => ({ ...prev, [id]: { x, y } }));
  }

  function handleTrapClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setMockClicks((n) => n + 1);
    /* nothing happens — by design */
  }

  return (
    <div className="quit-traps" ref={zoneRef}>
      <p className="quit-traps-label">Atalhos proibidos</p>
      <p className="quit-traps-hint">
        Pode tentar. O botão de desistir está quebrado de propósito.
      </p>

      <div className="quit-traps-row">
        {TRAPS.map((trap) => {
          const offset = offsets[trap.id] ?? { x: 0, y: 0 };
          return (
            <button
              key={trap.id}
              type="button"
              className={`quit-trap ${trap.dodge ? "quit-trap--dodge" : ""}`}
              style={
                trap.dodge
                  ? {
                      transform: `translate(${offset.x}px, ${offset.y}px)`,
                    }
                  : undefined
              }
              onMouseEnter={() => {
                if (trap.dodge) dodge(trap.id);
              }}
              onFocus={() => {
                if (trap.dodge) dodge(trap.id);
              }}
              onClick={handleTrapClick}
              aria-label={`${trap.label} (não faz nada)`}
            >
              {trap.label}
            </button>
          );
        })}
      </div>

      {mockClicks > 0 && (
        <p className="quit-traps-feedback" aria-live="polite">
          Tentativas de desistir: {mockClicks}. Resultado: nada.
        </p>
      )}
    </div>
  );
}
