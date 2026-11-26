import Link from "next/link";
import { notFound } from "next/navigation";
import { Photo, WorkGrid } from "../../components/editorial";
import { bookingLink, services, stylists, works } from "../../salon";

export function generateStaticParams() {
  return stylists.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: PageProps<"/stylists/[slug]">) {
  const { slug } = await params;
  return { title: stylists.find((stylist) => stylist.id === slug)?.name ?? "Our Stylists" };
}

export default async function StylistProfile({ params }: PageProps<"/stylists/[slug]">) {
  const { slug } = await params;
  const stylist = stylists.find((item) => item.id === slug);
  if (!stylist) notFound();

  return (
    <main id="main" tabIndex={-1}>
      <div className="frame detail-top">
        <Link className="text-link" href="/stylists">All stylists</Link>
        <div className="detail-grid">
          <Photo src={stylist.image} alt={`Portrait of ${stylist.name}, a sample stylist`} className="detail-photo stylist-detail-photo" />
          <div>
            <p className="eyebrow">Sample stylist</p>
            <h1>{stylist.name}</h1>
            <p className="detail-lead">{stylist.bio}</p>
            <blockquote>“{stylist.philosophy}”</blockquote>
            <dl className="detail-list">
              <div><dt>Specialties</dt><dd>{stylist.role}</dd></div>
              <div><dt>Languages</dt><dd>{stylist.languages}</dd></div>
              <div><dt>Services</dt><dd className="link-group">{services.filter((item) => stylist.services.includes(item.id)).map((item) => <Link key={item.id} href={bookingLink({ service: item.id, stylist: stylist.id })}>{item.name}</Link>)}</dd></div>
            </dl>
            <Link href={bookingLink({ stylist: stylist.id })} className="button button-dark">Book this stylist</Link>
          </div>
        </div>
      </div>
      <section className="section-pad lookbook">
        <div className="frame">
          <div className="section-heading"><p className="eyebrow">The lookbook</p><h2>By <em>{stylist.name}.</em></h2></div>
          <WorkGrid items={works.filter((work) => work.stylist === stylist.id)} />
        </div>
      </section>
    </main>
  );
}
