import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => (
  <div className="fullscreen flex justify-content--between align-items--center">
    <div className="fullwidth flex justify-content--center">
      <ClipLoader
        size={100}
        loading={true}
        color={'#506C9D'}
      />
    </div>
  </div>
);

export default Loader;