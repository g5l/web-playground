import React, { useState } from 'react';
import { Responsive } from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout/legacy';

const ResponsiveGridLayout = WidthProvider(Responsive);

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
const cols = { lg: 12, md: 10, sm: 8, xs: 6, xxs: 4 };

const layouts = {
  lg: [
    { i: 'a', x: 0, y: 0, w: 3, h: 2 },
    { i: 'b', x: 3, y: 0, w: 3, h: 2 },
    { i: 'c', x: 6, y: 0, w: 3, h: 2 },
    { i: 'd', x: 9, y: 0, w: 3, h: 2 },
    { i: 'e', x: 0, y: 2, w: 6, h: 2 },
  ],
  md: [
    { i: 'a', x: 0, y: 0, w: 5, h: 2 },
    { i: 'b', x: 5, y: 0, w: 5, h: 2 },
    { i: 'c', x: 0, y: 2, w: 5, h: 2 },
    { i: 'd', x: 5, y: 2, w: 5, h: 2 },
    { i: 'e', x: 0, y: 4, w: 10, h: 2 },
  ],
  sm: [
    { i: 'a', x: 0, y: 0, w: 8, h: 2 },
    { i: 'b', x: 0, y: 2, w: 4, h: 2 },
    { i: 'c', x: 4, y: 2, w: 4, h: 2 },
    { i: 'd', x: 0, y: 4, w: 8, h: 2 },
    { i: 'e', x: 0, y: 6, w: 8, h: 2 },
  ],
};

export default function ResponsiveGrid() {
  const [bp, setBp] = useState('lg');

  const items = ['a', 'b', 'c', 'd', 'e'];

  return (
    <section>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={30}
        margin={[10, 10]}
        containerPadding={[10, 10]}
        onBreakpointChange={(next) => setBp(next)}
        onLayoutChange={(l, all) => console.log('layouts:', all)}
      >
        {items.map((k) => (
          <div key={k} className="grid-item">
            <span className="label">Item {k.toUpperCase()}</span>
          </div>
        ))}
      </ResponsiveGridLayout>
    </section>
  );
}
