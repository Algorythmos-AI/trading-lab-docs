import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Standing } from '@/components/standing';
import { PlatformMap } from '@/components/platform-map';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Standing,
    PlatformMap,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
