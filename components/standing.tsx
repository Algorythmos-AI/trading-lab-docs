import type { ReactNode } from 'react';

const tone = {
  done: 'bg-[var(--good-chip)] text-[var(--good)]',
  open: 'bg-[var(--info-chip)] text-[var(--info)]',
  waiting: 'bg-[var(--warn-chip)] text-[var(--warn)]',
  failed: 'bg-[var(--bad-chip)] text-[var(--bad)]',
  'not started': 'bg-[var(--neutral-chip)] text-[var(--neutral)]',
} as const;

/** A status chip: the same five words on every page, so a standing reads the same everywhere. */
export function Standing({ is, children }: { is: keyof typeof tone; children?: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded px-1.5 py-0.5 font-mono text-xs font-medium ${tone[is]}`}>
      {children ?? is}
    </span>
  );
}
