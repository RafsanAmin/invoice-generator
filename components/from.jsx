import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Styles from '../scss/from.module.scss';
import Input from './form/input';

function From() {
  const [d, dispatch] = useContext(AppContext);
  const data = d.from;
  return (
    <div className={Styles.cont}>
      <div className={Styles.logo} />
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
        <Input
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
          label="Retailer Id."
        />
        <Input
          value={d.date}
          setValue={(s) => dispatch({ type: 'INPUT_1', field: 'date', data: s })}
          type="date"
          label="Retailer Id."
        />
      </div>
    </div>
  );
}

export default From;
