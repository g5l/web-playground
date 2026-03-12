import { useState } from 'inferno-hooks';

function Timer({ label }: { label: string }) {
  return <div style={{ padding: '8px', background: '#f0f0f0', borderRadius: 4 }}>Active: {label}</div>;
}

Timer.defaultHooks = {
  onComponentWillMount() {
    console.log('[Timer] onComponentWillMount — about to mount');
  },
  onComponentDidMount(domNode: Element) {
    console.log('[Timer] onComponentDidMount — mounted:', domNode.textContent);
  },
  onComponentShouldUpdate(lastProps: any, nextProps: any) {
    console.log('[Timer] onComponentShouldUpdate', { last: lastProps.label, next: nextProps.label });
    return true;
  },
  onComponentWillUpdate(lastProps: any, nextProps: any) {
    console.log('[Timer] onComponentWillUpdate', { last: lastProps.label, next: nextProps.label });
  },
  onComponentDidUpdate(lastProps: any, nextProps: any) {
    console.log('[Timer] onComponentDidUpdate', { last: lastProps.label, next: nextProps.label });
  },
  onComponentWillUnmount(domNode: Element) {
    console.log('[Timer] onComponentWillUnmount — removing:', domNode.textContent);
  },
};

export default function LifecycleDemo() {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <p style={{ margin: 0, fontSize: '0.85em', color: '#888' }}>
        Open the console to see lifecycle logs.
      </p>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setCount(c => c + 1)}>Update ({count})</button>
        <button onClick={() => setVisible(v => !v)}>{visible ? 'Unmount' : 'Mount'}</button>
      </div>

      {visible && <Timer label={`Render #${count}`} />}
    </div>
  );
}
