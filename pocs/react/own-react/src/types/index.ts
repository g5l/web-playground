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
  key?: ReactKey | undefined;
  children?: VNode[];
  dom?: HTMLElement | Text | undefined;
  parent?: VNode | undefined;
}

export interface Fiber {
  type: string | ComponentType<any>;
  props: Props;
  key?: ReactKey | undefined;
  dom?: HTMLElement | Text | undefined;
  parent?: Fiber | undefined;
  child?: Fiber | undefined;
  sibling?: Fiber | undefined;
  alternate?: Fiber | undefined;
  effectTag?: 'PLACEMENT' | 'UPDATE' | 'DELETION';
  hooks?: Hook[];
  hookIndex?: number;
}

export interface Hook {
  state: any;
  queue: any[];
  deps?: any[] | undefined;
  effect?: (() => void | (() => void)) | undefined;
  cleanup?: ((() => void) | void) | undefined;
}

export interface UpdateQueue {
  pending: Update | null;
}

export interface Update {
  action: any;
  next?: Update | null | undefined;
} 
