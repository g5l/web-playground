import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ProductList} from '../components/ProductList';
import {SearchBar} from '../components/SearchBar';
import {setError, setLoading, setProducts} from '../features/products/productsSlice';
import {getProducts} from '../services/productService';
import {RootState} from '../store';

export const HomePage = () => {
  const dispatch = useDispatch();
  const {filteredItems, loading, error} = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(setLoading(true));
    getProducts()
      .then(({data}) => {
        dispatch(setProducts(data));
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
      <SearchBar/>
      <ProductList products={filteredItems}/>
    </>
  );
};