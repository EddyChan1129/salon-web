import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA, PageHeading, Photo } from "../components/editorial";

export const metadata: Metadata = { title: "About the Atelier" };

export default function About() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading label="The atelier">Time to <em>slow down.</em></PageHeading>
      <div className="frame about-image"><Photo src="/images/atelier.webp" alt="Sunlit concept salon with arched mirrors, oak furniture and two styling chairs" sizes="94vw" /></div>
      <section className="frame section-pad about-story">
        <h2 data-reveal="text">Hair that fits<br /><em>your everyday.</em></h2>
        <div>
          <p>We begin by looking at how your hair falls, where it holds weight and what happens when it dries on its own. We talk about how you wear it on a busy morning and how much time you like to spend styling it.</p>
          <p>Those details guide the cut, colour and finish. The aim is a shape you can live with as it grows, with enough room to wear it a little differently each day.</p>
          <Link className="text-link" href="/stylists">Meet the stylists</Link>
        </div>
      </section>
      <ClosingCTA />
    </main>
  );
}
