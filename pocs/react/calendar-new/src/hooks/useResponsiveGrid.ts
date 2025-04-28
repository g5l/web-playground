import { useMediaQuery } from '@mantine/hooks';

interface GridConfig {
  cols: number;
  spacing: number;
}

export const useResponsiveGrid = (): GridConfig => {
  const isXs = useMediaQuery('(max-width: 576px)');
  const isSm = useMediaQuery('(max-width: 768px)');
  const isMd = useMediaQuery('(max-width: 992px)');

  if (isXs) {
    return {
      cols: 1,
      spacing: 8
    };
  } else if (isSm) {
    return {
      cols: 3,
      spacing: 12
    };
  } else if (isMd) {
    return {
      cols: 5,
      spacing: 16
    };
  } else {
    return {
      cols: 7,
      spacing: 20
    };
  }
};