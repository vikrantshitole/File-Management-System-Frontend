import React, { useMemo } from 'react';
import { X } from 'react-feather';
import './Modal.scss';
import ReactDOM from 'react-dom';

const Modal = React.memo(({ isOpen, onClose, title, children, footer, height = 'auto' }) => {
  if (!isOpen) return null;

  const modalContent = useMemo(() => (
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
    </div>
  ), [isOpen, title, children, footer, height, onClose]);

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root')
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.title === nextProps.title &&
    prevProps.height === nextProps.height &&
    prevProps.children === nextProps.children &&
    prevProps.footer === nextProps.footer
  );
});

Modal.displayName = 'Modal';

export default Modal;
