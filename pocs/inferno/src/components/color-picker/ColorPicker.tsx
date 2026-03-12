import { useState } from 'inferno-hooks';
import { createElement } from 'inferno-create-element';

const PALETTE = [
  { name: 'Coral', hex: '#FF6B6B' },
  { name: 'Sky', hex: '#4ECDC4' },
  { name: 'Sand', hex: '#F7DC6F' },
  { name: 'Lavender', hex: '#BB8FCE' },
  { name: 'Mint', hex: '#82E0AA' },
  { name: 'Slate', hex: '#5D6D7E' },
];

function Swatch({ color, isActive, onSelect }: {
  color: typeof PALETTE[number];
  isActive: boolean;
  onSelect: () => void;
}) {
  return createElement('button', {
    onClick: onSelect,
    title: color.name,
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      backgroundColor: color.hex,
      border: isActive ? '3px solid #222' : '3px solid transparent',
      cursor: 'pointer',
      transition: 'transform 0.15s',
      transform: isActive ? 'scale(1.15)' : 'scale(1)',
    },
  });
}

export default function ColorPicker() {
  const [selected, setSelected] = useState(PALETTE[0]);

  return createElement('div', { style: { maxWidth: 320 } },
    createElement('div', {
      style: {
        height: 80,
        borderRadius: 8,
        backgroundColor: selected.hex,
        marginBottom: 16,
        transition: 'background-color 0.3s',
      },
    }),
    createElement('div', { style: { display: 'flex', gap: 10, justifyContent: 'center' } },
      ...PALETTE.map(color =>
        createElement(Swatch, {
          key: color.hex,
          color,
          isActive: color.hex === selected.hex,
          onSelect: () => setSelected(color),
        }),
      ),
    ),
    createElement('p', { style: { textAlign: 'center', marginTop: 12, fontFamily: 'monospace' } },
      `${selected.name} — ${selected.hex}`,
    ),
  );
}
