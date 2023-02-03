import React, { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [weatherType, setWeatherType] = useState("");

  function handleNameOnChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkOnChange(evt) {
    setLink(evt.target.value);
  }

  function handleWeatherTypeOnChange(evt) {
    setWeatherType(evt.target.value);
  }

  function handleSubmit(evt) {
    // prevent default behavior
    evt.preventDefault();

    // call onAddItem with appropriate arguments
    onAddItem(name, link, weatherType);
  }

  return (
    <ModalWithForm
      title={"New garment"}
      buttonLabel={"Add garment"}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="clothing-name" className="ModalWithForm-heading">
        Name
        <input
          type="text"
          name="name"
          id="clothing-name"
          className="ModalWithForm-input modal__input_type_card-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameOnChange}
        />
        <span className="modal-error" id="clothing-name-error"></span>
      </label>
      <label htmlFor="clothing-link" className="ModalWithForm-heading">
        Image
        <input
          type="url"
          name="link"
          id="clothing-link"
          className="ModalWithForm-input modal__input_type_url"
          placeholder="Image URL"
          required
          onChange={handleLinkOnChange}
        />
        <span className="modal__error" id="clothing-link-error"></span>
      </label>
      <p className="modalWithForm__subTitle">Select the weather type:</p>
      <div className="modal__input modal__input_type_radio">
        <div>
          <input
            type="radio"
            id="choiceHot"
            name="weatherType"
            value="hot"
            onChange={handleWeatherTypeOnChange}
          />
          <label className="modal__label_radio" htmlFor="choiceHot">
            Hot
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="choiceWarm"
            name="weatherType"
            value="warm"
            onChange={handleWeatherTypeOnChange}
          />
          <label className="modal__label_radio" htmlFor="choiceWarm">
            Warm
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="choiceCold"
            name="weatherType"
            value="cold"
            onChange={handleWeatherTypeOnChange}
          />
          <label className="modal__label_radio" htmlFor="choiceCold">
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
