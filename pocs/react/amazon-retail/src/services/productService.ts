import {Product} from '../types/product';

type ReturnType<T> = {
  data: T | null;
  error: Error | null;
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'High-quality wireless headphones with active noise cancellation',
    price: 299.99,
    rating: 4.5,
    image: 'https://placehold.co/300x300',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch',
    price: 199.99,
    rating: 4.3,
    image: 'https://placehold.co/300x300',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and eco-friendly cotton t-shirt',
    price: 29.99,
    rating: 4.8,
    image: 'https://placehold.co/300x300',
    category: 'Clothing'
  },
  {
    id: '4',
    name: 'Professional Coffee Maker',
    description: 'Brew barista-quality coffee at home',
    price: 399.99,
    rating: 4.7,
    image: 'https://placehold.co/300x300',
    category: 'Home & Kitchen'
  },
];

export const getProducts = async (): Promise<ReturnType<Product[]>> => {
  return new Promise<ReturnType<Product[]>>((resolve) => {
    setTimeout(() => {
      resolve({data: mockProducts, error: null});
    }, 500);
  });
};

export const getRelatedProducts = async (
  category: string,
  currentProductId: string
): Promise<ReturnType<Product[]>> => {
  return new Promise<ReturnType<Product[]>>((resolve) => {
    setTimeout(() => {
      resolve({
        value: mockProducts.filter(
          product => product.category === category && product.id !== currentProductId
        ),
        error: null
      });
    }, 500);
  });
};