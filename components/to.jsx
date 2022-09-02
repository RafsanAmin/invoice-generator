import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Styles from '../scss/to.module.scss';
import ELabel from './formUtil/eLabel';
import Input from './formUtil/input';
import TextArea from './formUtil/textarea';

function To() {
  const [d, dispatch] = useContext(AppContext);
  const data = d.to;
  return (
    <div className={Styles.supCont}>
      <div className={Styles.cont}>
        <div className={Styles.h2}>
          <ELabel
            val={d.title.to.main}
            hnd={(s) => {
              dispatch({ type: 'TITLE_2', form: 'to', field: 'main', data: s });
            }}
            style={{
              margin: '0',
              fontSize: '1.3rem',
              color: 'hsl(342, 79%, 55%)',
            }}
          />
        </div>
        <div className={Styles.inputs}>
          <Input
            value={data.name}
            style={{
              fontSize: '1.2rem',
            }}
            setValue={(s) => dispatch({ type: 'INPUT_2', form: 'to', field: 'name', data: s })}
            placeholder="Client Name"
            label={d.title.to.name}
            labH={(s) => dispatch({ type: 'TITLE_2', form: 'to', field: 'name', data: s })}
          />{' '}
          <Input
            value={data.id}
            style={{
              fontSize: '1.2rem',
            }}
            setValue={(s) => dispatch({ type: 'INPUT_2', form: 'to', field: 'id', data: s })}
            placeholder="Client Id"
            label={d.title.to.id}
            labH={(s) => dispatch({ type: 'TITLE_2', form: 'to', field: 'id', data: s })}
          />
          <Input
            value={data.email}
            style={{
              fontSize: '1.2rem',
            }}
            setValue={(s) => dispatch({ type: 'INPUT_2', form: 'to', field: 'email', data: s })}
            placeholder="Email"
            label={d.title.to.email}
            labH={(s) => dispatch({ type: 'TITLE_2', form: 'to', field: 'email', data: s })}
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
          label={d.title.to.address}
          labH={(s) => dispatch({ type: 'TITLE_2', form: 'to', field: 'address', data: s })}
        />{' '}
      </div>
    </div>
  );
}

export default To;
