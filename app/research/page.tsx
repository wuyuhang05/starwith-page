"use client";

import { useLocale } from "@/components/LocaleProvider";

export default function ResearchPage() {
  const { copy } = useLocale();
  return (
    <main className="subpage">
      <section className="subpage-hero page-shell">
        <p className="eyebrow">{copy.research.kicker}</p>
        <div className="subpage-title-grid">
          <h1>{copy.research.title}</h1>
          <p>{copy.research.intro}</p>
        </div>
      </section>
      <section className="thesis page-shell dark-panel">
        <span className="thesis-code">PIM</span>
        <div>
          <p className="eyebrow light">CORE MODEL / 核心模型</p>
          <h2>{copy.research.thesisTitle}</h2>
          <p>{copy.research.thesisBody}</p>
        </div>
      </section>
      <section className="pillar-section page-shell">
        {copy.research.pillars.map((pillar) => (
          <article className="research-pillar" key={pillar.code}>
            <p className="pillar-code">{pillar.code}</p>
            <h2>{pillar.title}</h2>
            <p>{pillar.body}</p>
            <div className="tag-row">{pillar.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </section>
      <section className="loop-section page-shell">
        <p className="eyebrow">{copy.research.loopLabel}</p>
        <div className="loop-row">
          {copy.research.loop.map((step, index) => (
            <div className="loop-step" key={step}>
              <span>0{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
