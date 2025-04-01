import { useSelector } from 'react-redux';
import * as productService from '../../services/productService';
import { Product } from '../../types/product';
import { render, screen, waitFor, act } from '../../utils/testing';
import { ProductPage } from '../ProductPage';

jest.mock('../../services/productService');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockProduct: Product = {
  id: '1',
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  rating: 4.5,
  image: 'test-image.jpg',
  category: 'Test Category',
};

const mockRelatedProducts: Product[] = [
  {
    id: '2',
    name: 'Related Product',
    description: 'Related Description',
    price: 89.99,
    rating: 4.0,
    image: 'related-image.jpg',
    category: 'Test Category',
  },
];

const mockUseSelector = (product: Product | undefined) => {
  (useSelector as jest.Mock).mockReturnValue(product);
};

const mockGetRelatedProducts = () => {
  (productService.getRelatedProducts as jest.Mock).mockReturnValue(Promise.resolve({data: mockRelatedProducts}));
};

describe('ProductPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render product details correctly', () => {
    mockUseSelector(mockProduct);
    mockGetRelatedProducts();

    render(<ProductPage />);

    expect(screen.getByRole('heading', { level: 1, name: mockProduct.name })).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(`(${mockProduct.rating.toFixed(1)})`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockProduct.image);
  });

  it('should fetch and render related products', async () => {
    mockUseSelector(mockProduct);
    mockGetRelatedProducts();

    render(<ProductPage />);

    await waitFor(() => {
      expect(screen.getByText(mockRelatedProducts[0].name)).toBeInTheDocument();
    });

    expect(productService.getRelatedProducts).toHaveBeenCalledWith(mockProduct.category, mockProduct.id);
  });

  it('renders loading state while fetching related products', async () => {
    mockUseSelector(mockProduct);
    mockGetRelatedProducts(
      new Promise((resolve) => setTimeout(() => resolve(mockRelatedProducts), 100))
    );

    render(<ProductPage />);

    expect(screen.getByText('You may also like')).toBeInTheDocument();

    expect(screen.queryByText(mockRelatedProducts[0].name)).not.toBeInTheDocument();
  });

  it('renders not found message when product does not exist', () => {
    mockUseSelector(undefined);

    render(<ProductPage />);

    expect(screen.getByText('Product not found')).toBeInTheDocument();
  });
});
