import Vibe from '../vibe';

export function EffectDemo() {
  const [count, setCount] = Vibe.useState(0);

  // interval with cleanup on unmount
  Vibe.useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // update document title whenever count changes
  Vibe.useEffect(() => {
    document.title = `Effect count: ${count}`;
    return () => {
      // reset on next change/unmount in this simple demo
      document.title = 'Own React';
    };
  }, [count]);

  return (
    <div>
      <h3>useEffect Demo (interval)</h3>
      <p>Ticking every second: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
      <button onClick={() => setCount(c => Math.max(0, c - 1))}>-1</button>
    </div>
  );
}

