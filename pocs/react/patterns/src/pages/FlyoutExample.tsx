import React from 'react';
import {FlyOut} from '../components/FlyOut';

const FlyoutExample = () => (
  <FlyOut>
    <FlyOut.Toggle>Toggle Menu</FlyOut.Toggle>
    <FlyOut.List>
      <FlyOut.Item>Edit</FlyOut.Item>
      <FlyOut.Item>Delete</FlyOut.Item>
    </FlyOut.List>
  </FlyOut>
);

export default FlyoutExample;
