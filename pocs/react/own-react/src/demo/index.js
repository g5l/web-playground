import Vibe from '../vibe';

/** @jsx Vibe.createElement */
function Counter() {
  const [state, setState] = Vibe.useState(1)
  return (
    <h1 onClick={() => setState(c => c + 1)}>
    Count: {state}
    </h1>
  )
}
const element = <Counter />
const container = document.getElementById("root")
Vibe.render(element, container)