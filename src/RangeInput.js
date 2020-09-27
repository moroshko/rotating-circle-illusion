import React from "react";
import { Range, getTrackBackground } from "react-range";
import styles from "./RangeInput.module.css";

function RangeInput({ min, max, step = 1, value, onChange }) {
  return (
    <Range
      min={min}
      max={max}
      step={step}
      values={[value]}
      onChange={([linesCount]) => {
        onChange(linesCount);
      }}
      renderTrack={({ props, children }) => {
        const { style, ...restProps } = props;

        return (
          <div
            className={styles.track}
            {...restProps}
            style={{
              ...style,
              background: getTrackBackground({
                min,
                max,
                values: [value],
                colors: ["rgba(17, 138, 178, 1)", "rgba(17, 138, 178, 0.5)"],
              }),
            }}
          >
            {children}
          </div>
        );
      }}
      renderThumb={({ props }) => <div className={styles.thumb} {...props} />}
    />
  );
}

export default RangeInput;
