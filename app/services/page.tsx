import type { Metadata } from "next";
import { PageHeading, ServiceRows } from "../components/editorial";
import { services } from "../salon";

export const metadata: Metadata = { title: "Service Menu" };

export default function Services() {
  return (
    <main id="main" tabIndex={-1}>
      <PageHeading label="Service menu" description="Select a service to preview an appointment and see how your hair length and choice of stylist affect the estimate.">
        Care for <em>your hair.</em>
      </PageHeading>
      <section className="frame service-directory" aria-label="Services and sample prices">
        <ServiceRows items={services} />
        <p className="fine-print">Sample prices in HKD. Timing and pricing vary with the stylist, hair length and service.</p>
      </section>
    </main>
  );
}
