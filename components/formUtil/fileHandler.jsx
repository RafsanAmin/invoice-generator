import React, { useRef, useState } from 'react';
import Styles from '../../scss/fileHandler.module.scss';

function FileHandler({ photo, handler, del, placeholder }) {
  const [isDrag, setIsDrag] = useState(false);
  const FileRef = useRef();

  return (
    <div
      className={`${Styles.cont} ${isDrag ? Styles.on : ''}`}
      style={{ height: '100%' }}
      onClick={() => {
        FileRef.current.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDrag(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDrag(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDrag(false);
        handler(e.dataTransfer.files[0]);
      }}
    >
      {!photo ? (
        <div>
          <i className={`fas fa-images ${Styles.mainIcon}`} />
          <span>{placeholder || 'Add Your Image'}</span>
        </div>
      ) : (
        <>
          <img src={URL.createObjectURL(photo)} alt="" />
          <div className={Styles.cut}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                del();
              }}
              type="button"
            >
              <i className="fas fa-times" />
            </button>
          </div>
        </>
      )}
      <input
        onChange={(e) => {
          handler(e.target.files[0]);
        }}
        style={{ pointerEvents: 'none' }}
        ref={FileRef}
        type="file"
        hidden
        accept="image/png, image/jpeg"
      />
    </div>
  );
}

export default FileHandler;
