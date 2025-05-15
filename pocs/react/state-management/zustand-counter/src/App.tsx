import { useEffect, useRef, useState } from 'react'
import { useTransientStore } from './stores/transientStore'
import { AnimatedItemFast, AnimatedItemSlow } from './components/AnimatedItem'

function App() {
  const ref = useRef<HTMLDivElement>(null)
  const items = useTransientStore((state) => state.items)
  const [fast, setFast] = useState(true)
  const Component = fast ? AnimatedItemFast : AnimatedItemSlow

  // Start animation loop
  useEffect(() => {
    let lastCalledTime = Date.now()
    let fps = 0

    function renderLoop() {
      const delta = (Date.now() - lastCalledTime) / 1000
      lastCalledTime = Date.now()
      fps = 1 / delta
      
      if (ref.current) {
        ref.current.innerText = `FPS: ${fps.toFixed(0)}`
      }
      
      useTransientStore.getState().advance()
      requestAnimationFrame(renderLoop)
    }

    renderLoop()
  }, [])

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Zustand Transient Updates Example</h1>
      
      <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <div ref={ref} style={{ marginBottom: '1rem' }}>FPS: 0</div>
        <button 
          onClick={() => setFast(!fast)}
          style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
        >
          Switch to {fast ? 'Normal (Slow)' : 'Transient (Fast)'} Updates
        </button>
        
        <div style={{ 
          position: 'relative', 
          height: '400px', 
          border: '1px solid #eee',
          overflow: 'hidden'
        }}>
          {items.map((id, index) => (
            <Component key={id} id={id} offset={index * 3} />
          ))}
        </div>
        
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          {items.length} animated items using {fast ? 'transient' : 'normal'} updates
        </p>
      </div>
    </div>
  )
}

export default App
