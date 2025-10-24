import Counter from './pocs/counter/Counter';

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
      </main>
    </div>
  );
}


export default App;