"use client";

import { useCallback, useEffect, useState } from "react";

/** "Random Gaming Fact" widget — surfaces a new historical fact on demand. */
export default function RandomFact({ facts }: { facts: string[] }) {
  const [fact, setFact] = useState<string>("");

  const pick = useCallback(() => {
    if (facts.length === 0) return;
    let next = fact;
    // Avoid repeating the same fact twice in a row when possible.
    for (let i = 0; i < 5 && next === fact; i++) {
      next = facts[Math.floor(Math.random() * facts.length)]!;
    }
    setFact(next);
  }, [facts, fact]);

  useEffect(() => {
    // Pick an initial fact after mount (keeps SSR/static output deterministic).
    setFact(facts[Math.floor(Math.random() * facts.length)] ?? "");
  }, [facts]);

  return (
    <div className="card-surface flex h-full flex-col p-6">
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-magenta-400">
          🎲
        </span>
        <h3 className="font-display text-lg font-semibold text-white">
          Random Gaming Fact
        </h3>
      </div>

      <p
        aria-live="polite"
        className="mt-4 flex-1 text-sm leading-relaxed text-slate-300"
      >
        {fact || "Press the button to reveal a piece of gaming history."}
      </p>

      <button
        type="button"
        onClick={pick}
        className="btn-ghost mt-4 self-start"
      >
        <span aria-hidden>↻</span> New fact
      </button>
    </div>
  );
}
