import { useState } from "react";
import styles from "../styles/components/CustomDropdown.module.scss";

const CustomDropdown = ({ options, setSelected, setDropdownStatus, type }) => {
  const handleClick = (option) => {
    setSelected(option);
    setDropdownStatus((prev) => {
      return { ...prev, [type]: false };
    });
  };
  return (
    <div className={styles.options}>
      {options.map((option) => (
        <div
          className={styles.option}
          onClick={() => handleClick(option)}
          key={option}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default CustomDropdown;
