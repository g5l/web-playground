import {Container, Divider, Grid, Group, Image, Rating, Stack, Text, Title} from '@mantine/core';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {ProductList} from '../components/ProductList.tsx';
import {getRelatedProducts} from '../services/productService.ts';
import {RootState} from '../store';
import {Product} from '../types/product';

export const ProductPage = () => {
  const {id} = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.items.find(p => p.id === id)
  );
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (product) {
      getRelatedProducts(product.category, product.id)
        .then(({data}) => setRelatedProducts(data || []));
    }
  }, [product]);

  if (!product) {
    return <Container>Product not found</Container>;
  }

  return (
    <Container size="lg" py="xl">
      <Grid>
        <Grid.Col span={{base: 12, md: 6}}>
          <Image
            src={product.image}
            height={400}
            fit="contain"
            alt={product.name}
          />
        </Grid.Col>
        <Grid.Col span={{base: 12, md: 6}}>
          <Stack gap="md">
            <Title order={1}>{product.name}</Title>
            <Group>
              <Rating value={product.rating} readOnly fractions={2}/>
              <Text c="dimmed">({product.rating.toFixed(1)})</Text>
            </Group>
            <Text size="xl" fw={700} c="blue">
              ${product.price.toFixed(2)}
            </Text>
            <Text>{product.description}</Text>
          </Stack>
        </Grid.Col>
      </Grid>

      <Divider my="xl"/>

      <Stack gap="xl">
        <Title order={2}>You may also like</Title>
        <ProductList products={relatedProducts}/>
      </Stack>
    </Container>
  );
}; 