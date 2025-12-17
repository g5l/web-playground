import React, { useState } from 'react';
import GridLayoutLib from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout/legacy';

const GridLayout = WidthProvider(GridLayoutLib);

const initialLayout = [
  { i: '1', x: 0, y: 0, w: 3, h: 2 },
  { i: '2', x: 3, y: 0, w: 3, h: 2 },
  { i: '3', x: 6, y: 0, w: 3, h: 2 },
  { i: '4', x: 9, y: 0, w: 3, h: 2 },
  { i: '5', x: 0, y: 2, w: 4, h: 2 },
  { i: '6', x: 4, y: 2, w: 4, h: 2 },
];

export default function BasicGrid() {
  const [layout, setLayout] = useState(initialLayout);

  return (
    <section>
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        margin={[10, 10]}
        containerPadding={[10, 10]}
        compactType="vertical"
        onLayoutChange={(next) => {
          setLayout(next);
          console.log('layout:', next);
        }}
      >
        {layout.map((item) => (
          <div key={item.i} className="grid-item">
            <span className="label">Item {item.i}</span>
          </div>
        ))}
      </GridLayout>
    </section>
  );
}
