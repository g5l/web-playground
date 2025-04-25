import {MantineProvider} from '@mantine/core';
import AppLayout from './components/Layout/AppShell';

// const theme: MantineThemeOverride = {
//   colorScheme: 'light',
//   primaryColor: 'blue',
//   fontFamily: 'Roboto, sans-serif',
// };

function App() {
  return (
    <MantineProvider>
      <AppLayout/>
    </MantineProvider>
  );
}

export default App;
