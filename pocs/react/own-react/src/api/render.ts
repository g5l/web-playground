import { Fiber } from '../types/index';
import {
  getWipRoot,
  setWipRoot,
  setNextUnitOfWork,
  clearDeletions,
} from '../core/reconciler';

export function render(element: any, container: HTMLElement) {
  const previous = getWipRoot();
  const root: Fiber = {
    type: 'ROOT',
    dom: container,
    props: {
      children: [element],
    },
    alternate: previous?.alternate ?? undefined,
  } as Fiber;

  setWipRoot(root);
  clearDeletions();
  setNextUnitOfWork(root);
}
