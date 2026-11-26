import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { bookingLink, navigation, priceLabel, salon, shapes, stylists, type Service, type Work } from "../salon";

export function Wordmark() {
  return <Link className="wordmark" href="/" aria-label={`${salon.name} home`}>nagi<span>.</span></Link>;
}

export function Photo({ src, alt, sizes = "(max-width: 720px) 100vw, 50vw", preload = false, className = "" }: {
  src: string;
  alt: string;
  sizes?: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} />
    </div>
  );
}

export function PageHeading({ label, children, description }: {
  label: string;
  children: ReactNode;
  description?: string;
}) {
  return (
    <header className="page-heading frame">
      <p className="eyebrow">{label}</p>
      <h1>{children}</h1>
      {description && <p className="page-description">{description}</p>}
    </header>
  );
}

const faceOutlines: Record<string, string> = {
  oval: "M29 44 C29 25 39 17 50 17 C65 17 73 28 73 45 C73 66 61 83 51 85 C39 84 29 65 29 44Z",
  round: "M25 47 C24 29 36 20 50 20 C66 20 78 31 78 48 C79 68 65 82 51 83 C36 83 24 68 25 47Z",
  square: "M26 42 C26 24 36 18 50 18 C66 18 74 25 75 41 L75 59 Q75 70 67 76 L57 83 Q51 87 45 83 L34 76 Q26 70 26 59Z",
  heart: "M25 41 C24 27 34 18 50 18 C66 18 79 27 77 41 C75 61 65 71 55 83 Q51 87 47 83 C36 72 26 60 25 41Z",
  diamond: "M33 31 C37 21 43 17 51 17 C61 17 67 22 70 32 L76 47 Q78 51 74 57 L60 79 Q51 91 43 80 L28 58 Q24 52 27 47Z",
  long: "M29 41 C29 23 37 13 51 13 C65 13 73 23 73 41 L72 60 Q70 80 56 88 Q51 91 46 88 Q31 80 29 60Z",
};

export function FaceDrawing({ shape }: { shape: string }) {
  return (
    <svg viewBox="0 0 100 102" fill="none" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={faceOutlines[shape]} />
      <path d="M29 42 C37 41 46 33 49 25 C55 33 64 39 72 41 M35 46 Q40 43 45 45 M56 45 Q61 43 66 46 M36 51 Q40 48 45 51 M57 51 Q61 48 65 51 M51 52 L48 61 Q50 63 53 62 M45 69 Q50 66 56 69 Q51 72 45 69" />
    </svg>
  );
}

export function ShapeGrid() {
  return (
    <div className="shape-grid">
      {shapes.map((shape) => (
        <Link key={shape.id} href={`/discover/${shape.id}`} className="shape-tile" data-reveal="shape">
          <FaceDrawing shape={shape.id} />
          <span>{shape.name}</span>
        </Link>
      ))}
    </div>
  );
}

export function WorkGrid({ items }: { items: Work[] }) {
  return (
    <div className="work-grid">
      {items.map((work) => (
        <Link className="work-tile" key={work.id} href={`/portfolio/${work.id}`}>
          <Photo src={work.image} alt="" sizes="(max-width: 600px) 90vw, (max-width: 920px) 45vw, 33vw" />
          <div className="tile-caption">
            <h3>{work.name}</h3>
            <span>{work.tags[0]}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function StylistGrid({ items = stylists }: { items?: typeof stylists }) {
  return (
    <div className="stylist-grid">
      {items.map((stylist) => (
        <Link className="stylist-tile" key={stylist.id} href={`/stylists/${stylist.id}`}>
          <Photo src={stylist.image} alt={`Portrait of ${stylist.name}, a sample stylist`} sizes="(max-width: 640px) 48vw, 35vw" />
          <div className="tile-caption"><h3>{stylist.name}</h3><span>{stylist.role}</span></div>
        </Link>
      ))}
    </div>
  );
}

export function ServiceRows({ items }: { items: Service[] }) {
  return (
    <div className="service-list">
      {items.map((service) => (
        <Link className="service-row" key={service.id} href={bookingLink({ service: service.id })}>
          <div><h3>{service.name}</h3><p>{service.description}</p></div>
          <span className="service-duration">{service.duration} min</span>
          <span className="service-price">From {priceLabel(service.price)}{service.consultation && <small>Consultation required</small>}</span>
        </Link>
      ))}
    </div>
  );
}

export function ClosingCTA() {
  return (
    <section className="closing">
      <div className="frame">
        <p className="eyebrow">Reservations</p>
        <h2 data-reveal="text">Your next chapter<br /><em>begins here.</em></h2>
        <Link className="button button-light" href="/booking">Book an appointment</Link>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="frame">
        <div className="footer-main">
          <div><Wordmark /><p>Japanese-inspired hair atelier</p></div>
          <nav aria-label="Footer">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/booking">Booking</Link>
          </nav>
        </div>
        <div className="footer-bottom"><span>© Nagi Hair Atelier</span><span>Design preview</span></div>
      </div>
    </footer>
  );
}
