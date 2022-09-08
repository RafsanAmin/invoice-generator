import React from 'react';
import Styles from '../../scss/text.module.scss';
import ELabel from './eLabel';

function Input({
  value,
  setValue,
  placeholder,
  style,
  label,
  type,
  readOnly,
  prefix,
  contStyle,
  labH,
}) {
  return (
    <div style={contStyle} className={Styles.cont}>
      {label || labH ? <ELabel val={label} hnd={labH} /> : null}
      <div>
        <span>{prefix}</span>
        <input
          style={style}
          className={Styles.input}
          type={type || 'text'}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={placeholder}
          readOnly={readOnly || false}
        />
      </div>
    </div>
  );
}

export default Input;
