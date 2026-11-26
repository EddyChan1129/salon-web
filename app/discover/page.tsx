import type { Metadata } from "next";
import { PageHeading, ShapeGrid } from "../components/editorial";
import { ShapeQuiz } from "../components/shape-quiz";

export const metadata: Metadata = { title: "Discover Yourself" };

export default function Discover() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading label="Discover yourself" description="Start with the outline you see in the mirror. Explore how different cuts, lengths and fringes frame your features.">
        Beauty begins with<br /><em>knowing yourself.</em>
      </PageHeading>
      <section className="frame shape-directory" aria-label="Face shape guides">
        <ShapeGrid />
      </section>
      <ShapeQuiz />
    </main>
  );
}
