import { render, screen } from '../../utils/testing';
import { ProductList } from '../ProductList';
import { Product } from '../../types/product';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    description: 'Description 1',
    price: 99.99,
    rating: 4.5,
    image: 'image1.jpg',
    category: 'Category 1',
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'Description 2',
    price: 149.99,
    rating: 4.0,
    image: 'image2.jpg',
    category: 'Category 2',
  },
];

describe('ProductList', () => {
  it('should render all products', () => {
    render(<ProductList products={mockProducts} />);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });

  it('should render an empty state when there are no products', () => {
    render(<ProductList products={[]} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByText(/Product/i)).not.toBeInTheDocument();
  });

  it('should render the correct number of ProductCard components', () => {
    render(<ProductList products={mockProducts} />);

    const productCards = screen.getAllByTestId('product-card');
    expect(productCards.length).toBe(mockProducts.length);
  });

  it('should pass correct product props to each ProductCard', () => {
    render(<ProductList products={mockProducts} />);

    mockProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(screen.getByText(product.description)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument();
    });
  });
});
