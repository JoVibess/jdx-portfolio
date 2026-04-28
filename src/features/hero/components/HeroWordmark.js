export default function HeroWordmark({ eyebrow, title }) {
  return (
    <div className="hero-wordmark">
      <div className="hero-wordmark__frame">
        <div aria-hidden="true" className="hero-wordmark__ellipse" />
        <h1 className="hero-wordmark__title">
          <span className="hero-wordmark__eyebrow">{eyebrow}</span>
          <span className="hero-wordmark__name">{title}</span>
        </h1>
      </div>
    </div>
  );
}
