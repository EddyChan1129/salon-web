import type { Metadata } from "next";
import Link from "next/link";
import { PageHeading, Photo } from "../components/editorial";

export const metadata: Metadata = { title: "Access & Contact" };

export default function Access() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading label="Access & contact">Visit <em>the atelier.</em></PageHeading>
      <div className="frame access-layout">
        <Photo src="/images/atelier.webp" alt="The proposed atelier interior with two styling stations" className="access-photo" />
        <div>
          <h2>Plan your visit</h2>
          <dl className="detail-list">
            <div><dt>Address & map</dt><dd>To be confirmed</dd></div>
            <div><dt>Opening hours</dt><dd>To be confirmed</dd></div>
            <div><dt>Phone, WhatsApp & Instagram</dt><dd>To be confirmed</dd></div>
          </dl>
          <Link className="button button-dark" href="/booking">Preview an appointment</Link>
        </div>
      </div>
    </main>
  );
}
