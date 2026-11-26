import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFromLink } from "../components/booking-form";
import { PageHeading } from "../components/editorial";

export const metadata: Metadata = { title: "Book an Appointment" };

export default function Booking() {
  return (
    <main id="main" tabIndex={-1} className="booking-page">
      <PageHeading label="Reservations" description="Try the appointment flow with sample prices and availability.">
        Book an <em>appointment.</em>
      </PageHeading>
      <Suspense fallback={<p className="frame fine-print">Loading appointment options…</p>}><BookingFromLink /></Suspense>
    </main>
  );
}
