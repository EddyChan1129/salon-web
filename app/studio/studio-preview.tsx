"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { Photo } from "../components/editorial";
import { priceLabel, services, shapes, stylists, works } from "../salon";

type Look = (typeof works)[number] & { published: boolean; beforeImage?: string; afterImage?: string };
type View = "Appointments" | "Portfolio" | "Profiles" | "Hours" | "Settings";
const sampleAppointments = [
  { id: "first", time: "Friday · 11:30", client: "Sample guest 1", service: "Haircut", stylist: "aki", status: "Confirmed" },
  { id: "second", time: "Saturday · 14:30", client: "Sample guest 2", service: "Perm", stylist: "ren", status: "Confirmed" },
  { id: "third", time: "Sunday · 10:00", client: "Sample guest 3", service: "Hair Colour", stylist: "aki", status: "Pending" },
];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const views: View[] = ["Appointments", "Portfolio", "Profiles", "Hours", "Settings"];

export function StudioPreview() {
  const [role, setRole] = useState("admin");
  const [view, setView] = useState<View>("Appointments");
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [looks, setLooks] = useState<Look[]>(works.map((work) => ({ ...work, published: true })));
  const [editing, setEditing] = useState<Look>();
  const [profiles, setProfiles] = useState(stylists);
  const [selectedProfile, setSelectedProfile] = useState("aki");
  const [hours, setHours] = useState<Record<string, Record<string, string>>>({});
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");

  const isAdmin = role === "admin";
  const visibleAppointments = appointments.filter((item) => isAdmin || item.stylist === role);
  const visibleLooks = looks.filter((item) => isAdmin || item.stylist === role);
  const profile = profiles.find((item) => item.id === (isAdmin ? selectedProfile : role)) ?? profiles[0];

  function startLook() {
    setEditing({
      id: crypto.randomUUID(), name: "", image: "", length: "Medium Hair", tags: [], shapes: [],
      stylist: isAdmin ? profiles[0].id : role, service: "cut",
      description: "", maintenance: "", published: false,
    });
  }

  function previewImage(field: "image" | "beforeImage" | "afterImage", file: File | undefined) {
    if (!file || !editing) return;
    const lookId = editing.id;
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      if (typeof imageUrl !== "string") return;
      setEditing((look) => look?.id === lookId ? { ...look, [field]: imageUrl } : look);
    };
    reader.readAsDataURL(file);
  }

  function saveLook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing || !editing.name.trim()) return;
    const exists = looks.some((look) => look.id === editing.id);
    setLooks(exists ? looks.map((look) => look.id === editing.id ? editing : look) : [...looks, editing]);
    setEditing(undefined);
    setNotice("Look saved for this preview.");
  }

  return (
    <div className="frame studio">
      <div className="studio-toolbar">
        <label>Preview as
          <select value={role} onChange={(event) => {
            setRole(event.target.value);
            setEditing(undefined);
            setNotice("");
            if (view === "Settings") setView("Appointments");
          }}>
            <option value="admin">Administrator</option>
            {profiles.map((item) => <option key={item.id} value={item.id}>{item.name} · Stylist</option>)}
          </select>
        </label>
        <nav aria-label="Studio workspace views">
          {views.filter((item) => isAdmin || item !== "Settings").map((item) => (
            <button type="button" key={item} aria-pressed={item === view} onClick={() => {
              setView(item); setEditing(undefined); setNotice("");
            }}>{item}</button>
          ))}
        </nav>
      </div>
      <p className="fine-print studio-notice" role="status">{notice}</p>
      <div className="studio-heading">
        <h2>{view}</h2>
        {view === "Portfolio" && !editing && <button className="button button-dark" type="button" onClick={startLook}>Add a look</button>}
      </div>

      {view === "Appointments" && (
        <>
          <p className="fine-print studio-count">{visibleAppointments.filter((item) => item.status === "Confirmed").length} confirmed · {visibleAppointments.filter((item) => item.status === "Pending").length} pending</p>
          <div className="studio-table" role="region" aria-label="Sample appointments" tabIndex={0}>
            <table>
              <thead><tr><th scope="col">Time</th><th scope="col">Guest</th><th scope="col">Service</th><th scope="col">Stylist</th><th scope="col">Status</th></tr></thead>
              <tbody>{visibleAppointments.map((item) => (
                <tr key={item.id}>
                  <td>{item.time}</td><td>{item.client}</td><td>{item.service}</td><td>{profiles.find((stylist) => stylist.id === item.stylist)?.name}</td>
                  <td><select aria-label={`Status for ${item.client}`} value={item.status} onChange={(event) => {
                    setAppointments(appointments.map((appointment) => appointment.id === item.id ? { ...appointment, status: event.target.value } : appointment));
                    setNotice("Status updated for this preview.");
                  }}><option>Pending</option><option>Confirmed</option><option>Cancelled</option></select></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </>
      )}

      {view === "Portfolio" && (editing ? (
        <form className="booking-fields studio-form" onSubmit={saveLook}>
          <h3>{editing.name || "New look"}</h3>
          <label>Title<input required value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} /></label>
          <label>Description<textarea rows={3} value={editing.description} onChange={(event) => setEditing({ ...editing, description: event.target.value })} /></label>
          <div className="studio-form-row">
            {isAdmin && <label>Stylist<select value={editing.stylist} onChange={(event) => setEditing({ ...editing, stylist: event.target.value })}>
              {profiles.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select></label>}
            <label>Service<select value={editing.service} onChange={(event) => setEditing({ ...editing, service: event.target.value })}>
              {services.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
            </select></label>
            <label>Length<select value={editing.length} onChange={(event) => setEditing({ ...editing, length: event.target.value })}><option>Short Hair</option><option>Medium Hair</option><option>Long Hair</option></select></label>
            <label>Categories<input defaultValue={editing.tags.join(", ")} placeholder="Bob, Perm" onChange={(event) => setEditing({ ...editing, tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean) })} /></label>
          </div>
          <fieldset className="studio-checks">
            <legend>Face shapes</legend>
            {shapes.map((item) => <label key={item.id}><input type="checkbox" checked={editing.shapes.includes(item.id)} onChange={(event) => setEditing({ ...editing, shapes: event.target.checked ? [...editing.shapes, item.id] : editing.shapes.filter((shape) => shape !== item.id) })} />{item.name}</label>)}
          </fieldset>
          <fieldset className="studio-settings studio-media">
            <legend>Photography</legend>
            <label>Cover photo<input type="file" accept="image/*" onChange={(event) => previewImage("image", event.target.files?.[0])} />
              {editing.image && <Photo src={editing.image} alt="Cover preview" sizes="160px" />}
            </label>
            <label>Before photo<input type="file" accept="image/*" onChange={(event) => previewImage("beforeImage", event.target.files?.[0])} />
              {editing.beforeImage && <Photo src={editing.beforeImage} alt="Before preview" sizes="160px" />}
            </label>
            <label>After photo<input type="file" accept="image/*" onChange={(event) => previewImage("afterImage", event.target.files?.[0])} />
              {editing.afterImage && <Photo src={editing.afterImage} alt="After preview" sizes="160px" />}
            </label>
          </fieldset>
          <label className="studio-publish"><input type="checkbox" checked={editing.published} onChange={(event) => setEditing({ ...editing, published: event.target.checked })} /> Published</label>
          <div className="form-actions">
            <button type="submit" className="button button-dark">Save look</button>
            <button type="button" className="text-link" onClick={() => setEditing(undefined)}>Cancel</button>
            {looks.some((look) => look.id === editing.id) && <button type="button" className="text-link" onClick={() => {
              setLooks(looks.filter((look) => look.id !== editing.id));
              setEditing(undefined);
              setNotice("Look removed from this preview.");
            }}>Remove look</button>}
          </div>
        </form>
      ) : (
        <div className="studio-looks">
          {visibleLooks.map((look) => <div className="studio-look" key={look.id}>
            {look.image && <Image src={look.image} alt="" width={64} height={64} className="studio-thumb" />}
            <div><h3>{look.name}</h3><p className="fine-print">{look.published ? "Published" : "Draft"}</p></div>
            <button className="text-link" type="button" onClick={() => { setEditing(look); setNotice(""); }}>Edit <span className="sr-only">{look.name}</span></button>
          </div>)}
          {!visibleLooks.length && <p className="fine-print">Add a look to start this portfolio.</p>}
        </div>
      ))}

      {(view === "Profiles" || view === "Hours") && (
        <>
          {isAdmin && <label className="studio-selector">Stylist<select value={selectedProfile} onChange={(event) => { setSelectedProfile(event.target.value); setNotice(""); }}>
            {profiles.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select></label>}
          {view === "Profiles" ? (
            <form key={profile.id} className="booking-fields studio-form" onSubmit={(event) => {
              event.preventDefault();
              const values = new FormData(event.currentTarget);
              setProfiles(profiles.map((item) => item.id === profile.id ? { ...item, name: String(values.get("name")).trim(), role: String(values.get("specialty")), bio: String(values.get("bio")), languages: String(values.get("languages")) } : item));
              setNotice("Profile saved for this preview.");
            }}>
              <label>Name<input name="name" defaultValue={profile.name} required /></label>
              <label>Specialties<input name="specialty" defaultValue={profile.role} /></label>
              <label>Biography<textarea name="bio" rows={4} defaultValue={profile.bio} /></label>
              <label>Languages<input name="languages" defaultValue={profile.languages} /></label>
              <div className="form-actions"><button className="button button-dark" type="submit">Save profile</button></div>
            </form>
          ) : (
            <form key={profile.id} className="booking-fields studio-form" onSubmit={(event) => {
              event.preventDefault();
              const values = new FormData(event.currentTarget);
              setHours({ ...hours, [profile.id]: Object.fromEntries(weekdays.map((day) => [day, String(values.get(day))])) });
              setNotice("Hours saved for this preview.");
            }}>
              {weekdays.map((day, index) => <label className="studio-hours" key={day}>{day}<input name={day} defaultValue={hours[profile.id]?.[day] ?? (index === 0 ? "Closed" : "10:00–19:00")} /></label>)}
              <div className="form-actions"><button className="button button-dark" type="submit">Save hours</button></div>
            </form>
          )}
        </>
      )}

      {view === "Settings" && isAdmin && (
        <form className="booking-fields studio-form" onSubmit={(event) => {
          event.preventDefault();
          setSettings(Object.fromEntries(Array.from(new FormData(event.currentTarget), ([key, value]) => [key, String(value)])));
          setNotice("Settings saved for this preview.");
        }}>
          <label>Homepage headline<input name="headline" defaultValue={settings.headline ?? "Hair, in harmony with you."} /></label>
          <label>Salon hours<input name="salonHours" defaultValue={settings.salonHours ?? "Opening hours to be confirmed"} /></label>
          <fieldset className="studio-settings">
            <legend>Starting service prices (HKD)</legend>
            {services.map((item) => <label key={item.id}>{item.name}<input type="number" name={item.id} min="0" defaultValue={settings[item.id] ?? item.price} aria-describedby="studio-price-example" /></label>)}
            <p className="fine-print" id="studio-price-example">Current haircut example · {priceLabel(Number(settings.cut ?? 580))}</p>
          </fieldset>
          <fieldset className="studio-settings">
            <legend>Face shape recommendations</legend>
            {shapes.map((item) => <label key={item.id}>{item.name}<textarea rows={2} name={item.id} defaultValue={settings[item.id] ?? item.styles} /></label>)}
          </fieldset>
          <div className="form-actions"><button className="button button-dark" type="submit">Save settings</button></div>
        </form>
      )}
    </div>
  );
}
