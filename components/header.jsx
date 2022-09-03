import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import ELabel from './formUtil/eLabel';
import Input from './formUtil/input';

function Header() {
  const [d, dispatch] = useContext(AppContext);
  return (
    <div>
      <ELabel
        val={d.title.main}
        hnd={(s) => {
          dispatch({ type: 'TITLE_1', field: 'main', data: s });
        }}
        style={{ margin: '0', fontSize: '2rem', color: 'hsl(342, 79%, 55%)', textAlign: 'right' }}
      />
      <Input
        value={d.id}
        setValue={(s) => dispatch({ type: 'INPUT_1', field: 'id', data: s })}
        label={d.title.id}
        labH={(s) => dispatch({ type: 'TITLE_1', field: 'id', data: s })}
      />
      <Input
        value={d.date}
        setValue={(s) => dispatch({ type: 'INPUT_1', field: 'date', data: s })}
        style={{ backgroundColor: '#fff' }}
        type="date"
        label={d.title.date}
        labH={(s) => dispatch({ type: 'TITLE_1', field: 'date', data: s })}
      />
    </div>
  );
}

export default Header;
