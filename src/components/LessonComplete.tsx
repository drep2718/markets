"use client";

import { useEffect, useState } from "react";

const KEY = "completed_lessons";

function getCompleted(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function setCompleted(set: Set<string>) {
  localStorage.setItem(KEY, JSON.stringify([...set]));
}

export default function LessonComplete({ lessonKey }: { lessonKey: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDone(getCompleted().has(lessonKey));
  }, [lessonKey]);

  function toggle() {
    const completed = getCompleted();
    if (completed.has(lessonKey)) {
      completed.delete(lessonKey);
    } else {
      completed.add(lessonKey);
    }
    setCompleted(completed);
    setDone(completed.has(lessonKey));
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 px-4 py-2 border text-sm font-medium transition-colors ${
        done
          ? "bg-foreground text-background border-foreground"
          : "border-border text-muted hover:border-foreground hover:text-foreground"
      }`}
    >
      <span className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
        done ? "border-background" : "border-current"
      }`}>
        {done && (
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {done ? "Completed" : "Mark as Complete"}
    </button>
  );
}
