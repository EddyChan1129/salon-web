"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { priceLabel, services, stylists, works } from "../salon";
import { Photo } from "./editorial";

const steps = [
  ["Service", "Choose a service."],
  ["Stylist", "Choose a stylist."],
  ["Date & time", "Find a time."],
  ["Details", "Your details."],
  ["Review", "Review your appointment."],
  ["Done", "Preview complete."],
];

const lengths = [
  { id: "short", name: "Short", adjustment: 0, minutes: 0 },
  { id: "medium", name: "Medium", adjustment: 80, minutes: 0 },
  { id: "long", name: "Long", adjustment: 150, minutes: 15 },
];

const dateFormatter = new Intl.DateTimeFormat("en-HK", { timeZone: "Asia/Hong_Kong", weekday: "short", day: "numeric", month: "short" });
const sampleTimeSlots = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

function sampleDates() {
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Hong_Kong", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today + "T04:00:00Z");
    date.setUTCDate(date.getUTCDate() + index + 1);
    return { id: date.toISOString(), label: dateFormatter.format(date), weekday: date.getUTCDay() };
  });
}

export function BookingFromLink() {
  const search = useSearchParams();
  const look = works.find((work) => work.id === search.get("look"));
  const requestedService = search.get("service") ?? look?.service;
  const requestedStylist = search.get("stylist") ?? look?.stylist;
  const service = services.find((item) => item.id === requestedService);
  const stylist = stylists.find((item) => item.id === requestedStylist && (!service || item.services.includes(service.id)));
  return <BookingForm key={search.toString()} initialService={service?.id ?? ""} initialStylist={stylist?.id ?? ""} look={look} />;
}

