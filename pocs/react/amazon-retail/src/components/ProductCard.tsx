import { Card, Image, Text, Badge, Group, Rating } from '@mantine/core';
import { Product } from '../types/product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder component={Link} to={`/product/${product.id}`}>
      <Card.Section>
        <Image
          src={product.image}
          height={160}
          alt={product.name}
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{product.name}</Text>
        <Badge color="blue" variant="light">
          ${product.price.toFixed(2)}
        </Badge>
      </Group>

      <Text size="sm" c="dimmed" lineClamp={2}>
        {product.description}
      </Text>

      <Group justify="flex-start" mt="md">
        <Rating value={product.rating} readOnly fractions={2} />
        <Text size="sm" c="dimmed">
          {product.rating.toFixed(1)}
        </Text>
      </Group>
    </Card>
  );
}; 