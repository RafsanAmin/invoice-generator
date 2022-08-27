import React from 'react';
import Styles from '../../scss/text.module.scss';

function Input({ value, setValue, placeholder, style, label, type, readOnly }) {
  return (
    <div className={Styles.cont}>
      {label ? <p>{label}</p> : null}
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
  );
}

export default Input;
