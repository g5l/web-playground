import { render, screen } from '../../utils/testing';
import { ProductList } from '../ProductList';

const mockProducts = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    rating: 4.5,
    image: 'image1.jpg',
    category: 'Category 1'
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description 2',
    price: 149.99,
    rating: 4.0,
    image: 'image2.jpg',
    category: 'Category 2'
  }
];


describe('ProductList', () => {
  it('renders all products', () => {
    render(<ProductList products={mockProducts} />);
    
    mockProducts.forEach(product => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });
}); 