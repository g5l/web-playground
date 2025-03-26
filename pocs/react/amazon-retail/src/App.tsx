import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { SearchBar } from './components/SearchBar';
import { ProductList } from './components/ProductList';
import { ProductPage } from './pages/ProductPage.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { getProducts } from './services/productService';
import { setProducts, setLoading, setError } from './features/products/productsSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { filteredItems, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(setLoading(true));
    getProducts()
      .then(products => {
        dispatch(setProducts(products));
        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setError(err.message));
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <SearchBar />
      <ProductList products={filteredItems} />
    </>
  );
};

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
