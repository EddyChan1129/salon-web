import type { Metadata } from "next";
import { PageHeading } from "../components/editorial";
import { StudioPreview } from "./studio-preview";

export const metadata: Metadata = {
  title: "Studio Preview",
  robots: { index: false, follow: false },
};

export default function Studio() {
  return (
    <main id="main" tabIndex={-1} className="studio-page">
      <PageHeading label="Staff preview" description="Try the stylist and administrator views. Sample edits last until the page is refreshed.">Studio <em>workspace.</em></PageHeading>
      <StudioPreview />
    </main>
  );
}
