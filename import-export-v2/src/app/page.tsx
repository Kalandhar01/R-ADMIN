import { ColorBendsBackground } from "@/components/color-bends-background";
import { ArrowUpRight, ChevronRight, Menu } from "lucide-react";

const navItems = ["Docs", "Showcase", "Tools", "Sponsors"];

const testimonials = [
  "A clear, high-end control room for trade operations.",
  "The layout feels quiet, premium, and immediate.",
  "Simple to scan, sharp to look at, and easy to trust."
];

export default function Home() {
  return (
    <main className="page">
      <div className="hero-shell">
        <ColorBendsBackground className="hero-background" />
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">IE</span>
            <span className="brand-name">Import Export v2</span>
          </div>
          <nav className="topnav" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item} href="#more">
                {item}
              </a>
            ))}
          </nav>
          <div className="topbar-actions">
            <button className="ghost-button" type="button">
              <Menu size={16} />
            </button>
            <button className="pill-button" type="button">
              Get Quote
            </button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow-row">
              <span className="eyebrow-pill">New component</span>
              <span className="eyebrow-label">Color bends</span>
            </div>
            <h1>Global logistics for teams that want the page to feel sharp.</h1>
            <p>
              A clean import-export landing page with a dark premium shell, a
              React Bits-style color-bends hero, and a simple structure that
              stays easy to scan.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#more">
                Browse services
                <ChevronRight size={16} />
              </a>
              <a className="secondary-button" href="#more">
                Learn more
              </a>
            </div>
          </div>

          <div className="code-panel" aria-label="Component preview">
            <div className="code-panel-header">
              <span className="dots">
                <i />
                <i />
                <i />
              </span>
              <span className="code-panel-label">ColorBends</span>
            </div>
            <pre>
{`import { ColorBends } from "@/components/ui/color-bends";

<ColorBends
  rotation={90}
  autoRotate={0}
  speed={0.2}
  scale={1}
  frequency={1}
  warpStrength={1}
  mouseInfluence={1}
  intensity={1.5}
  bandWidth={6}
/>`}
            </pre>
          </div>
        </section>
      </div>

      <section id="more" className="section section-minimal">
        <h2>What&apos;s inside</h2>
      </section>

      <section className="section cards-section">
        <h2>Loved by operators</h2>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article key={item} className="testimonial-card">
              <span className="testimonial-dot" />
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-minimal">
        <h2>See it in action</h2>
        <a className="inline-link" href="#top">
          Open the trade desk
          <ArrowUpRight size={16} />
        </a>
      </section>
    </main>
  );
}