function BookingForm({ initialService, initialStylist, look }: {
  initialService: string;
  initialStylist: string;
  look?: (typeof works)[number];
}) {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState(initialService);
  const [stylistId, setStylistId] = useState(initialStylist);
  const [lengthId, setLengthId] = useState(look ? look.length.split(" ")[0].toLowerCase() : "short");
  const [dates, setDates] = useState<ReturnType<typeof sampleDates>>([]);
  const [dateId, setDateId] = useState("");
  const [time, setTime] = useState("");
  const [details, setDetails] = useState({ name: "", phone: "", email: "", notes: "" });
  const [cancelled, setCancelled] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);

  const service = services.find((item) => item.id === serviceId);
  const stylist = stylists.find((item) => item.id === stylistId);
  const length = lengths.find((item) => item.id === lengthId) ?? lengths[0];
  const duration = service ? service.duration + length.minutes : 0;
  const price = service ? service.price + length.adjustment + (stylist?.adjustment ?? 0) : 0;
  const date = dates.find((item) => item.id === dateId);
  const availableStylists = stylists.filter((item) => !service || item.services.includes(service.id));

  useEffect(() => {
    if (previousStep.current === step) return;
    previousStep.current = step;
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "nearest" });
  }, [step]);

  function updateService(selected: string) {
    if (selected === serviceId) return;
    setServiceId(selected);
    if (!stylist?.services.includes(selected)) setStylistId("");
    setDateId("");
    setTime("");
  }

  function scheduleIsOpen(weekday: number) {
    return weekday !== 1 && !(stylistId === "aki" && weekday === 0) && !(stylistId === "ren" && weekday === 2);
  }

  function timeIsOpen(slot: string, index: number) {
    const [hour, minute] = slot.split(":").map(Number);
    return hour * 60 + minute + duration <= 19 * 60 && (index + (date?.weekday ?? 0)) % 4 !== 2;
  }

  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0 && !service) return;
    if (step === 2 && (!date || !time || !scheduleIsOpen(date.weekday) || !timeIsOpen(time, sampleTimeSlots.indexOf(time)))) return;
    if (step === 1 && !dates.length) setDates(sampleDates());
    setStep(step + 1);
  }

  const summary = [
    ["Service", service?.name],
    ["Stylist", stylist?.name ?? "Any available stylist"],
    ["Hair length", length.name],
    ["Date & time", date && time ? `${date.label}, ${time} HKT` : undefined],
    ["Duration", duration ? `${duration} min` : undefined],
    ["Estimate", service ? `${service.consultation ? "From " : ""}${priceLabel(price)}` : undefined],
  ];

  return (
    <div className="frame booking-layout">
      <div className="booking-main">
        <ol className="booking-progress" aria-label="Booking progress">
          {steps.map(([label], index) => (
            <li key={label} aria-current={index === step ? "step" : undefined} data-done={index < step}>{label}</li>
          ))}
        </ol>
        <p className="eyebrow">Step {step + 1} of {steps.length}</p>
        <h2 ref={heading} tabIndex={-1}>{cancelled ? "Preview cancelled." : steps[step][1]}</h2>

        {step < 5 ? (
          <form onSubmit={advance}>
            {step === 0 && (
              <>
                <fieldset className="booking-options">
                  <legend className="sr-only">Service</legend>
                  {services.map((item) => (
                    <label className="choice service-choice" key={item.id}>
                      <input type="radio" name="service" checked={serviceId === item.id} onChange={() => updateService(item.id)} required />
                      <span>{item.name}<small>{item.duration} min{item.consultation && " · Consultation required"}</small></span>
                      <span className="choice-meta">From {priceLabel(item.price)}</span>
                    </label>
                  ))}
                </fieldset>
                <label className="booking-length">Hair length
                  <select value={lengthId} onChange={(event) => { setLengthId(event.target.value); setTime(""); }}>
                    {lengths.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                  </select>
                </label>
              </>
            )}

            {step === 1 && (
              <fieldset className="booking-options">
                <legend className="sr-only">Stylist</legend>
                <label className="choice">
                  <input type="radio" name="stylist" checked={stylistId === ""} onChange={() => { setStylistId(""); setDateId(""); setTime(""); }} />
                  <span>Any available stylist</span>
                </label>
                {availableStylists.map((item) => (
                  <label className="choice" key={item.id}>
                    <input type="radio" name="stylist" checked={stylistId === item.id} onChange={() => { setStylistId(item.id); setDateId(""); setTime(""); }} />
                    <span>{item.name}<small>{item.role}</small></span>
                    {item.adjustment > 0 && <span className="choice-meta">+{priceLabel(item.adjustment)}</span>}
                  </label>
                ))}
              </fieldset>
            )}

            {step === 2 && (
              <>
                <p className="fine-print">Sample availability · Hong Kong time</p>
                <fieldset className="slot-group">
                  <legend>Available dates</legend>
                  <div className="slot-grid">
                    {dates.map((item) => (
                      <button key={item.id} type="button" className="slot" aria-pressed={dateId === item.id} disabled={!scheduleIsOpen(item.weekday)} onClick={() => { setDateId(item.id); setTime(""); }}>{item.label}</button>
                    ))}
                  </div>
                </fieldset>
                {date && (
                  <fieldset className="slot-group">
                    <legend>Available times</legend>
                    <div className="slot-grid">
                      {sampleTimeSlots.map((slot, index) => (
                        <button key={slot} type="button" className="slot" aria-pressed={time === slot} disabled={!timeIsOpen(slot, index)} onClick={() => setTime(slot)}>{slot}</button>
                      ))}
                    </div>
                  </fieldset>
                )}
              </>
            )}

            {step === 3 && (
              <div className="booking-fields">
                <p className="fine-print">Use sample details to try this step.</p>
                <label>Full name<input autoComplete="name" value={details.name} onChange={(event) => setDetails({ ...details, name: event.target.value })} required /></label>
                <label>Phone<input type="tel" autoComplete="tel" value={details.phone} onChange={(event) => setDetails({ ...details, phone: event.target.value })} required /></label>
                <label>Email<input type="email" autoComplete="email" value={details.email} onChange={(event) => setDetails({ ...details, email: event.target.value })} required /></label>
                <label>Notes (optional)<textarea rows={3} value={details.notes} onChange={(event) => setDetails({ ...details, notes: event.target.value })} /></label>
              </div>
            )}

            {step === 4 && (
              <>
                <dl className="detail-list booking-review">
                  {summary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
                  <div><dt>Contact</dt><dd>{details.name}<br />{details.phone}<br />{details.email}</dd></div>
                  {details.notes && <div><dt>Notes</dt><dd>{details.notes}</dd></div>}
                </dl>
                {service?.consultation && <p className="fine-print">The final price would be confirmed during a consultation.</p>}
              </>
            )}

            <div className="form-actions booking-actions">
              {step > 0 && <button type="button" className="text-link" onClick={() => setStep(step - 1)}>Back</button>}
              <button className="button button-dark" type="submit" disabled={(step === 0 && !service) || (step === 2 && !time)}>{step === 4 ? "Confirm preview" : "Continue"}</button>
            </div>
          </form>
        ) : (
          <div className="booking-complete">
            {cancelled ? (
              <p>The sample appointment has been removed from this preview.</p>
            ) : (
              <>
                <p>Your sample appointment is set for <strong>{date?.label} at {time} HKT</strong>.</p>
                <p>Preview only. No reservation or email is sent.</p>
                <div className="form-actions">
                  <button type="button" className="button button-outline" onClick={() => { setDateId(""); setTime(""); setStep(2); }}>Reschedule preview</button>
                  <button type="button" className="text-link" onClick={() => { setCancelled(true); heading.current?.focus(); }}>Cancel preview</button>
                </div>
              </>
            )}
            <Link className="text-link" href="/">Return home</Link>
          </div>
        )}
      </div>

      <aside className="booking-aside" aria-label="Appointment summary">
        {look && (
          <div className="booking-look">
            <Photo src={look.image} alt={look.name} sizes="110px" />
            <div><p className="eyebrow">Your inspiration</p><Link href={`/portfolio/${look.id}`}>{look.name}</Link></div>
          </div>
        )}
        <p className="eyebrow">Your appointment</p>
        {cancelled ? <p className="fine-print">Cancelled</p> : (
          <dl>
            {summary.filter(([, value]) => value).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        )}
      </aside>
    </div>
  );
}
