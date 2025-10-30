import FlyOutBase from './FlyOut';
import {Item} from './Item';
import {List} from './List';
import {Toggle} from './Toggle';

const FlyOut = FlyOutBase;
FlyOut.Toggle = Toggle;
FlyOut.List = List;
FlyOut.Item = Item;

export {FlyOut};
