import React from 'react';
import FlyOutBase from './FlyOut';
import { Toggle } from './Toggle';
import { List } from './List';
import { Item } from './Item';
import type { FlyOutProps } from './types';
import './styles.css';

type FlyOutCompound = ((props: FlyOutProps) => React.ReactElement | null) & {
  Toggle: typeof Toggle;
  List: typeof List;
  Item: typeof Item;
};

const FlyOut = FlyOutBase as FlyOutCompound;
FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

export { FlyOut };
