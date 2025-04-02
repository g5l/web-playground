import { render, screen } from '../../utils/testing';
import { ProductCard } from '../ProductCard';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  image: 'https://via.placeholder.com/150',
  price: 19.99,
  description: 'This is a test product description.',
  rating: 4.5,
};

describe('ProductCard Component', () => {
  it('should render product details correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    
    const productImage = screen.getByRole('img', { name: mockProduct.name });
    expect(productImage).toBeInTheDocument();
    expect(productImage).toHaveAttribute('src', mockProduct.image);
    expect(screen.getByText(mockProduct.rating.toFixed(1))).toBeInTheDocument();
  });
});
