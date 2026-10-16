"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { programs, type Program, type ProgramCategory } from "../../data/programs";
import Link from "./SafeLink";

const filters: ("All programs" | ProgramCategory)[] = ["All programs", "Marketing & AI", "Communication", "Personal growth"];
function ProgramCard({ program }: { program: Program }) {
  return <article className="cohort-card">
    <div className="cohort-card-visual">
      <Image src={program.image} alt={`${program.title} illustration`} fill sizes="(max-width: 620px) 100vw, 50vw" />
      <span>Live cohort</span>
    </div>
    <div className="cohort-card-body"><small>{program.category}</small><h3>{program.title}</h3><p>{program.description}</p>
      <div><span>Learn live, together</span><Link href={`/programs/${program.slug}`}>Explore program <ArrowUpRight size={18} /></Link></div>
    </div>
  </article>;
}

export default function ProgramDirectory({ showIntro = true }: { showIntro?: boolean }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All programs");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => programs.filter((program) => (filter === "All programs" || program.category === filter) && `${program.title} ${program.description} ${program.category}`.toLowerCase().includes(query.toLowerCase().trim())), [filter, query]);
  return <div className="program-directory">
    {showIntro && <div className="program-directory-heading"><div><span className="program-kicker">Learn together. Move forward.</span><h2>A skill for your next chapter.</h2><p>Choose what you want to get better at. Our paid programs are live cohorts, so you learn with people—not on your own.</p></div><strong>100% live cohort programs <ArrowUpRight size={20} /></strong></div>}
    <div className="program-tools"><div className="program-filters" aria-label="Filter programs">{filters.map((item) => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div><label><span className="sr-only">Search programs</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a skill…" /></label></div>
    {visible.length ? <div className="cohort-grid">{visible.map((program) => <ProgramCard program={program} key={program.slug} />)}</div> : <p className="program-empty">No programs match that search yet.</p>}
    <p className="program-note">Cohort dates, duration and fees will be added when each program opens.</p>
  </div>;
}
