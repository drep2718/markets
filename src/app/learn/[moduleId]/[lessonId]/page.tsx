import { notFound } from "next/navigation";
import Link from "next/link";
import { modules, getLesson } from "@/lib/lessons";

export function generateStaticParams() {
  const params: { moduleId: string; lessonId: string }[] = [];
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      params.push({ moduleId: mod.id, lessonId: lesson.id });
    }
  }
  return params;
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key++}
          className="font-serif text-2xl font-bold mt-10 mb-4 border-b border-border pb-2"
        >
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="font-serif text-xl font-semibold mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith("- **") || line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc list-outside pl-6 space-y-1.5 my-4">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-base leading-relaxed">
              <span
                dangerouslySetInnerHTML={{
                  __html: item
                    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
                    .replace(/\*([^*]+)\*/g, "<em>$1</em>"),
                }}
              />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={key++} className="font-semibold mt-6 mb-2">
          {line.replace(/\*\*/g, "")}
        </p>
      );
      i++;
      continue;
    }

    if (line.startsWith("**") && line.includes(":**")) {
      elements.push(
        <p
          key={key++}
          className="my-2 text-base leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: line
              .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
              .replace(/\*([^*]+)\*/g, "<em>$1</em>"),
          }}
        />
      );
      i++;
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    elements.push(
      <p
        key={key++}
        className="my-3 text-base leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: line
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            .replace(/\*([^*]+)\*/g, "<em>$1</em>"),
        }}
      />
    );
    i++;
  }

  return elements;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ moduleId: string; lessonId: string }>;
}) {
  const { moduleId, lessonId } = await params;
  const result = getLesson(moduleId, lessonId);
  if (!result) notFound();

  const { module: mod, lesson } = result;

  const currentLessonIndex = mod.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentLessonIndex > 0 ? mod.lessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < mod.lessons.length - 1
      ? mod.lessons[currentLessonIndex + 1]
      : null;

  const currentModuleIndex = modules.findIndex((m) => m.id === moduleId);
  const nextModule =
    !nextLesson && currentModuleIndex < modules.length - 1
      ? modules[currentModuleIndex + 1]
      : null;
  const prevModule =
    !prevLesson && currentModuleIndex > 0
      ? modules[currentModuleIndex - 1]
      : null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="mb-8 text-sm text-muted">
        <Link href="/learn" className="hover:text-foreground">
          Learn
        </Link>
        <span className="mx-2">/</span>
        <span>{mod.title}</span>
        <span className="mx-2">/</span>
        <span className="text-foreground">{lesson.title}</span>
      </nav>

      <header className="mb-8 border-b border-border pb-6">
        <p className="text-sm text-muted uppercase tracking-wider mb-2">
          Module {currentModuleIndex + 1} &middot; Lesson {currentLessonIndex + 1}
        </p>
        <h1 className="font-serif text-3xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-sm text-muted">
          Estimated reading time: ~{lesson.estimatedMinutes} minutes
        </p>
      </header>

      <article className="article-body">{renderMarkdown(lesson.content)}</article>

      <nav className="mt-12 pt-8 border-t border-border flex items-center justify-between">
        <div>
          {prevLesson ? (
            <Link
              href={`/learn/${mod.id}/${prevLesson.id}`}
              className="text-sm text-muted hover:text-foreground"
            >
              &larr; {prevLesson.title}
            </Link>
          ) : prevModule ? (
            <Link
              href={`/learn/${prevModule.id}/${prevModule.lessons[prevModule.lessons.length - 1].id}`}
              className="text-sm text-muted hover:text-foreground"
            >
              &larr; {prevModule.title}
            </Link>
          ) : (
            <Link href="/learn" className="text-sm text-muted hover:text-foreground">
              &larr; All Modules
            </Link>
          )}
        </div>
        <div>
          {nextLesson ? (
            <Link
              href={`/learn/${mod.id}/${nextLesson.id}`}
              className="text-sm text-muted hover:text-foreground"
            >
              {nextLesson.title} &rarr;
            </Link>
          ) : nextModule ? (
            <Link
              href={`/learn/${nextModule.id}/${nextModule.lessons[0].id}`}
              className="text-sm text-muted hover:text-foreground"
            >
              {nextModule.title} &rarr;
            </Link>
          ) : (
            <Link href="/learn" className="text-sm text-muted hover:text-foreground">
              Complete &rarr;
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
