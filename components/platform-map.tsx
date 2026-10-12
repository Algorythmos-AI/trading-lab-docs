/** The map on "Start here": three platforms on one host, the knowledge base feeding them, snapshots to the status site. */
export function PlatformMap() {
  const box = 'fill-[var(--card)] stroke-[var(--border)]';
  const label = 'fill-[var(--foreground)] text-[13px] font-medium';
  const note = 'fill-[var(--muted-foreground)] text-[11px]';
  const line = 'stroke-[var(--muted-foreground)]';
  const platforms = ['Stocks & Options', 'Crypto', 'Forex HFT'];
  return (
    <svg viewBox="0 0 720 300" role="img" aria-label="Knowledge base releases feed three platforms on one server; each sends signed snapshots to the status site." className="not-prose my-6 w-full max-w-3xl">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" className="fill-[var(--muted-foreground)]" />
        </marker>
      </defs>
      <rect x="10" y="110" width="150" height="80" rx="6" className={box} />
      <text x="85" y="146" textAnchor="middle" className={label}>Knowledge Base</text>
      <text x="85" y="164" textAnchor="middle" className={note}>tagged releases</text>

      <rect x="250" y="16" width="220" height="268" rx="8" className="fill-none stroke-[var(--border)]" strokeDasharray="4 4" />
      <text x="360" y="36" textAnchor="middle" className={note}>one cloud server</text>
      {platforms.map((name, i) => {
        const y = 50 + i * 78;
        return (
          <g key={name}>
            <rect x="270" y={y} width="180" height="58" rx="6" className={box} />
            <text x="360" y={y + 34} textAnchor="middle" className={label}>{name}</text>
            <line x1="160" y1="150" x2="268" y2={y + 29} className={line} strokeDasharray="3 3" markerEnd="url(#arrow)" />
            <line x1="450" y1={y + 29} x2="558" y2="150" className={line} markerEnd="url(#arrow)" />
          </g>
        );
      })}
      <text x="205" y="104" textAnchor="middle" className={note}>pinned</text>
      <text x="512" y="104" textAnchor="middle" className={note}>signed snapshot</text>

      <rect x="560" y="110" width="150" height="80" rx="6" className={box} />
      <text x="635" y="146" textAnchor="middle" className={label}>Status site</text>
      <text x="635" y="164" textAnchor="middle" className={note}>lab.algorythmos.com</text>
    </svg>
  );
}
