/* eslint-disable no-bitwise */
import { useEffect, useRef, useState } from 'react';
import Styles from '../../scss/text.module.scss';

const textArea = ({ rows, value, setValue, placeholder, limit, update, label }) => {
  const [oflow, setOflow] = useState(false);
  const Ref = useRef();
  const handleTextArea = (e) => {
    const prevRows = e.target.rows;
    setOflow(false);
    e.target.rows = rows.min;
    const currentRows = ~~(e.target.scrollHeight / rows.lineH);
    if (currentRows === prevRows) {
      e.target.rows = currentRows;
    } else if (currentRows > rows.max) {
      setOflow(true);
      e.target.rows = rows.max;
    } else if (currentRows > rows.min) {
      e.target.rows = currentRows;
    }
    setValue(e.target.value);
  };
  useEffect(() => {
    Ref.current.focus();
    Ref.current.blur();
  }, [update]);
  return (
    <div className={Styles.cont}>
      <p>{label}</p>
      <textarea
        className={`${Styles.input} ${Styles.textarea}`}
        ref={Ref}
        style={oflow ? { overflowY: 'scroll' } : { overflowY: 'hidden' }}
        rows={rows.min}
        value={value}
        onFocus={handleTextArea}
        onChange={handleTextArea}
        onMouseEnter={handleTextArea}
        placeholder={placeholder}
        maxLength={limit || 1000}
      />
    </div>
  );
};

export default textArea;
