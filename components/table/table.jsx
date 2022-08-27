import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import Styles from '../../scss/table.module.scss';
import Head from './head';
import Item from './item';

function Table() {
  const [d, dispatch] = useContext(AppContext);
  return (
    <div className={Styles.cont}>
      <Head />
      {d.items.map((data, index) => (
        <Item data={data} index={index} />
      ))}
      <button
        style={{ margin: '1rem 0', fontSize: '1.2rem', padding: '0.35rem 1rem' }}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: 'ITEM_ADD' });
        }}
      >
        <i className="fas fa-plus-circle" /> {'  '}Add Item
      </button>
    </div>
  );
}

export default Table;
