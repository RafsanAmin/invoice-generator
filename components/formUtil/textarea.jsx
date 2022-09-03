/* eslint-disable no-bitwise */
import { useEffect, useRef, useState } from 'react';
import Styles from '../../scss/text.module.scss';
import ELabel from './eLabel';

function TextArea({ rows, value, setValue, placeholder, limit, label, style, labH }) {
  const [oflow, setOflow] = useState(false);
  const heights = {
    min: rows.min * rows.lineH,
    max: rows.max * rows.lineH,
  };
  const Ref = useRef();
  const handleTextArea = (e) => {
    const prevH = e.target.style.height;
    const scroll = window.scrollY;
    const setHeight = (s) => {
      e.target.style.height = `${s}px`;
    };
    setHeight(heights.min);
    setOflow(false);
    const currentH = e.target.scrollHeight;
    console.log(currentH);
    if (currentH > heights.max) {
      setOflow(true);
      setHeight(heights.max);
    } else if (currentH <= heights.min) {
      setHeight(heights.min);
    } else if (currentH > heights.min || currentH === prevH) {
      setHeight(currentH);
    }
    window.scrollTo(0, scroll);
    setValue(e.target.value);
  };

  useEffect(() => {
    Ref.current.focus();
    Ref.current.blur();
  }, []);

  return (
    <div className={Styles.cont}>
      {label || labH ? <ELabel val={label} hnd={labH} /> : null}
      <textarea
        className={`${Styles.input} ${Styles.textarea}`}
        ref={Ref}
        style={
          oflow
            ? { overflowY: 'scroll', ...style, height: `${heights.min}px` }
            : { overflowY: 'hidden', ...style, height: `${heights.min}px` }
        }
        value={value}
        onChange={handleTextArea}
        onKeyUp={handleTextArea}
        placeholder={placeholder}
        maxLength={limit || 1000}
      />
    </div>
  );
}

export default TextArea;
