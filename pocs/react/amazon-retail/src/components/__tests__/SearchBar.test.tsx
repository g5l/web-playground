import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SearchBar } from '../SearchBar';
import productsReducer, { setSearchTerm } from '../../features/products/productsSlice';
import { MantineProvider } from '@mantine/core';

const createTestStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
  });
};

const renderWithProviders = (component: React.ReactNode) => {
  const store = createTestStore();
  return {
    store,
    ...render(
      <Provider store={store}>
        <MantineProvider>
          {component}
        </MantineProvider>
      </Provider>
    ),
  };
};

describe('SearchBar', () => {
  it('renders search input', () => {
    renderWithProviders(<SearchBar />);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('dispatches setSearchTerm action on input change', () => {
    const { store } = renderWithProviders(<SearchBar />);
    const searchInput = screen.getByPlaceholderText('Search products...');
    
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    
    const state = store.getState();
    expect(state.products.searchTerm).toBe('test search');
  });
}); 