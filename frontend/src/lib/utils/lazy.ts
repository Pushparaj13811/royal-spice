import { lazy, ComponentType } from 'react';

export function lazyLoad<T extends ComponentType<any>>(importFunc: () => Promise<{ default: T }>) {
  return lazy(importFunc);
}