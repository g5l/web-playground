import { TextInput, Container } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/products/productsSlice';

export const SearchBar = () => {
  const dispatch = useDispatch();

  const handleSearch = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <Container size="lg" py="md">
      <TextInput
        placeholder="Search products..."
        leftSection={<IconSearch size="1.1rem" stroke={1.5} />}
        size="md"
        radius="md"
        onChange={(event) => handleSearch(event.currentTarget.value)}
      />
    </Container>
  );
}; 