export default function HeroWordmark({ eyebrow, isReady, title }) {
  return (
    <div className={`hero-wordmark${isReady ? " hero-wordmark--ready" : ""}`}>
      <div className="hero-wordmark__frame">
        <svg
          aria-hidden="true"
          className="hero-wordmark__ellipse"
          viewBox="0 0 1000 840"
          preserveAspectRatio="none"
        >
          <path
            className="hero-wordmark__ellipse-arc"
            pathLength={1}
            d="M 500 2 A 498 418 0 0 0 500 838"
          />
          <path
            className="hero-wordmark__ellipse-arc"
            pathLength={1}
            d="M 500 2 A 498 418 0 0 1 500 838"
          />
        </svg>
        <h1 className="hero-wordmark__title">
          <span className="hero-wordmark__eyebrow">{eyebrow}</span>
          <span className="hero-wordmark__name">{title}</span>
        </h1>
      </div>
    </div>
  );
}
