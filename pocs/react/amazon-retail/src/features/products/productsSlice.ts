import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Product} from "../../types/product";

interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  searchTerm: '',
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredItems = state.items.filter(product =>
        product.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        product.description.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setSearchTerm, setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer; 