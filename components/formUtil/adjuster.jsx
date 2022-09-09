import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';
import Styles from '../../scss/adjuster.module.scss';
import ELabel from './eLabel';
import Input from './input';

function Radio({ state, setState, text }) {
  return (
    <div onClick={setState} className={Styles.RadioCont}>
      <div className={`${state ? Styles.radioOn : Styles.radioOff} ${Styles.radio}`} />
      <span>{text}</span>
    </div>
  );
}

function Adjuster({ name, label, labH }) {
  const [d, dispatch] = useContext(AppContext);
  const { perc, amount } = d[name];
  const perce = perc !== null && perc >= 0;
  return (
    <div className={Styles.cont}>
      <ELabel
        style={{
          fontSize: '1.2rem',
        }}
        val={label}
        hnd={labH}
      />
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
            if (!(Number.isNaN(Number(e)) || Number(e) < 0 || Number(e) > 100)) {
              dispatch({ type: 'PERC_SET', field: name, perc: e });
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
        prefix={d.currency.symbol}
        setValue={(e) => {
          if (!Number.isNaN(Number(e)) || Number(e) >= 0) {
            dispatch({ type: 'AMNT_SET', field: name, amount: e });
          }
        }}
      />
    </div>
  );
}

export default Adjuster;
