import { Component } from 'inferno';
import { createElement } from 'inferno-create-element';

interface CounterState {
  count: number;
  step: number;
}

export default class Counter extends Component<{}, CounterState> {
  state = { count: 0, step: 1 };

  render() {
    const { count, step } = this.state;

    return (
      <div className="counter">
        <div className="display">Count: <strong>{count}</strong></div>

        <div className="controls">
          <button onClick={() => this.setState({ count: count - step })}>-{step}</button>
          <button onClick={() => this.setState({ count: count + step })}>+{step}</button>

          <label>
            Step:
            <input
              type="number"
              value={step}
              onInput={(e: any) => this.setState({ step: Number(e.target.value) || 1 })}
              style={{ width: '60px', marginLeft: '8px' }}
            />
          </label>

          <button onClick={() => this.setState({ count: 0 })}>Reset</button>
        </div>
      </div>
    );
  }
}
