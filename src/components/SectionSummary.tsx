interface Props {
  summary: string;
}

export default function SectionSummary({ summary }: Props) {
  if (!summary) return null;
  return (
    <div className="bg-highlight border-l-2 border-foreground px-4 py-3 mb-1 text-sm leading-relaxed text-foreground/80">
      {summary}
    </div>
  );
}
