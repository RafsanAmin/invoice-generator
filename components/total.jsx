import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Styles from '../scss/total.module.scss';
import ELabel from './formUtil/eLabel';

function Total({ label, labH, value, size }) {
  const [d] = useContext(AppContext);
  return (
    <div className={Styles.cont}>
      <div className={Styles.inner}>
        <ELabel
          style={{
            fontSize: size === 'lg' ? '2rem' : '1.7rem',
            color: 'hsl(342, 79%, 55%)',
            textAlign: 'right',
          }}
          val={label}
          hnd={labH}
        />
        <h2
          style={{ fontSize: size === 'lg' ? '2rem' : '1.7rem' }}
          className={Styles.val}
        >{`${d.currency.symbol} ${value}`}</h2>
      </div>
    </div>
  );
}

export default Total;
