import React, { useEffect, useContext, useState } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";
import { filterDataFromWeatherAPI } from "../../utils/weatherApi";

const ToggleSwitch = ({}) => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  const [checked, setChecked] = useState(currentTemperatureUnit === "C");
  useEffect(() => setChecked(currentTemperatureUnit === "C"), [
    currentTemperatureUnit,
  ]);

  const handleChange = () => {
    setChecked(!checked);
    handleToggleSwitchChange();
  };

  return (
    // <div className="toggleSwitch__container">
    <>
      <input
        checked={checked}
        className="toggleSwitch"
        id={`toggleSwitch-new`}
        type="checkbox"
        onChange={handleChange}
        value={currentTemperatureUnit}
      ></input>
      <label
        className="toggleSwitch__label"
        htmlFor={`toggleSwitch-new`}
        style={{ background: checked && "#fff" }}
      >
        {/* <span className="sliderRound"></span> */}
        <span className="toggleSwitch-text">{"F C"}</span>
        <span className="toggleSwitch-button">{currentTemperatureUnit} </span>
      </label>
    </>
    // </div>
  );
};

export default ToggleSwitch;
