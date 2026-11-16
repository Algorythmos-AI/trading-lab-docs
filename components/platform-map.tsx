/**
 * The map on "Start here": Stocks & Options on the one cloud server, sending signed snapshots to the status site;
 * Crypto (closed) and Forex HFT (parked, not installed) drawn dimmed; the knowledge base release Forex HFT pins.
 */
export function PlatformMap() {
  const box = 'fill-[var(--card)] stroke-[var(--border)]';
  const label = 'fill-[var(--foreground)] text-[13px] font-medium';
  const note = 'fill-[var(--muted-foreground)] text-[11px]';
  const line = 'stroke-[var(--muted-foreground)]';
  const idle = [
    { name: 'Crypto', state: 'closed', y: 128 },
    { name: 'Forex HFT', state: 'parked, not installed', y: 206 },
  ];
  return (
    // On a phone the drawing keeps a readable size and scrolls sideways inside its own box.
    <div className="not-prose my-6 overflow-x-auto">
    <svg
      viewBox="0 0 720 300"
      role="img"
      aria-label="Only Stocks & Options runs on the cloud server; it sends signed snapshots to the status site. Crypto is closed. Forex HFT is parked and not installed; it pins a knowledge base release."
      className="w-full min-w-[600px] max-w-3xl"
    >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0 10 5 0 10z" className="fill-[var(--muted-foreground)]" />
        </marker>
      </defs>
      <rect x="10" y="110" width="150" height="80" rx="6" className={box} />
      <text x="85" y="146" textAnchor="middle" className={label}>Knowledge Base</text>
      <text x="85" y="164" textAnchor="middle" className={note}>tagged releases</text>

      <rect x="250" y="16" width="220" height="100" rx="8" className="fill-none stroke-[var(--border)]" strokeDasharray="4 4" />
      <text x="360" y="34" textAnchor="middle" className={note}>one cloud server</text>
      <rect x="270" y="44" width="180" height="58" rx="6" className={box} />
      <text x="360" y="70" textAnchor="middle" className={label}>Stocks & Options</text>
      <text x="360" y="88" textAnchor="middle" className={note}>runs every trading day</text>
      <line x1="450" y1="73" x2="558" y2="150" className={line} markerEnd="url(#arrow)" />
      <text x="530" y="96" textAnchor="middle" className={note}>signed snapshot</text>

      {idle.map(({ name, state, y }) => (
        <g key={name} opacity="0.55">
          <rect x="270" y={y} width="180" height="58" rx="6" className={box} strokeDasharray="3 3" />
          <text x="360" y={y + 26} textAnchor="middle" className={label}>{name}</text>
          <text x="360" y={y + 44} textAnchor="middle" className={note}>{state}</text>
        </g>
      ))}
      <g opacity="0.55">
        <line x1="160" y1="170" x2="268" y2="235" className={line} strokeDasharray="3 3" markerEnd="url(#arrow)" />
        <text x="196" y="222" textAnchor="middle" className={note}>pinned</text>
      </g>

      <rect x="560" y="110" width="150" height="80" rx="6" className={box} />
      <text x="635" y="146" textAnchor="middle" className={label}>Status site</text>
      <text x="635" y="164" textAnchor="middle" className={note}>lab.algorythmos.com</text>
    </svg>
    </div>
  );
}
