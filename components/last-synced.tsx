import synced from '@/lib/synced.json';

/** When the copied and generated pages were last synced, and from which commits. Written by scripts/sync.mjs. */
export function LastSynced() {
  return (
    <p className="text-sm text-fd-muted-foreground">
      Copied and generated pages last synced on <strong className="text-fd-foreground">{synced.synced_on}</strong>
      {' from '}
      {Object.entries(synced.sources).map(([repo, sha], i) => (
        <span key={repo}>
          {i > 0 ? ', ' : ''}
          <code>
            {repo}@{sha}
          </code>
        </span>
      ))}
      . Written pages name their own source commit at the top.
    </p>
  );
}
