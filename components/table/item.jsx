/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import Styles from '../../scss/table.module.scss';
import FileHandler from '../formUtil/fileHandler';
import Input from '../formUtil/input';
import TextArea from '../formUtil/textarea';

function Item({ index }) {
  const [d, dispatch] = useContext(AppContext);
  const { desc, quan, unit, uPrice, tPrice } = d.items[index];
  const Delete = (e) => {
    e.stopPropagation();
    dispatch({ type: 'ITEM_DEL', index });
  };
  useEffect(() => {
    dispatch({ type: 'ITEM_EDIT', index, field: 'tPrice', data: quan * uPrice });
  }, [quan, uPrice]);
  return (
    <div className={Styles.itemCont}>
      <div className={`${Styles.grid} ${Styles.item}`}>
        <div
          style={{
            textAlign: 'left',
            paddingInlineStart: '1.7rem',
          }}
        >
          <TextArea
            rows={{ min: 4, max: 10, lineH: 25 }}
            value={desc}
            setValue={(s) => dispatch({ type: 'ITEM_EDIT', index, field: 'desc', data: s })}
            placeholder="Description"
          />
        </div>
        <div>
          <FileHandler
            photo={d.photos.items[index]}
            handler={(e) => {
              dispatch({ type: 'ADD_PHOTO_ITEM', index, file: e });
            }}
            del={() => {
              dispatch({ type: 'DEL_PHOTO_ITEM', index });
            }}
          />
        </div>
        <div>
          <Input
            value={quan}
            setValue={(s) => {
              Number(s) < 0 || Number.isNaN(Number(s))
                ? dispatch({ type: 'ITEM_EDIT', index, field: 'quan', data: quan })
                : dispatch({ type: 'ITEM_EDIT', index, field: 'quan', data: s });
            }}
          />
        </div>
        <div>
          <Input
            value={unit}
            setValue={(s) => {
              dispatch({ type: 'ITEM_EDIT', index, field: 'unit', data: s });
            }}
          />
        </div>
        <div>
          <Input
            prefix={d.currency.symbol}
            value={`${uPrice}`}
            style={{ textAlign: 'right' }}
            setValue={(s) => {
              Number(s) < 0 || Number.isNaN(Number(s))
                ? dispatch({ type: 'ITEM_EDIT', index, field: 'uPrice', data: 0 })
                : dispatch({ type: 'ITEM_EDIT', index, field: 'uPrice', data: s });
            }}
          />
        </div>
        <Input
          prefix={d.currency.symbol}
          style={{ textAlign: 'right' }}
          value={`${tPrice}`}
          setValue={() => {}}
          readOnly
        />
      </div>
      <div className={`${Styles.button}`}>
        <button type="button" onClick={Delete}>
          <i className="fas fa-trash-alt" />
        </button>
      </div>
    </div>
  );
}

export default Item;
