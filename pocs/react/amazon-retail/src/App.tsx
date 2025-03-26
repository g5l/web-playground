import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { ProductPage } from './pages/ProductPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </Router>
      </MantineProvider>
    </Provider>
  );
}

export default App;
