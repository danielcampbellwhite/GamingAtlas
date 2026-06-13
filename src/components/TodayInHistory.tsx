"use client";

import { useEffect, useState } from "react";
import type { TimelineEvent } from "@/lib/types";

/**
 * "Today in Gaming History" — picks events whose date matches the current
 * month/day. Computed on the client so the result reflects the visitor's
 * actual date even though the page is statically generated.
 */
export default function TodayInHistory({
  events,
}: {
  events: TimelineEvent[];
}) {
  const [matches, setMatches] = useState<TimelineEvent[]>([]);
  const [label, setLabel] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    setLabel(
      now.toLocaleDateString("en-US", { month: "long", day: "numeric" }),
    );
    setMatches(
      events.filter((e) => {
        if (!e.date) return false;
        const d = new Date(e.date);
        return d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
      }),
    );
    setReady(true);
  }, [events]);

  return (
    <div className="card-surface p-6">
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-atlas-300">
          📅
        </span>
        <h3 className="font-display text-lg font-semibold text-white">
          Today in Gaming History
          {label ? <span className="text-slate-400"> · {label}</span> : null}
        </h3>
      </div>

      {!ready ? (
        <p className="mt-4 text-sm text-slate-500">Loading…</p>
      ) : matches.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {matches.map((e) => (
            <li key={e.id} className="border-l-2 border-atlas-400/50 pl-4">
              <p className="text-sm font-semibold text-white">
                {e.year} — {e.title}
              </p>
              <p className="mt-1 text-sm text-slate-400">{e.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-slate-400">
          No major recorded events on this exact date — yet. Explore the{" "}
          <a href="/timeline" className="text-atlas-300 hover:text-atlas-200">
            full timeline
          </a>{" "}
          to discover what happened on other days.
        </p>
      )}
    </div>
  );
}
