import type { Metadata } from "next";
import { PageHeading, StylistGrid } from "../components/editorial";

export const metadata: Metadata = { title: "Our Stylists" };

export default function Stylists() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading label="Our stylists" description="Explore each stylist’s approach, specialties and selected looks.">
        Meet your <em>stylists.</em>
      </PageHeading>
      <section className="frame stylist-directory" aria-label="Stylist profiles"><StylistGrid /></section>
    </main>
  );
}
