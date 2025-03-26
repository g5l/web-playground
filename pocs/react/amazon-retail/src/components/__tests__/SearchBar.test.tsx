import {configureStore} from '@reduxjs/toolkit';
import {fireEvent, render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import productsReducer from '../../features/products/productsSlice';
import {SearchBar} from '../SearchBar';

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
        {component}
      </Provider>
    ),
  };
};

describe('SearchBar', () => {
  it('renders search input', () => {
    renderWithProviders(<SearchBar/>);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('dispatches setSearchTerm action on input change', () => {
    const {store} = renderWithProviders(<SearchBar/>);
    const searchInput = screen.getByPlaceholderText('Search products...');

    fireEvent.change(searchInput, {target: {value: 'test search'}});

    const state = store.getState();
    expect(state.products.searchTerm).toBe('test search');
  });
}); 