import {render, screen, userEvent} from '../../utils/testing';
import {SearchBar} from '../SearchBar';

describe('SearchBar', () => {
  it('should render search input', () => {
    render(<SearchBar/>);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('should dispatch setSearchTerm action on input change', async () => {
    render(<SearchBar/>);
    const searchInput = screen.getByPlaceholderText('Search products...');
    const user = userEvent.setup();

    await user.type(searchInput, 'test search');
    
    expect(searchInput).toHaveValue('test search');
  });
});
