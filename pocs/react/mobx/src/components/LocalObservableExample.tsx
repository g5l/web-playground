import { observer, useLocalObservable } from 'mobx-react-lite';

export const LocalObservableExample = observer(function LocalObservableExample() {
  const state = useLocalObservable(() => ({
    a: 1,
    b: 2,
    get sum() {
      return this.a + this.b;
    },
    incA() {
      this.a += 1;
    },
    incB() {
      this.b += 1;
    },
    reset() {
      this.a = 1;
      this.b = 2;
    },
  }));

  return (
    <div className="row" style={{ gap: 8 }}>
      <span className="tag">a: {state.a}</span>
      <span className="tag">b: {state.b}</span>
      <span className="tag">sum: {state.sum}</span>
      <span className="spacer" />
      <button onClick={state.incA} className="ghost">+a</button>
      <button onClick={state.incB} className="ghost">+b</button>
      <button onClick={state.reset}>Reset</button>
    </div>
  );
});

