import { useCallback, useEffect, useState } from "react";
import LoveLetter from "@/components/LoveLetter";
import Confetti from "@/components/Confetti";
import YellowFlowers from "@/components/YellowFlowers";

const TOTAL_PAGES = 6; // cover + 5 chapters

const Cover = () => (
  <div className="page-face" style={{ padding: 0, overflow: "hidden" }} data-testid="book-cover">
    <div className="cover-art">
      <div className="cover-ornament">✦ ✦ ✦</div>
      <p className="cover-sub">To my favorite classmate,</p>
      <h1 className="cover-title">best friend & everything</h1>
      <p className="cover-sub">Happy Birthday</p>
      <div className="cover-name">Rishii</div>
      <div className="cover-ornament" style={{ marginTop: "1.2rem" }}>✦ ✦ ✦</div>
    </div>
  </div>
);

const PageShell = ({ eyebrow, title, children, pageNo, hint = "Turn the page →" }) => (
  <div className="page-face paper-texture">
    <div>
      <p className="page-eyebrow">{eyebrow}</p>
      <h2 className="page-title">{title}</h2>
      <div className="page-divider" />
    </div>
    <div style={{ flex: 1 }}>{children}</div>
    <span className="page-number">— {pageNo} —</span>
    <span className="page-hint">{hint}</span>
  </div>
);

const Page1 = () => (
  <PageShell eyebrow="Chapter One" title="Childhood Roots" pageNo="I">
    <p className="page-body">
      Growing up as classmates, I always knew you were special. From sharing a
      classroom as kids to where we are today, the distance has nothing on the
      roots we built back then.
    </p>
  </PageShell>
);

const Page2 = () => (
  <PageShell eyebrow="Chapter Two" title="The Proposal" pageNo="II">
    <p className="page-body">
      <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.6rem", color: "#b85a6a" }}>
        March 12<sup>th</sup>.
      </span>{" "}
      The day you proposed is forever etched in my mind. It&apos;s the day my world
      got infinitely brighter, and I realized how incredibly lucky I am to have
      you as my girl.
    </p>
  </PageShell>
);

const Page3 = () => (
  <PageShell eyebrow="Chapter Three" title="Our Rare Moments" pageNo="III">
    <p className="page-body" style={{ marginBottom: "0.5rem" }}>
      We may have only met in person 2 times, but those brief moments mean more
      to me than a lifetime with anyone else.
    </p>
    <div className="polaroid-row" data-testid="photo-gallery">
      
      {/* Polaroid 1 */}
      <div className="className="polaroid"">
        <div className="polaroid-placeholder" data-testid="photo-1">
          <img 
            src="https://ibb.co/FTw9WXZ" 
            alt="Meeting 1" 
            className="polaroid-img" 
          />
        </div>
        <div className="polaroid-caption">Meeting #1</div>
      </div>

      {/* Polaroid 2 */}
      <div className="className="polaroid"">
        <div className="polaroid-placeholder" data-testid="photo-2">
          <img 
            src="https://ibb.co/CGvWwSx" 
            alt="Meeting 2" 
            className="polaroid-img" 
          />
        </div>
        <div className="polaroid-caption">Meeting #2</div>
      </div>

    </div>
  </PageShell>
);

const Page4 = ({ onOpenLetter }) => (
  <PageShell eyebrow="Chapter Four" title="A Letter, From Me to You" pageNo="IV">
    <p className="page-body" style={{ marginBottom: "0.8rem" }}>
      Tucked inside the book, sealed in vintage paper — for your eyes only.
    </p>
    <div
      className="letter-pocket"
      onClick={(e) => {
        e.stopPropagation();
        onOpenLetter();
      }}
      data-testid="letter-pocket"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenLetter();
        }
      }}
    >
      <div className="letter-pocket-label">A Folded Letter</div>
      <div className="letter-pocket-hint">click to unfold</div>
    </div>
  </PageShell>
);

const Page5 = () => (
  <div className="page-face paper-texture" style={{ position: "relative", overflow: "hidden" }}>
    <Confetti count={70} />
    <div className="wish-page" data-testid="wish-page">
      <div className="wish-date">June 18</div>
      <h2 className="wish-title">Happy Birthday,<br/>My Love</h2>
      <div className="page-divider" style={{ margin: "0 auto 1rem" }} />
      <p className="wish-text">
        Today is all about you. I hope this year brings you as much happiness
        as you give me every single day.
      </p>
      <p className="wish-text" style={{ marginTop: "1rem" }}>
        I love you, Rishii.
      </p>
      <div className="wish-signature">— Mahendra</div>
    </div>
    <span className="page-number">— V —</span>
  </div>
);

const PAGES = [Cover, Page1, Page2, Page3, Page4, Page5];

const MemoryBook = () => {
  const [current, setCurrent] = useState(0); // index of next-page-to-be-revealed (0 = cover shown)
  const [letterOpen, setLetterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 768
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, TOTAL_PAGES - 1));
  }, []);
  const prev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  // Mobile vertical scrapbook
  if (isMobile) {
    return (
      <div className="book-stage" data-testid="book-stage">
        <YellowFlowers />
        <div className="book" data-testid="book-mobile">
          {PAGES.map((PageComp, i) => (
            <div className="page" key={i} data-testid={`mobile-page-${i}`}>
              {i === 4 ? (
                <Page4 onOpenLetter={() => setLetterOpen(true)} />
              ) : (
                <PageComp />
              )}
            </div>
          ))}
        </div>
        <LoveLetter open={letterOpen} onClose={() => setLetterOpen(false)} />
      </div>
    );
  }

  // Desktop 3D book
  return (
    <div className="book-stage" data-testid="book-stage">
      <YellowFlowers />
      <div className="book" data-testid="book-desktop">
        <div className="book-cover-back" />
        {PAGES.map((PageComp, i) => {
          const isFlipped = i < current;
          // Higher index pages sit deeper in the stack so the current visible page is on top
          const z = TOTAL_PAGES - i;
          return (
            <div
              key={i}
              className={`page ${isFlipped ? "flipped" : ""}`}
              style={{ zIndex: z }}
              onClick={() => {
                // Click on the visible (current) page advances
                if (i === current) next();
              }}
              data-testid={`book-page-${i}`}
            >
              {/* Front face: content of this page */}
              {i === 4 ? (
                <Page4 onOpenLetter={() => setLetterOpen(true)} />
              ) : (
                <PageComp />
              )}
              {/* Back face (paper back side) */}
              <div className="page-face page-back" />
            </div>
          );
        })}
      </div>

      <div className="book-nav" data-testid="book-nav">
        <button
          className="nav-btn"
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous page"
          data-testid="nav-prev-btn"
        >
          ‹
        </button>
        <span className="nav-indicator" data-testid="nav-indicator">
          {current + 1} / {TOTAL_PAGES}
        </span>
        <button
          className="nav-btn"
          onClick={next}
          disabled={current === TOTAL_PAGES - 1}
          aria-label="Next page"
          data-testid="nav-next-btn"
        >
          ›
        </button>
      </div>

      <LoveLetter open={letterOpen} onClose={() => setLetterOpen(false)} />
    </div>
  );
};

export default MemoryBook;
