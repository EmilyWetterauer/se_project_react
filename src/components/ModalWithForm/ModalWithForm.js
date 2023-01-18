import React from "react";
import "./ModalWithForm.css";
import closeButtonWithFormPath from "../../images/closeButtonImageFormModal.png";

function ModalWithForm({ title, buttonLabel, onClose, children, onSubmit }) {
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return (
    <>
      <div className="modalWithForm__wrapper" onClick={onClose}>
        <form className="ModalWithForm" onSubmit={onSubmit}>
          <p className="ModalWithForm-heading">{title}</p>
          <img
            className="ModalWithForm-close"
            onClick={onClose}
            src={closeButtonWithFormPath}
            alt="close"
          />
          {children}
          <button className="ModalWithForm-button" type="submit">
            {buttonLabel}
          </button>
        </form>
        {/* <button
            className="modalWithForm__closeButton"
            src={closeButtonWithFormPath}
            onClick={onClose}
          ></button> */}
      </div>
    </>
  );
}

export default ModalWithForm;
