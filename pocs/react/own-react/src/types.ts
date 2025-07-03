export type ReactKey = string | number;

export interface ReactElement {
  type: string | ComponentType<any>;
  props: any;
  key?: ReactKey;
}

export interface ReactNode {
  type: string | ComponentType<any>;
  props: Props;
  key?: ReactKey;
  children?: ReactNode[];
}

export interface Props {
  [key: string]: any;
  children?: ReactNode | ReactNode[] | string | number | null;
}

export interface ComponentType<P = {}> {
  (props: P): ReactElement | null;
}

export interface VNode {
  type: string | ComponentType<any>;
  props: Props;
  key?: ReactKey;
  children: VNode[];
  dom?: HTMLElement | Text;
}

export interface Fiber {
  type: string | ComponentType<any>;
  props: Props;
  key?: ReactKey;
  dom?: HTMLElement | Text;
  parent?: Fiber;
  child?: Fiber;
  sibling?: Fiber;
  alternate?: Fiber;
  effectTag?: 'PLACEMENT' | 'UPDATE' | 'DELETION';
  hooks?: Hook[];
  hookIndex?: number;
}

export interface Hook {
  state: any;
  queue: any[];
}

export interface UpdateQueue {
  pending: Update | null;
}

export interface Update {
  action: any;
  next: Update | null;
}