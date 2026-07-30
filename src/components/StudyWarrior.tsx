"use client";

type StudyWarriorProps = {
  levelUp?: boolean;
  blink?: boolean;
};

export function StudyWarrior({ levelUp = false, blink = false }: StudyWarriorProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width="192"
      height="192"
      className={`warrior-sprite ${levelUp ? "warrior-level-up" : ""}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Floor shadow */}
      <rect x="16" y="58" width="32" height="4" fill="#0a0a14" opacity="0.45" />

      {/* Desk */}
      <rect x="6" y="44" width="52" height="4" fill="#8b5a2b" />
      <rect x="8" y="48" width="4" height="10" fill="#6b4220" />
      <rect x="52" y="48" width="4" height="10" fill="#6b4220" />

      {/* Stack of books */}
      <rect x="8" y="38" width="14" height="3" fill="#e43b44" />
      <rect x="9" y="35" width="12" height="3" fill="#3e9bff" />
      <rect x="10" y="32" width="10" height="3" fill="#f7d51d" />

      {/* Notebook / screen glow */}
      <rect x="40" y="34" width="16" height="10" fill="#1a1c2c" />
      <rect x="42" y="36" width="12" height="6" fill="#c084fc" className="screen-glow" />
      <rect x="44" y="44" width="8" height="2" fill="#5a6988" />

      {/* Body / tunic */}
      <rect x="24" y="30" width="16" height="14" fill="#5b2d8e" />
      <rect x="26" y="32" width="12" height="4" fill="#a855f7" />
      {/* Belt */}
      <rect x="24" y="40" width="16" height="2" fill="#f7d51d" />
      <rect x="30" y="39" width="4" height="4" fill="#ef7d57" />

      {/* Arms */}
      <rect x="18" y="32" width="6" height="4" fill="#ef7d57" />
      <rect x="40" y="32" width="6" height="4" fill="#ef7d57" />

      {/* Book-sword in hand */}
      <g className="book-sword">
        <rect x="44" y="18" width="6" height="16" fill="#8b5a2b" />
        <rect x="43" y="16" width="8" height="4" fill="#e43b44" />
        <rect x="45" y="20" width="4" height="2" fill="#f4f4f4" />
        <rect x="45" y="24" width="4" height="2" fill="#f4f4f4" />
        <rect x="46" y="34" width="2" height="4" fill="#c0c0c0" />
      </g>

      {/* Head */}
      <rect x="24" y="16" width="16" height="14" fill="#ef7d57" />
      {/* Hair */}
      <rect x="24" y="14" width="16" height="4" fill="#1a1c2c" />
      <rect x="22" y="16" width="4" height="6" fill="#1a1c2c" />
      <rect x="38" y="16" width="4" height="4" fill="#1a1c2c" />

      {/* Eyes */}
      <rect x="28" y="22" width="3" height="3" fill="#1a1c2c" className={blink ? "eye-blink" : "eye"} />
      <rect x="33" y="22" width="3" height="3" fill="#1a1c2c" className={blink ? "eye-blink" : "eye"} />

      {/* Mouth determined */}
      <rect x="29" y="27" width="6" height="2" fill="#1a1c2c" />

      {/* Level-up sparkles */}
      {levelUp && (
        <g className="sparkles">
          <rect x="12" y="10" width="2" height="2" fill="#f7d51d" />
          <rect x="50" y="8" width="2" height="2" fill="#f7d51d" />
          <rect x="8" y="24" width="2" height="2" fill="#c084fc" />
          <rect x="54" y="28" width="2" height="2" fill="#38b764" />
          <rect x="20" y="6" width="2" height="2" fill="#ffffff" />
          <rect x="46" y="4" width="2" height="2" fill="#ffffff" />
        </g>
      )}
    </svg>
  );
}
