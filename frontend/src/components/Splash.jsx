import { useEffect, useState } from "react";

// Realistic flower photos used in the burst
const BURST_PHOTOS = [
  // Sunflowers (close-up)
  "https://images.unsplash.com/photo-1533523611631-15e4ef69be08?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1666545449593-b337668aa081?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606820152786-272f760f1d0e?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563221923-d90d0a7dcf89?w=300&q=80&auto=format&fit=crop",
  // Yellow roses
  "https://images.unsplash.com/photo-1723962768162-52d38d21f94b?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1711649883870-7cb75e2e8c3e?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1769609300795-52dc154dec3e?w=300&q=80&auto=format&fit=crop",
  // White roses
  "https://images.unsplash.com/photo-1551771562-5f6b587637cb?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610247672619-df289f408ff2?w=300&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486639107311-064febaff1c5?w=300&q=80&auto=format&fit=crop",
];

// Build a true "burst" — all flowers explode out from the center
// in a tight time window (synchronized firework feel)
const buildBurst = (count) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Distance: a healthy spread across the screen (vmax units)
    const distance = 12 + Math.pow(Math.random(), 0.55) * 58;
    const size = 50 + Math.random() * 90;
    // Tight stagger — flowers ride out in waves but very quickly (0-0.65s)
    const delay = Math.random() * 0.65;
    const rot = (Math.random() - 0.5) * 200;
    const photo = BURST_PHOTOS[Math.floor(Math.random() * BURST_PHOTOS.length)];
    items.push({
      id: i,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size,
      delay,
      rot,
      photo,
    });
  }
  return items;
};

const Splash = ({ phase, onStart, onFinish }) => {
  const [fadingHeart, setFadingHeart] = useState(false);
  const [flowers] = useState(() => buildBurst(70));

  // Preload the realistic flower photos while the heart screen is shown
  useEffect(() => {
    BURST_PHOTOS.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (phase === "splash") {
      // burst (~2s) + brand fade (~2s) + hold (~2s) -> 6s total
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
      {/* Bright burst flash at center */}
      <div className="burst-flash" aria-hidden="true" />
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
              width: `${f.size}px`,
              height: `${f.size}px`,
            }}
          >
            <img
              src={f.photo}
              alt=""
              loading="eager"
              draggable={false}
              className="burst-flower-img"
            />
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
