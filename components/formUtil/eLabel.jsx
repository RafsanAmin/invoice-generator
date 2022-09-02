import React from 'react';
import Styles from '../../scss/text.module.scss';

function ELabel({ val, hnd, style }) {
  return (
    <div className={Styles.eLabel}>
      <input
        style={style}
        value={val}
        onChange={(e) => {
          hnd(e.target.value);
        }}
      />
    </div>
  );
}

export default ELabel;
