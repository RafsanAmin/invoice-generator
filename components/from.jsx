import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Styles from '../scss/from.module.scss';
import FileHandler from './formUtil/fileHandler';
import Input from './formUtil/input';
import TextArea from './formUtil/textarea';

function From() {
  const [d, dispatch] = useContext(AppContext);
  const data = d.from;
  return (
    <div className={Styles.cont}>
      <div className={Styles.logo}>
        <FileHandler
          photo={d.photos.logo}
          handler={(e) => {
            dispatch({ type: 'ADD_LOGO', file: e });
          }}
          del={() => {
            dispatch({ type: 'DEL_LOGO' });
          }}
          placeholder="Add You Logo"
        />
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
          label={d.title.from.address}
          labH={(s) => dispatch({ type: 'TITLE_2', form: 'from', field: 'address', data: s })}
        />
        <Input
          value={data.email}
          setValue={(s) => dispatch({ type: 'INPUT_2', form: 'from', field: 'email', data: s })}
          label={d.title.from.email}
          labH={(s) => dispatch({ type: 'TITLE_2', form: 'from', field: 'email', data: s })}
        />
        <Input
          value={data.id}
          setValue={(s) => dispatch({ type: 'INPUT_2', form: 'from', field: 'id', data: s })}
          label={d.title.from.id}
          labH={(s) => dispatch({ type: 'TITLE_2', form: 'from', field: 'id', data: s })}
        />
      </div>
    </div>
  );
}

export default From;
