import type { Metadata } from "next";
import { PageHeading } from "../components/editorial";
import { PortfolioFilter } from "../components/portfolio-filter";

export const metadata: Metadata = { title: "Hairstyle Lookbook" };

export default function Portfolio() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading label="The lookbook" description="Explore cuts, colour and textures, then bring a look you like into your appointment.">
        Selected <em>works.</em>
      </PageHeading>
      <PortfolioFilter />
    </main>
  );
}
