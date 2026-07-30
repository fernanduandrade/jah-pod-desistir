"use client";

type XpBarProps = {
  xp: number;
  maxXp?: number;
  level: number;
};

export function XpBar({ xp, maxXp = 10, level }: XpBarProps) {
  const percent = Math.min(100, Math.round((xp / maxXp) * 100));

  return (
    <div className="xp-wrap" aria-label={`Nível ${level}, ${percent}% de XP`}>
      <div className="xp-meta">
        <span className="xp-label">LV {level}</span>
        <span className="xp-value">
          XP {xp}/{maxXp}
        </span>
      </div>
      <div className="xp-track">
        <div className="xp-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
