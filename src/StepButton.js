import React from "react";
import styles from "./StepButton.module.css";

function StepButton({ isPlus, disabled, onClick }) {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      <svg
        className={styles.svg}
        width="32"
        height="32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 15 15"
      >
        <path
          d={
            isPlus
              ? "M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
              : "M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
          }
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
}

export default StepButton;
