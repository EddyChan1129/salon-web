"use client";

import { useState } from "react";
import { shapes, stylists, works } from "../salon";
import { WorkGrid } from "./editorial";

const categories = ["Short Hair", "Medium Hair", "Long Hair", "Bob", "Layered Cut", "Perm", "Hair Colour", "Men's Hairstyle"];

export function PortfolioFilter() {
  const [category, setCategory] = useState("");
  const [shape, setShape] = useState("");
  const [stylist, setStylist] = useState("");
  const filtered = works.filter((work) =>
    (!category || work.length === category || work.tags.includes(category)) &&
    (!shape || work.shapes.includes(shape)) &&
    (!stylist || work.stylist === stylist)
  );

  function reset() {
    setCategory("");
    setShape("");
    setStylist("");
  }

  return (
    <section className="frame portfolio-content" aria-label="Filter hairstyle works">
      <div className="portfolio-filters">
        <label>Style<select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">All styles</option>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select></label>
        <label>Face shape<select value={shape} onChange={(event) => setShape(event.target.value)}>
          <option value="">All shapes</option>
          {shapes.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select></label>
        <label>Stylist<select value={stylist} onChange={(event) => setStylist(event.target.value)}>
          <option value="">All stylists</option>
          {stylists.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select></label>
        {(category || shape || stylist) && <button className="text-link" type="button" onClick={reset}>Clear filters</button>}
      </div>
      <p className="fine-print portfolio-count" role="status">{filtered.length} {filtered.length === 1 ? "look" : "looks"}</p>
      {filtered.length ? <WorkGrid key={`${category}-${shape}-${stylist}`} items={filtered} /> : <p className="empty-state">No looks match these filters. Try a different combination.</p>}
    </section>
  );
}
