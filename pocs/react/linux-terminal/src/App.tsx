import Terminal from "./components/Terminal.tsx";
import './App.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';


function App() {
  return (
    <MantineProvider>
      <Terminal/>
    </MantineProvider>
  );
}

export default App;
