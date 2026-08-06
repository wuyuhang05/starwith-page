"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function JoinPage() {
  const { copy } = useLocale();
  return (
    <main className="subpage join-page">
      <section className="subpage-hero page-shell">
        <p className="eyebrow">{copy.join.kicker}</p>
        <div className="subpage-title-grid">
          <h1>{copy.join.title}</h1>
          <p>{copy.join.intro}</p>
        </div>
      </section>
      <section className="join-paths page-shell">
        {copy.join.paths.map((path, index) => (
          <article key={path.title}>
            <span>0{index + 1}</span>
            <h2>{path.title}</h2>
            <p>{path.body}</p>
          </article>
        ))}
      </section>
      <section className="join-status page-shell">
        <div className="status-dot" aria-hidden="true" />
        <p>{copy.join.status}</p>
      </section>
      <section className="join-quote page-shell dark-panel">
        <blockquote>“{copy.join.quote}”</blockquote>
        <p>LET&apos;S BUILD THE NEXT RESIDENT.</p>
      </section>
    </main>
  );
}
