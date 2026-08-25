"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

const standardSteps = [
  { n: "01", title: "Connected membrane", text: "Dystrophin provides normal mechanical support by linking the membrane and actin cytoskeleton." },
  { n: "02", title: "Membrane instability", text: "In DMD, dystrophin loss leaves the sarcolemma vulnerable to disruption and calcium influx." },
  { n: "03", title: "Proposed Elymer support", text: "Bottlebrush-based physical stabilization may reinforce the membrane and limit defect expansion." },
];

const hypothesisSteps = [
  { n: "01", title: "Patch", text: "The polymer may adsorb at a membrane defect, helping patch the lipid bilayer and limit calcium ion flux." },
  { n: "02", title: "Repair", text: "The polymer may support repair of the disrupted lipid bilayer at the damaged site." },
  { n: "03", title: "Healed", text: "Following repair, the polymer may desorb, leaving a healed lipid bilayer." },
];

export default function MoaExplorer({ compact = false, variant = "standard" }: { compact?: boolean; variant?: "standard" | "hypotheses" }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  // Unique per instance so the tab/panel wiring stays valid if two explorers share a page.
  const uid = useId();
  const panelId = `${uid}-panel`;
  const tabId = (index: number) => `${uid}-tab-${index}`;
  const isHypotheses = variant === "hypotheses";
  const steps = isHypotheses ? hypothesisSteps : standardSteps;

  function selectStep(index: number, focus = false) {
    setActive(index);
    if (focus) tabs.current[index]?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % steps.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + steps.length) % steps.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = steps.length - 1;
    else return;
    event.preventDefault();
    selectStep(next, true);
  }

  return (
    <section className={`moa ${compact ? "moa-compact" : ""} ${isHypotheses ? "moa-hypotheses" : ""}`} aria-label="Interactive mechanism of action">
      <div className="moa-stage" data-step={active}>
        <Image
          className="moa-art"
          src={isHypotheses ? "/science/elymer-moa-three-hypotheses.png" : "/science/elymer-moa-original.png"}
          width={isHypotheses ? 960 : 2048}
          height={isHypotheses ? 540 : 1280}
          alt={isHypotheses
            ? "Elymer proposed mechanism of action showing three hypotheses for how the polymer may interact with the lipid bilayer: patch, repair, and heal"
            : "Three-step Elymer proposed mechanism of action showing a connected membrane, DMD membrane instability, and proposed bottlebrush-based membrane support"}
          priority={compact}
          unoptimized
        />
        <div className="moa-panel-focus" aria-hidden="true" />
        <div className="moa-status" id={panelId} role="tabpanel" aria-labelledby={tabId(active)} aria-live="polite"><span>{steps[active].n}</span><strong>{steps[active].title}</strong></div>
      </div>
      <div className="moa-controls" role="tablist" aria-label="Mechanism steps">{steps.map((step, i) => <button ref={(node) => { tabs.current[i] = node; }} key={step.n} id={tabId(i)} className={active === i ? "active" : ""} onClick={() => selectStep(i)} onKeyDown={(event) => handleKeyDown(event, i)} type="button" role="tab" aria-selected={active === i} aria-controls={panelId} tabIndex={active === i ? 0 : -1}><span>{step.n}</span><strong>{step.title}</strong><small>{step.text}</small></button>)}</div>
    </section>
  );
}
