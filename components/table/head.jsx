import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import Styles from '../../scss/table.module.scss';
import ELabel from '../formUtil/eLabel';

function Head() {
  const [d, dispatch] = useContext(AppContext);
  const data = d.title.items;
  const style = {
    color: '#fff',
    fontWeight: '600',
    backgroundColor: 'transparent',
    textAlign: 'center',
    height: 'calc(100% - 1.5rem)',
    margin: '0.75rem 0',
  };
  return (
    <div className={`${Styles.grid} ${Styles.head}`}>
      <ELabel
        style={style}
        val={data.desc}
        hnd={(s) => dispatch({ type: 'TITLE_2', form: 'items', field: 'desc', data: s })}
      />
      {/* <div>
        <p>Product Description</p>
      </div> */}
      <ELabel
        style={style}
        val={data.photo}
        hnd={(s) => dispatch({ type: 'TITLE_2', form: 'items', field: 'photo', data: s })}
      />
      <ELabel
        style={style}
        val={data.quan}
        hnd={(s) => dispatch({ type: 'TITLE_2', form: 'items', field: 'quan', data: s })}
      />
      <ELabel
        style={style}
        val={data.unit}
        hnd={(s) => dispatch({ type: 'TITLE_2', form: 'items', field: 'unit', data: s })}
      />
      <ELabel
        style={style}
        val={data.uPrice}
        hnd={(s) => dispatch({ type: 'TITLE_2', form: 'items', field: 'uPrice', data: s })}
      />
      <ELabel
        style={style}
        val={data.tPrice}
        hnd={(s) => dispatch({ type: 'TITLE_2', form: 'items', field: 'tPrice', data: s })}
      />
    </div>
  );
}

export default Head;
