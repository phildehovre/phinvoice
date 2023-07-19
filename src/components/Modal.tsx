import React, { ReactNode, useEffect, useRef, useState } from "react";
import "./Modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, onSave }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(isOpen);

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = (): void => {
    setModalOpen(false);
    onClose();
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  if (!modalOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content" ref={modalRef}>
        <button className="modal-close" onClick={handleClose}>
          X
        </button>
        {children}
        <div className="modal-btn-ctn">
          <button className="modal-btn cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn confirm" onClick={onSave}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
