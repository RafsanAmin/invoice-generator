import React from 'react';
import Styles from '../scss/total.module.scss';

function Total({ title, value, size }) {
  return (
    <div className={Styles.cont}>
      <div className={Styles.inner}>
        <h2 style={{ fontSize: size === 'lg' ? '2rem' : '1.7rem' }} className={Styles.title}>
          {title}
        </h2>
        <h2
          style={{ fontSize: size === 'lg' ? '2rem' : '1.7rem' }}
          className={Styles.val}
        >{`$ ${value}`}</h2>
      </div>
    </div>
  );
}

export default Total;
