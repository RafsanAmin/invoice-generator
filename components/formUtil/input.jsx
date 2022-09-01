import React from 'react';
import Styles from '../../scss/text.module.scss';

function Input({ value, setValue, placeholder, style, label, type, readOnly, prefix, contStyle }) {
  return (
    <div style={contStyle} className={Styles.cont}>
      {label ? <p>{label}</p> : null}
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
