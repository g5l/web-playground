import React from 'react';
import {FlyOut} from '../components/FlyOut';
import './FlyoutExample.css';

const IMAGES = [
  'https://picsum.photos/id/1025/400/300',
  'https://picsum.photos/id/1062/400/300',
  'https://picsum.photos/id/237/400/300',
  'https://picsum.photos/id/1003/400/300',
  'https://picsum.photos/id/1074/400/300',
];

const FlyoutExample = () => (
  <div className="image-grid">
    {IMAGES.map((src, i) => (
      <div className="image-item" key={i}>
        <img src={src} />
        <FlyOut>
          <FlyOut.Toggle>
            ⋯
          </FlyOut.Toggle>
          <FlyOut.List>
            <FlyOut.Item onClick={() => alert('Edit clicked')}>Edit</FlyOut.Item>
            <FlyOut.Item onClick={() => alert('Delete clicked')}>Delete</FlyOut.Item>
          </FlyOut.List>
        </FlyOut>
      </div>
    ))}
  </div>
);

export default FlyoutExample;
