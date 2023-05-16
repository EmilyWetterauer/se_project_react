import React from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../utils/customHooks";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange } = useForm({
    name: "",
    image: "",
    weatherType: "",
  });

  // const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values.name, values.image, values.weatherType);
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
          value={values.name}
          name="name"
          id="clothing-name"
          className="ModalWithForm-input modal__input_type_card-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
        />
        <span className="modal-error" id="clothing-name-error"></span>
      </label>
      <label htmlFor="clothing-link" className="ModalWithForm-heading">
        Image
        <input
          type="url"
          value={values.image}
          name="image"
          id="clothing-link"
          className="ModalWithForm-input modal__input_type_url"
          placeholder="Image URL"
          required
          onChange={handleChange}
        />
        <span className="modal__error" id="clothing-link-error"></span>
      </label>
      <p className="modalWithForm__subTitle">Select the weather type:</p>
      <div className="modal__input modal__input_type_radio">
        <div>
          <input
            type="radio"
            checked={values.weatherType === "hot"}
            id="choiceHot"
            name="weatherType"
            value="hot"
            onChange={handleChange}
          />
          <label className="modal__label_radio" htmlFor="choiceHot">
            Hot
          </label>
        </div>
        <div>
          <input
            type="radio"
            checked={values.weatherType === "warm"}
            id="choiceWarm"
            name="weatherType"
            value="warm"
            onChange={handleChange}
          />
          <label className="modal__label_radio" htmlFor="choiceWarm">
            Warm
          </label>
        </div>
        <div>
          <input
            type="radio"
            checked={values.weatherType === "cold"}
            id="choiceCold"
            name="weatherType"
            value="cold"
            onChange={handleChange}
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
