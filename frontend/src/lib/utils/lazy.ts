import { lazy } from 'react';

export function lazyLoad(importFunc: () => Promise<{ [key: string]: any }>, name = 'default') {
  return lazy(() =>
    importFunc().then((module) => ({ default: module[name] }))
  );
}