import React from 'react';
import Styles from '../../scss/select.module.scss';

function Select({ list }) {
  return (
    <select className={Styles.select}>
      {list.map((dt) => (
        <option key={Math.random()} value={dt[0]}>
          {dt[1]}
        </option>
      ))}
    </select>
  );
}

export default Select;
