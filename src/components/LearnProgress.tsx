"use client";

import { useEffect, useState } from "react";

const KEY = "completed_lessons";

export default function LessonCheck({ lessonKey }: { lessonKey: string }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const set: string[] = raw ? JSON.parse(raw) : [];
      setDone(set.includes(lessonKey));
    } catch {
      setDone(false);
    }
  }, [lessonKey]);

  if (!done) return <span className="w-4 h-4 border border-border inline-block shrink-0" />;

  return (
    <span className="w-4 h-4 bg-foreground inline-flex items-center justify-center shrink-0">
      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
