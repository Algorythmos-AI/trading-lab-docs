/** A left-to-right chain of steps for architecture pages. On a narrow screen it stacks top to bottom. */
export function Flow({ steps }: { steps: { name: string; note?: string }[] }) {
  return (
    <ol className="not-prose my-6 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-stretch">
      {steps.map((s, i) => (
        <li key={s.name} className="flex items-center gap-2">
          <div className="min-w-32 rounded-md border bg-fd-card px-3 py-2 shadow-sm">
            <div className="text-sm font-medium">{s.name}</div>
            {s.note ? <div className="text-xs text-fd-muted-foreground">{s.note}</div> : null}
          </div>
          {i < steps.length - 1 ? (
            <span aria-hidden className="rotate-90 text-fd-muted-foreground md:rotate-0">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
