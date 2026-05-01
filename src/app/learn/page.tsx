import Link from "next/link";
import { modules, getTotalTime, getModuleTime } from "@/lib/lessons";
import LessonCheck from "@/components/LearnProgress";

export default function LearnPage() {
  const totalMinutes = getTotalTime();
  const totalHours = Math.round(totalMinutes / 60);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold mb-3">
          Energy Markets: A Complete Guide
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          A structured curriculum covering everything from the basics of how
          energy markets work to advanced trading strategies and the energy
          transition. {modules.length} modules, {modules.reduce((t, m) => t + m.lessons.length, 0)}{" "}
          lessons, approximately {totalHours} hours of content.
        </p>
      </div>

      <div className="space-y-8">
        {modules.map((mod, index) => {
          const moduleMinutes = getModuleTime(mod);
          return (
            <div key={mod.id} className="border-b border-border pb-8 last:border-b-0">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-sm font-medium text-muted uppercase tracking-wider">
                  Module {index + 1}
                </span>
                <span className="text-xs text-muted">
                  {mod.lessons.length} lessons &middot; ~{moduleMinutes} min
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold mb-2">{mod.title}</h2>
              <p className="text-muted mb-4 leading-relaxed">{mod.description}</p>
              <div className="space-y-2">
                {mod.lessons.map((lesson, li) => (
                  <Link
                    key={lesson.id}
                    href={`/learn/${mod.id}/${lesson.id}`}
                    className="group flex items-center justify-between py-3 px-4 -mx-4 rounded hover:bg-highlight transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LessonCheck lessonKey={`${mod.id}/${lesson.id}`} />
                      <span className="text-sm text-muted w-6">
                        {index + 1}.{li + 1}
                      </span>
                      <span className="text-base font-medium group-hover:underline decoration-1 underline-offset-4">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-xs text-muted shrink-0">
                      ~{lesson.estimatedMinutes} min
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
