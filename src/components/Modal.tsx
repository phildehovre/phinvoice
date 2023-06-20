import React, { useEffect, useRef } from 'react';

function Modal(props: {
  children: React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
}) {
  const { children, onSave, onCancel } = props;
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        onCancel();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onCancel]);

  return (
    <>
      <div className="nodal-bkg"></div>
      <div className="modal-content" ref={modalContentRef}>
        {children}
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onSave}>Save</button>
      </div>
    </>
  );
}

export default Modal;
