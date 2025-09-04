import React from 'react';

/**
 * Simulates a component from an external lib (e.g., Radix).
 * Key: it forwards the `style` prop to a native element,
 * which lets react-spring animate it via `animated()`.
 */
export const ExternalComponent = React.forwardRef(
  ({ style, children = 'External Component', ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        padding: '12px 16px',
        border: '1px solid #334155',
        borderRadius: 10,
        background: '#0b1220',
        display: 'inline-block',
        ...style
      }}
      {...rest}
    >
      {children}
    </div>
  )
);
ExternalComponent.displayName = 'ExternalComponent';
