import React, { ReactElement } from 'react';

import { IconTimes } from './icons/Times';

interface Props {
  message: null | string;
  changeMessage: (value: null | string) => void;
}

export default function Modal({ message, changeMessage }: Props): ReactElement {
  function closeModal() {
    changeMessage(null);
  }

  return (
    <div className={`modal ${message && 'modal--active'}`}>
      <span className="backdrop" onClick={closeModal} />
      <div className="modal-box">
        <div className="header">
          <p className="title text-2xl">Alert!</p>
          <button className="close-btn" onClick={closeModal}>
            <IconTimes />
          </button>
        </div>
        <p className="message text-lg">{message || ''}</p>
      </div>
    </div>
  );
}
