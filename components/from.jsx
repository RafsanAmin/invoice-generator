import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Styles from '../scss/from.module.scss';
import Input from './formUtil/input';
import TextArea from './formUtil/textarea';

function From() {
  const [d, dispatch] = useContext(AppContext);
  const data = d.from;
  return (
    <div className={Styles.cont}>
      <div className={Styles.logo}>
        <img style={{ width: '100%' }} src="/l.png" alt="" />
      </div>
      <div className={Styles.inputs}>
        <Input
          value={data.name}
          setValue={(s) => dispatch({ type: 'INPUT_2', form: 'from', field: 'name', data: s })}
          style={{
            fontSize: '1.4rem',
            fontWeight: '600',
          }}
          placeholder="Company Name"
        />
        <TextArea
          rows={{ min: 4, max: 4, lineH: 18 }}
          value={data.address}
          setValue={(s) => dispatch({ type: 'INPUT_2', form: 'from', field: 'address', data: s })}
          placeholder="Address"
          label="Address"
        />
        <Input
          value={data.email}
          setValue={(s) => dispatch({ type: 'INPUT_2', form: 'from', field: 'email', data: s })}
          placeholder="E-mail"
          label="E-mail"
        />
        <Input
          value={data.id}
          setValue={(s) => dispatch({ type: 'INPUT_2', form: 'from', field: 'id', data: s })}
          readOnly
          label="Retailer Id. (Auto Generated)"
        />
      </div>
    </div>
  );
}

export default From;
