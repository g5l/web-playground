import {render, screen} from '../../utils/testing';
import {ProductCard} from '../ProductCard';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  image: 'https://via.placeholder.com/150',
  price: 19.99,
  description: 'This is a test product description.',
  rating: 4.5,
};

describe('ProductCard Component', () => {
  test('renders product name, price, and description', () => {
    render(
      <ProductCard product={mockProduct}/>
    );

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });
});
