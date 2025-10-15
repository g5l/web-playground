import Vibe from './vibe';

import './demo/index.js';
import './demo/createElement.js';

// Re-export library in case it’s imported from the bundle
export default Vibe;
export { default as Vibe } from './vibe';
