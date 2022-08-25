import React, { useEffect, useReducer } from 'react';
import From from '../components/from';
import AppContext from '../context/AppContext';
import init from '../util/init';

const app = () => {
  const appState = useReducer((prev, action) => {
    const t = prev[action.form];
    const f = { ...prev };
    switch (action.type) {
      case 'INPUT_1':
        return { ...prev, [action.field]: [action.data] };
      case 'INPUT_2':
        return {
          ...prev,
          [action.form]: {
            ...t,
            [action.field]: action.data,
          },
        };
      case 'ITEM_DEL':
        f.items.splice(action.index, 1);
        return f;
      case 'ITEM_ADD':
        f.items.push(action.data);
        return f;
      case 'ITEM_EDIT':
        f.items.splice(action.index, 1, action.data);
        return f;
      default:
        return prev;
    }
  }, init);
  const [data] = appState;
  useEffect(() => {
    console.dir(data);
  }, [data]);
  return (
    <div>
      <AppContext.Provider value={appState}>
        <br />
        <From />
        <p>See in Console</p>
      </AppContext.Provider>
    </div>
  );
};

export default app;
