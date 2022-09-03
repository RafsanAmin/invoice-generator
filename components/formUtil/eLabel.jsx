import React from 'react';
import Styles from '../../scss/text.module.scss';

function ELabel({ val, hnd, style, readOnly }) {
  return (
    <div className={Styles.eLabel}>
      <input
        style={style}
        value={val}
        onChange={(e) => {
          hnd(e.target.value);
        }}
        readOnly={readOnly || false}
      />
    </div>
  );
}

export default ELabel;
