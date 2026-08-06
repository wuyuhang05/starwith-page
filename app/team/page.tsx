"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function TeamPage() {
  const { copy } = useLocale();
  return (
    <main className="subpage">
      <section className="subpage-hero page-shell">
        <p className="eyebrow">{copy.team.kicker}</p>
        <div className="subpage-title-grid">
          <h1>{copy.team.title}</h1>
          <p>{copy.team.intro}</p>
        </div>
      </section>
      <section className="founders page-shell">
        {copy.team.founders.map((founder) => (
          <article className="founder-card" key={founder.initials}>
            <div className="founder-monogram" aria-hidden="true">{founder.initials}</div>
            <div className="founder-copy">
              <p className="founder-focus">{founder.focus}</p>
              <h2>{founder.name}</h2>
              <p className="founder-role">{founder.role}</p>
              <p>{founder.bio}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="collective page-shell dark-panel">
        <div>
          <p className="eyebrow light">COLLECTIVE / 共同体</p>
          <h2>{copy.team.collectiveTitle}</h2>
          <p>{copy.team.collectiveBody}</p>
        </div>
        <div className="discipline-grid">
          {copy.team.disciplines.map((discipline, index) => (
            <div key={discipline}><span>0{index + 1}</span>{discipline}</div>
          ))}
        </div>
      </section>
    </main>
  );
}
