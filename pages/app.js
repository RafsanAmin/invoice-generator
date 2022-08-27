import React, { useEffect, useReducer } from 'react';
import Select from '../components/formUtil/select';
import From from '../components/from';
import Header from '../components/header';
import Table from '../components/table/table';
import To from '../components/to';
import AppContext from '../context/AppContext';
import Styles from '../scss/app.module.scss';
import debounce from '../util/debounce';
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
        debounce(() => {
          f.items.push({
            desc: '',
            quan: 0,
            unit: '',
            uPrice: 0,
            tPrice: 0,
          });
        });
        return f;
      case 'ITEM_EDIT':
        f.items[action.index][action.field] = action.data;
        return f;
      default:
        return prev;
    }
  }, init);
  useEffect(() => {
    appState[1]({ type: 'ITEM_ADD' });
  }, []);
  // const [data] = appState;
  return (
    <div className={Styles.supCont}>
      <AppContext.Provider value={appState}>
        <div className={Styles.cont}>
          <div className={Styles.top}>
            <From />
            <Header />
          </div>
          <To />
          <Select
            list={[
              ['s', 's'],
              ['d', 'd'],
            ]}
          />
          <Table />
        </div>
        <p>See in Console</p>
      </AppContext.Provider>
    </div>
  );
};

export default app;
