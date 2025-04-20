import React from 'react';
import { X } from 'react-feather';
import './Modal.scss';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, footer, height = 'auto' }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal" style={{ height }}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-content">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
