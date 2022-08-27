import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Styles from '../scss/to.module.scss';
import Input from './formUtil/input';
import TextArea from './formUtil/textarea';

function To() {
  const [d, dispatch] = useContext(AppContext);
  const data = d.to;
  return (
    <div className={Styles.supCont}>
      <div className={Styles.cont}>
        <h2>Invoice To</h2>
        <div className={Styles.inputs}>
          <Input
            value={data.name}
            style={{
              fontSize: '1.2rem',
            }}
            setValue={(s) => dispatch({ type: 'INPUT_2', form: 'to', field: 'name', data: s })}
            placeholder="Client Name"
            label="Client Name"
          />{' '}
          <Input
            value={data.id}
            style={{
              fontSize: '1.2rem',
            }}
            setValue={(s) => dispatch({ type: 'INPUT_2', form: 'to', field: 'id', data: s })}
            placeholder="Client Id"
            label="Client Id (Auto Generated)"
            readOnly
          />
          <Input
            value={data.email}
            style={{
              fontSize: '1.2rem',
            }}
            setValue={(s) => dispatch({ type: 'INPUT_2', form: 'to', field: 'email', data: s })}
            placeholder="Email"
            label="Email"
          />
        </div>
        <TextArea
          value={data.address}
          rows={{
            min: 2,
            max: 2,
            lineH: '17px',
          }}
          style={{
            fontSize: '1.2rem',
          }}
          setValue={(s) => dispatch({ type: 'INPUT_2', form: 'to', field: 'address', data: s })}
          placeholder="Address"
          label="Address"
        />{' '}
      </div>
    </div>
  );
}

export default To;
