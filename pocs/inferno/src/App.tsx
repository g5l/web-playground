import { createElement } from 'inferno-create-element';
import Counter from './components/counter/Counter';
import ColorPicker from './components/color-picker/ColorPicker';
import LifecycleDemo from './components/lifecycle-demo/LifecycleDemo';

export function App() {
  return (
    <div className="app">
      <header>
        <h1>Inferno POCs</h1>
      </header>

      <main>
        <section className="poc">
          <h2>Counter (starter POC)</h2>
          <Counter />
        </section>

        <section className="poc">
          <h2>Color Picker (createElement)</h2>
          <ColorPicker />
        </section>

        <section className="poc">
          <h2>Lifecycle Demo (functional defaultHooks)</h2>
          <LifecycleDemo />
        </section>
      </main>
    </div>
  );
}


export default App;