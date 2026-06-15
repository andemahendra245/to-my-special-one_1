import { useEffect, useState } from "react";
import { FlowerByType } from "@/components/FlowerSvgs";

// Generate burst flowers fanning out in all directions, filling the screen
const buildBurst = (count) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 8 + Math.pow(Math.random(), 0.6) * 65;
    const size = 40 + Math.random() * 90;
    const delay = Math.random() * 1.8;
    const rot = (Math.random() - 0.5) * 180;
    // 50% sunflowers, 30% yellow roses, 20% white roses
    const r = Math.random();
    const type = r < 0.5 ? "sunflower" : r < 0.8 ? "yrose" : "wrose";
    items.push({
      id: i,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size,
      delay,
      rot,
      type,
    });
  }
  return items;
};

const Splash = ({ phase, onStart, onFinish }) => {
  const [fadingHeart, setFadingHeart] = useState(false);
  const [flowers] = useState(() => buildBurst(95));

  useEffect(() => {
    if (phase === "splash") {
      const t = setTimeout(() => onFinish?.(), 6200);
      return () => clearTimeout(t);
    }
  }, [phase, onFinish]);

  const handleHeart = () => {
    setFadingHeart(true);
    setTimeout(() => onStart?.(), 700);
  };

  if (phase === "heart") {
    return (
      <div
        className={`heart-stage ${fadingHeart ? "fade-out" : ""}`}
        data-testid="heart-stage"
      >
        <button
          className="heart-btn"
          onClick={handleHeart}
          aria-label="Open birthday surprise"
          data-testid="heart-button"
        >
          <svg viewBox="0 0 100 100" className="heart-pulse">
            <defs>
              <radialGradient id="heartG" cx="35%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#ff9caa" />
                <stop offset="55%" stopColor="#e36b80" />
                <stop offset="100%" stopColor="#b04760" />
              </radialGradient>
            </defs>
            <path
              fill="url(#heartG)"
              d="M50 86 C20 64 8 46 8 30 C8 17 18 8 30 8 C39 8 46 13 50 21 C54 13 61 8 70 8 C82 8 92 17 92 30 C92 46 80 64 50 86 Z"
            />
          </svg>
        </button>
        <div className="heart-caption" data-testid="heart-caption">
          A little surprise for
        </div>
        <div className="heart-caption-name">Rishii</div>
      </div>
    );
  }

  return (
    <div className="splash-stage" data-testid="splash-stage">
      <div className="burst-container" data-testid="flower-burst">
        {flowers.map((f) => (
          <div
            key={f.id}
            className="burst-flower"
            style={{
              "--dx": `${f.dx}vmax`,
              "--dy": `${f.dy}vmax`,
              "--rot": `${f.rot}deg`,
              animationDelay: `${f.delay}s`,
            }}
          >
            <FlowerByType type={f.type} size={f.size} idSuffix={`b${f.id}`} />
          </div>
        ))}
      </div>
      <div className="brand">
        <p className="brand-name">Happy Birthday, Rishii</p>
        <p className="brand-sub">A Memory Book · June 18</p>
      </div>
    </div>
  );
};

export default Splash;
