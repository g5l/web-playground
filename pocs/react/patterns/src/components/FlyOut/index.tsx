import FlyOut from './FlyOut';
import { Toggle } from './Toggle';
import { List } from './List';
import { Item } from './Item';

(FlyOut as any).Toggle = Toggle;
(FlyOut as any).List = List;
(FlyOut as any).Item = Item;

export { FlyOut };