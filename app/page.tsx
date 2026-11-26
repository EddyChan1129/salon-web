import Link from "next/link";
import { ClosingCTA, Photo, ServiceRows, ShapeGrid, StylistGrid, WorkGrid } from "./components/editorial";
import { services, works } from "./salon";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="hero frame" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow" data-hero-enter><span />Japanese hair atelier</p>
          <h1 id="hero-title" data-hero-enter>Hair, in<br /> harmony<br /><em>with you.</em></h1>
          <p className="hero-description" data-hero-enter>Discover a hairstyle that reflects who you are.</p>
          <div className="hero-actions" data-hero-enter>
            <Link className="button button-dark" href="/booking">Book an appointment</Link>
            <Link className="text-link" href="#discover">Discover your style</Link>
          </div>
        </div>
        <figure className="hero-photo" data-hero-image>
          <Photo src="/images/hero.webp" alt="Long dark layers moving softly around the face in afternoon light" sizes="(max-width: 720px) 100vw, 61vw" preload />
          <figcaption><Link href="/portfolio/soft-layers">From the lookbook <span>Soft Layers</span></Link></figcaption>
        </figure>
      </section>

      <section className="discover section-pad" id="discover">
        <div className="frame">
          <div className="section-heading discover-heading">
            <p className="eyebrow">Discover yourself</p>
            <h2 data-reveal="text">Beauty begins with<br /><em>knowing yourself.</em></h2>
            <p data-reveal="copy">Find cuts, lengths and fringes to try based on your face shape and how you like to wear your hair.</p>
          </div>
          <ShapeGrid />
          <Link className="text-link" href="/discover#quiz">Find your face shape</Link>
        </div>
      </section>

      <section className="lookbook section-pad">
        <div className="frame">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">The lookbook</p><h2 data-reveal="text">Selected <em>works.</em></h2></div>
            <Link className="text-link" href="/portfolio">Explore the lookbook</Link>
          </div>
          <WorkGrid items={works.slice(0, 3)} />
        </div>
      </section>

      <section className="people section-pad">
        <div className="frame people-layout">
          <div className="section-heading">
            <p className="eyebrow">Our stylists</p>
            <h2 data-reveal="text">Meet your<br /><em>stylists.</em></h2>
            <p>Explore each stylist’s approach to cut, colour and texture.</p>
            <Link className="text-link" href="/stylists">Meet the team</Link>
          </div>
          <StylistGrid />
        </div>
      </section>

      <section className="menu-section section-pad">
        <div className="frame">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">Service menu</p><h2 data-reveal="text">Care for <em>your hair.</em></h2></div>
            <Link className="text-link" href="/services">View all services</Link>
          </div>
          <ServiceRows items={services.filter((service) => ["cut", "colour", "perm", "hair-treatment"].includes(service.id))} />
          <p className="fine-print">Sample prices in HKD.</p>
        </div>
      </section>

      <section className="atelier-section section-pad">
        <div className="frame atelier-layout">
          <div className="atelier-photo" data-reveal="image"><Photo src="/images/atelier.webp" alt="Sunlight across oak counters and arched mirrors in the salon concept" className="atelier-image" /></div>
          <div className="section-heading">
            <p className="eyebrow">The atelier</p>
            <h2 data-reveal="text">Time to<br /><em>slow down.</em></h2>
            <p>We start with a conversation about how you wear your hair, then consider its natural fall and the time you like to spend styling it.</p>
            <Link className="text-link" href="/about">Inside the atelier</Link>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </main>
  );
}
