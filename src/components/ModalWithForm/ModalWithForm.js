import React from "react";
import "./ModalWithForm.css";
import closeButtonWithFormPath from "../../images/closeButtonImageFormModal.png";

function ModalWithForm({
  title,
  buttonLabel,
  onClose,
  children,
  onSubmit,
  buttonClass,
  containerClass,
}) {
  React.useEffect(() => {
    document.addEventListener("keydown", onClose);

    return () => {
      document.removeEventListener("keydown", onClose);
    };
  }, [onClose]);

  return (
    <div className={"modalWithForm__wrapper"} onClick={onClose}>
      <form className={containerClass || "ModalWithForm"} onSubmit={onSubmit}>
        <h2 className="ModalWithForm-heading">{title}</h2>
        <img
          className="ModalWithForm-close"
          onClick={onClose}
          src={closeButtonWithFormPath}
          alt="close"
        />
        {children}
        <button className={buttonClass || "ModalWithForm-button"} type="submit">
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
