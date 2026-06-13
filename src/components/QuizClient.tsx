"use client";

import { useCallback, useState } from "react";

export interface QuizItem {
  prompt: string;
  year: number;
  category: string;
}

interface Question {
  prompt: string;
  category: string;
  answer: number;
  options: number[];
}

const QUESTION_COUNT = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

/** Build a multiple-choice question with 3 plausible distractor years. */
function buildQuestion(item: QuizItem): Question {
  const options = new Set<number>([item.year]);
  const spread = [1, 2, 3, 4, 5, 6, 7, 8];
  while (options.size < 4) {
    const delta = spread[Math.floor(Math.random() * spread.length)]!;
    const sign = Math.random() < 0.5 ? -1 : 1;
    const candidate = item.year + sign * delta;
    if (candidate > 1955 && candidate <= new Date().getFullYear()) {
      options.add(candidate);
    }
  }
  return {
    prompt: item.prompt,
    category: item.category,
    answer: item.year,
    options: shuffle([...options]),
  };
}

export default function QuizClient({ items }: { items: QuizItem[] }) {
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const start = useCallback(() => {
    const picked = shuffle(items).slice(0, QUESTION_COUNT).map(buildQuestion);
    setQuestions(picked);
    setCurrent(0);
    setScore(0);
    setSelected(null);
  }, [items]);

  // Start screen
  if (!questions) {
    return (
      <div className="card-surface mx-auto max-w-2xl p-8 text-center">
        <p className="text-5xl" aria-hidden>
          🎯
        </p>
        <h2 className="mt-4 font-display text-2xl font-bold text-white">
          Guess the Year
        </h2>
        <p className="mt-3 text-slate-400">
          {QUESTION_COUNT} questions. We&rsquo;ll name a game, console, or event
          from gaming history — you pick the year it happened. How well do you
          know your history?
        </p>
        <button type="button" onClick={start} className="btn-primary mt-6">
          Start quiz
        </button>
      </div>
    );
  }

  // Results screen
  if (current >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    const verdict =
      pct >= 90
        ? "Gaming historian! 🏆"
        : pct >= 70
          ? "Seriously knowledgeable. 🎮"
          : pct >= 50
            ? "Not bad — keep exploring. 👾"
            : "Time to brush up on your history! 📚";
    return (
      <div className="card-surface mx-auto max-w-2xl p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-white">Quiz complete</h2>
        <p className="mt-6 font-display text-6xl font-bold gradient-text">
          {score}/{questions.length}
        </p>
        <p className="mt-2 text-lg text-slate-300">{verdict}</p>
        <button type="button" onClick={start} className="btn-primary mt-6">
          Play again
        </button>
      </div>
    );
  }

  const q = questions[current]!;
  const answered = selected !== null;
  const isLast = current === questions.length - 1;

  function choose(option: number) {
    if (answered) return;
    setSelected(option);
    if (option === q.answer) setScore((s) => s + 1);
  }

  function next() {
    setSelected(null);
    setCurrent((c) => c + 1);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between text-sm text-slate-400">
        <span>
          Question {current + 1} of {questions.length}
        </span>
        <span>
          Score: <span className="font-semibold text-white">{score}</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-atlas-400 to-magenta-500 transition-all"
          style={{ width: `${(current / questions.length) * 100}%` }}
        />
      </div>

      <div className="card-surface p-8 text-center">
        <span className="chip">{q.category}</span>
        <h2 className="mt-4 font-display text-xl font-semibold text-white sm:text-2xl">
          In what year did this happen?
        </h2>
        <p className="mt-2 text-lg text-atlas-200">{q.prompt}</p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {q.options.map((option) => {
            const isCorrect = option === q.answer;
            const isPicked = option === selected;
            let style =
              "border-white/10 bg-white/5 text-slate-200 hover:border-atlas-400/50 hover:text-white";
            if (answered && isCorrect)
              style = "border-emerald-400/50 bg-emerald-500/20 text-emerald-200";
            else if (answered && isPicked)
              style = "border-red-400/50 bg-red-500/20 text-red-200";
            else if (answered) style = "border-white/10 bg-white/5 text-slate-500";
            return (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                disabled={answered}
                className={`rounded-xl border px-4 py-4 font-display text-xl font-bold transition ${style}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="mt-6">
            <p className="text-sm text-slate-300">
              {selected === q.answer ? (
                <span className="text-emerald-300">Correct! 🎉</span>
              ) : (
                <span className="text-red-300">
                  The answer was <strong>{q.answer}</strong>.
                </span>
              )}
            </p>
            <button type="button" onClick={next} className="btn-primary mt-4">
              {isLast ? "See results" : "Next question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
