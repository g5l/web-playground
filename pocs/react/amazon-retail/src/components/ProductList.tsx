import { SimpleGrid, Container } from '@mantine/core';
import { ProductCard } from './ProductCard';
import { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <Container size="lg" py="xl">
      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 4 }}
        spacing={{ base: 'sm', sm: 'md', lg: 'lg' }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
}; 