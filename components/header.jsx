import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Styles from '../scss/header.module.scss';
import Input from './formUtil/input';

function Header() {
  const [d, dispatch] = useContext(AppContext);
  return (
    <div>
      <h2 className={Styles.h2}>INVOICE</h2>
      <Input value={d.id} label="Invoice Number:" readOnly />
      <Input
        value={d.date}
        setValue={(s) => dispatch({ type: 'INPUT_1', field: 'date', data: s })}
        type="date"
        label="Invoice Date:"
      />
    </div>
  );
}

export default Header;
