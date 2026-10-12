import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, statusSite } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="font-semibold tracking-tight">
          {appName} <span className="ml-1 rounded border px-1.5 py-0.5 text-[10px] font-medium uppercase text-fd-muted-foreground">paper only</span>
        </span>
      ),
    },
    links: [{ text: 'Status site', url: statusSite, external: true }],
  };
}
