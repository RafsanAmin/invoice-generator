import React from 'react';
import Styles from '../../scss/table.module.scss';

function Head() {
  return (
    <div className={`${Styles.grid} ${Styles.head}`}>
      <div>
        <p>Product Description</p>
      </div>
      <div>
        <p>Photo</p>
      </div>
      <div>
        <p>Quantity</p>
      </div>
      <div>
        <p>Unit</p>
      </div>
      <div>
        <p>Unit Price</p>
      </div>
      <div>
        <p>Total Price</p>
      </div>
    </div>
  );
}

export default Head;
