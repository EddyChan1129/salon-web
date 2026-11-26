import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo, WorkGrid } from "../../components/editorial";
import { bookingLink, services, shapes, stylists, works } from "../../salon";

export function generateStaticParams() {
  return works.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  return { title: works.find((item) => item.id === slug)?.name ?? "The Lookbook" };
}

export default async function WorkDetail({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const work = works.find((item) => item.id === slug);
  if (!work) notFound();
  const stylist = stylists.find((item) => item.id === work.stylist);
  const service = services.find((item) => item.id === work.service);
  const similar = works.filter((item) => item.id !== work.id && (item.length === work.length || item.service === work.service));

  return (
    <main id="main" tabIndex={-1}>
      <div className="frame detail-top">
        <Link className="text-link" href="/portfolio">All looks</Link>
        <div className="detail-grid">
          <Photo src={work.image} alt={work.description} className="detail-photo" />
          <div>
            <p className="eyebrow">{work.tags.join(" / ")}</p>
            <h1>{work.name}</h1>
            <p className="detail-lead">{work.description}</p>
            <dl className="detail-list">
              <div><dt>Length</dt><dd>{work.length}</dd></div>
              <div><dt>Face shapes</dt><dd className="link-group">{shapes.filter((item) => work.shapes.includes(item.id)).map((item) => <Link key={item.id} href={`/discover/${item.id}`}>{item.name}</Link>)}</dd></div>
              <div><dt>Stylist</dt><dd>{stylist && <Link href={`/stylists/${stylist.id}`}>{stylist.name}</Link>}</dd></div>
              <div><dt>Service</dt><dd>{service?.name}</dd></div>
              <div><dt>Styling at home</dt><dd>{work.maintenance}</dd></div>
            </dl>
            <Link href={bookingLink({ look: work.id, service: work.service, stylist: work.stylist })} className="button button-dark">Book this hairstyle</Link>
          </div>
        </div>
      </div>
      <section className="section-pad lookbook">
        <div className="frame">
          <div className="section-heading"><p className="eyebrow">The lookbook</p><h2>Similar <em>looks.</em></h2></div>
          <WorkGrid items={similar.slice(0, 3)} />
        </div>
      </section>
    </main>
  );
}
