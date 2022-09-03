import React from 'react';
import Styles from '../../scss/select.module.scss';
import ELabel from './eLabel';

function Select({ list, handle, active }) {
  return (
    <>
      <ELabel val="Currency" hnd={() => {}} readOnly style={{ border: 0 }} />
      <select
        className={Styles.select}
        onChange={(e) => {
          handle(list[e.target.value][0], e.target.value);
        }}
      >
        {list.map((dt, index) => (
          <option key={Math.random()} value={index} selected={Number(active) === index}>
            {dt[1]}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
