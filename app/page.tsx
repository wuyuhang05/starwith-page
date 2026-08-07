"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

export default function Home() {
  const { lang, copy, href } = useLocale();

  return (
    <main>
      <section className="hero page-shell">
        <div className="eyebrow reveal">
          <span>Physical Interaction Model</span>
          <span>Beijing · 2026</span>
        </div>
        <div className="hero-grid">
          <h1 className="display reveal delay-1">
            {lang === "zh" ? (
              <>
                让机器理解
                <br />
                <span className="accent-word">行动中的人</span>
              </>
            ) : (
              <>
                Intelligence that
                <br />
                understands <span className="accent-word">people</span>
                <br />
                in action.
              </>
            )}
          </h1>
          <div className="hero-intro reveal delay-2">
            <p>{copy.home.heroIntro}</p>
            <Link className="text-link" href={href("/research")}>
              {copy.common.exploreResearch} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="tech-specs" aria-label="Physical Interaction Model system characteristics">
          <div><span>INPUT</span><strong>Multimodal</strong></div>
          <div><span>CONTEXT</span><strong>Long-term</strong></div>
          <div><span>MODE</span><strong>Continuous</strong></div>
          <div><span>OUTPUT</span><strong>Physical</strong></div>
        </div>
        <div className="interaction-field" aria-hidden="true">
          <div className="signal-line" />
          <div className="signal-node node-input">
            <span>01 / INPUT</span>
            <strong>HUMAN STATE</strong>
            <small>VISION · LANGUAGE · MOTION</small>
          </div>
          <div className="signal-node node-core">
            <span>02 / MODEL</span>
            <strong>PIM</strong>
            <small>MEMORY · REASONING · PREDICTION</small>
          </div>
          <div className="signal-node node-output">
            <span>03 / OUTPUT</span>
            <strong>PHYSICAL ACTION</strong>
            <small>SAFE · ADAPTIVE · REAL-TIME</small>
          </div>
        </div>
      </section>

      <section className="statement page-shell section-rule">
        <div className="section-index">01 / {copy.common.vision}</div>
        <div className="statement-copy">
          <h2>{copy.home.visionTitle}</h2>
          <div className="two-col-copy">
            <p>{copy.home.visionBody1}</p>
            <p>{copy.home.visionBody2}</p>
          </div>
        </div>
      </section>

      <section className="principles page-shell section-rule">
        <div className="section-index">02 / {copy.common.foundation}</div>
        <div className="principle-list">
          {copy.home.principles.map((item, index) => (
            <article className="principle" key={item.title}>
              <span className="principle-number">0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
              <span className="principle-mark" aria-hidden="true">+</span>
            </article>
          ))}
        </div>
      </section>

      <section className="team-teaser page-shell dark-panel">
        <div className="section-index light">03 / {copy.common.team}</div>
        <div className="team-teaser-grid">
          <h2>{copy.home.teamTitle}</h2>
          <div>
            <p>{copy.home.teamBody}</p>
            <Link className="text-link light-link" href={href("/team")}>
              {copy.common.meetTeam} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="institution-line" aria-label={copy.home.institutionLabel}>
          {copy.home.institutions.map((institution) => (
            <span key={institution}>{institution}</span>
          ))}
        </div>
      </section>

      <section className="closing-call page-shell">
        <p className="eyebrow">{copy.common.join}</p>
        <h2>{copy.home.closingTitle}</h2>
        <Link className="pill-link" href={href("/join")}>
          {copy.common.buildWithUs} <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
