import React from 'react';
import { Grid, Box, Text } from '@mantine/core';
import { formatDate } from '../utils/dateUtils';


const WeekGrid= () => {

  return (
    <Box style={{ overflowX: 'auto' }}>
      <Grid gutter={0}>
        <Grid.Col span={1}>
          <Box p="xs" style={{ width: '100%', height: '200px', border: '1px solid black' }}></Box>
        </Grid.Col>
        {Array.from(Array(10).keys()).map((i) => (
          <Grid.Col span={1}>
            <Box p="xs" style={{ width: '100%', height: '200px', textAlign: 'center', border: '1px solid black' }}>
              <Text>{formatDate(new Date())}</Text>
            </Box>
          </Grid.Col>
        ))}
        
      </Grid>
    </Box>
  );
};

export default WeekGrid;