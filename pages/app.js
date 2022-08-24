import React, { useEffect, useReducer } from 'react';
import init from '../util/init';

const app = () => {
  const [data, dispatch] = useReducer((prev, action) => {
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
  const handle = () => {
    dispatch({
      type: 'ITEM_ADD',
      data: {
        desc: 'dsd',
        quan: 11121,
        unit: 'dsds',
        uPrice: 15400,
        tPrice: 135440,
      },
    });
  };
  useEffect(() => {
    console.dir(data);
  }, [data]);
  return (
    <div>
      <button onClick={handle} type="button">
        dsd
      </button>
      <p>See in Console</p>
    </div>
  );
};

export default app;
