import { module1 } from "@/data/lessons/module1";
import { module2 } from "@/data/lessons/module2";
import { module3 } from "@/data/lessons/module3";
import { module4 } from "@/data/lessons/module4";
import { module5 } from "@/data/lessons/module5";
import { module6 } from "@/data/lessons/module6";

export interface Lesson {
  id: string;
  title: string;
  estimatedMinutes: number;
  content: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const modules: Module[] = [module1, module2, module3, module4, module5, module6];

export function getModule(moduleId: string): Module | undefined {
  return modules.find((m) => m.id === moduleId);
}

export function getLesson(
  moduleId: string,
  lessonId: string
): { module: Module; lesson: Lesson } | undefined {
  const mod = getModule(moduleId);
  if (!mod) return undefined;
  const lesson = mod.lessons.find((l) => l.id === lessonId);
  if (!lesson) return undefined;
  return { module: mod, lesson };
}

export function getTotalTime(): number {
  return modules.reduce(
    (total, mod) =>
      total + mod.lessons.reduce((t, l) => t + l.estimatedMinutes, 0),
    0
  );
}

export function getModuleTime(mod: Module): number {
  return mod.lessons.reduce((t, l) => t + l.estimatedMinutes, 0);
}
