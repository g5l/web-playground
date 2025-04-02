import { getProducts, getRelatedProducts } from '../productService';
import { Product } from '../../types/product';

jest.useFakeTimers();

describe('Product Service', () => {
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Wireless Noise Cancelling Headphones',
      description: 'High-quality wireless headphones with active noise cancellation',
      price: 299.99,
      rating: 4.5,
      image: 'https://placehold.co/300x300',
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      description: 'Track your fitness goals with this advanced smartwatch',
      price: 199.99,
      rating: 4.3,
      image: 'https://placehold.co/300x300',
      category: 'Electronics',
    },
    {
      id: '3',
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable and eco-friendly cotton t-shirt',
      price: 29.99,
      rating: 4.8,
      image: 'https://placehold.co/300x300',
      category: 'Clothing',
    },
    {
      id: '4',
      name: 'Professional Coffee Maker',
      description: 'Brew barista-quality coffee at home',
      price: 399.99,
      rating: 4.7,
      image: 'https://placehold.co/300x300',
      category: 'Home & Kitchen',
    },
  ];

  it('getProducts should return all products', async () => {
    const promise = getProducts();
    jest.runAllTimers();

    const result = await promise;

    expect(result.data).toEqual(mockProducts);
    expect(result.error).toBeNull();
  });

  it('getRelatedProducts should return products from the same category excluding the current product', async () => {
    const promise = getRelatedProducts('Electronics', '1');

    jest.runAllTimers();
    const result = await promise;

    expect(result.data).toEqual([
      {
        id: '2',
        name: 'Smart Fitness Watch',
        description: 'Track your fitness goals with this advanced smartwatch',
        price: 199.99,
        rating: 4.3,
        image: 'https://placehold.co/300x300',
        category: 'Electronics',
      },
    ]);
    expect(result.error).toBeNull();
  });

  it('getRelatedProducts should return an empty array when no related products exist', async () => {
    const promise = getRelatedProducts('Home & Kitchen', '4');

    jest.runAllTimers();
    const result = await promise;

    expect(result.data).toEqual([]);
    expect(result.error).toBeNull();
  });
});
