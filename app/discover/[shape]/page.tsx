import Link from "next/link";
import { notFound } from "next/navigation";
import { FaceDrawing, StylistGrid, WorkGrid } from "../../components/editorial";
import { shapes, stylists, works } from "../../salon";

export function generateStaticParams() {
  return shapes.map(({ id }) => ({ shape: id }));
}

export async function generateMetadata({ params }: PageProps<"/discover/[shape]">) {
  const { shape } = await params;
  const guide = shapes.find(({ id }) => id === shape);
  return { title: guide ? `${guide.name} Face Shape` : "Face Shape Guide" };
}

export default async function ShapeGuide({ params }: PageProps<"/discover/[shape]">) {
  const { shape } = await params;
  const guide = shapes.find(({ id }) => id === shape);
  if (!guide) notFound();
  const relatedWorks = works.filter((work) => work.shapes.includes(shape));

  return (
    <main id="main" tabIndex={-1}>
      <div className="frame detail-top">
        <Link className="text-link" href="/discover">All face shapes</Link>
        <div className="detail-grid shape-detail">
          <div className="shape-portrait"><FaceDrawing shape={shape} /></div>
          <div>
            <p className="eyebrow">Face shape guide</p>
            <h1>{guide.name}</h1>
            <p className="detail-lead">{guide.description}</p>
            <dl className="detail-list">
              <div><dt>How to identify it</dt><dd>{guide.identify}</dd></div>
              <div><dt>Styles to try</dt><dd>{guide.styles}</dd></div>
              <div><dt>Length</dt><dd>{guide.lengths}</dd></div>
              <div><dt>Fringe</dt><dd>{guide.fringe}</dd></div>
              <div><dt>What to consider</dt><dd>{guide.tradeoff}</dd></div>
            </dl>
            <Link href="/booking" className="button button-dark">Book an appointment</Link>
          </div>
        </div>
      </div>
      <section className="section-pad lookbook">
        <div className="frame">
          <div className="section-heading"><p className="eyebrow">Lookbook</p><h2>Styles to <em>explore.</em></h2></div>
          <WorkGrid items={relatedWorks} />
        </div>
      </section>
      <section className="section-pad frame people-layout">
        <div className="section-heading"><p className="eyebrow">Our stylists</p><h2>Find your <em>stylist.</em></h2></div>
        <StylistGrid items={stylists.filter((stylist) => relatedWorks.some((work) => work.stylist === stylist.id))} />
      </section>
    </main>
  );
}
