import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import Styles from '../../scss/adjuster.module.scss';
import Input from './input';

function Radio({ state, setState, text }) {
  return (
    <div onClick={setState} className={Styles.RadioCont}>
      <div className={`${state ? Styles.radioOn : Styles.radioOff} ${Styles.radio}`} />
      <span>{text}</span>
    </div>
  );
}

function Adjuster({ name, header }) {
  const [d, dispatch] = useContext(AppContext);
  const { perc, amount } = d[name];
  console.log(d, name, perc >= 0);
  const perce = perc !== null && perc >= 0;
  return (
    <div className={Styles.cont}>
      <h2>{header}</h2>
      <div className={Styles.inner}>
        <div className={Styles.radioGroup}>
          <Radio
            state={perce}
            setState={() => {
              dispatch({ type: 'PERC_SET', field: name, perc: perce ? perc : 0 });
            }}
            text="Percent"
          />
          <Radio
            state={!perce}
            setState={() => {
              dispatch({ type: 'PERC_SET', field: name, perc: null });
            }}
            text="Fixed"
          />
        </div>
        <Input
          readOnly={!perce}
          placeholder="Give your percentage"
          value={perc || 0}
          setValue={(e) => {
            if (!Number.isNaN(Number(e)) && Number(e) >= 0 && Number(e) <= 100) {
              dispatch({ type: 'PERC_SET', field: name, perc: Number(e) });
            }
          }}
          contStyle={{
            opacity: !perce ? 0.4 : 1,
          }}
          prefix="%"
        />
      </div>
      <Input
        readOnly={perce}
        placeholder=""
        value={amount}
        contStyle={{ fontSize: '1.4rem' }}
        style={{
          borderWidth: perce ? '0px' : '1px',
          fontSize: '1.4rem',
          fontWeight: '600',
          textAlign: 'right',
        }}
        prefix="$"
        setValue={(e) => {
          if (!Number.isNaN(Number(e)) || Number(e) >= 0) {
            dispatch({ type: 'AMNT_SET', field: name, amount: Number(e) });
          }
        }}
      />
    </div>
  );
}

export default Adjuster;
