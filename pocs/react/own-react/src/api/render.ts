import { Fiber } from '../types/index';
import { nextUnitOfWork, wipRoot, deletions } from '../core/reconciler';

export function render(element: any, container: HTMLElement) {
  (wipRoot as Fiber) = {
    type: 'ROOT',
    dom: container,
    props: {
      children: [element],
    },
    alternate: (wipRoot as Fiber)?.alternate ?? undefined,
  };
  (deletions as Fiber[]) = [];
  (nextUnitOfWork as Fiber | null) = wipRoot;
} 