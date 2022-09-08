import React from 'react';
import Styles from '../scss/loading.module.scss';

function Loading({ children, state }) {
  return state ? (
    <div className={Styles.cont}>
      <div className={Styles.load}>
        <div>
          <i className="fa-solid fa-spinner" />
          <h3>Processing</h3>
        </div>
      </div>
      {children}
    </div>
  ) : (
    children
  );
}

export default Loading;
