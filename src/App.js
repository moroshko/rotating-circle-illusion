import React, { useState, useEffect, useRef } from "react";
import randomColor from "random-color";
import "../node_modules/focus-visible/dist/focus-visible.min.js";
import StepButton from "./StepButton";
import ToggleInput from "./ToggleInput";
import { range, getPoint, getCenterPoint, getProjectionPoint } from "./utils";
import styles from "./App.module.css";

function App() {
  const [svgSize, setSvgSize] = useState(null);
  const containerRef = useRef();
  const pointSize = 16;
  const pointRadius = pointSize / 2;
  const viewBox = `-${svgSize / 2} -${svgSize / 2} ${svgSize} ${svgSize}`;
  const radius = svgSize / 2 - pointRadius;
  const radiansOnLastSpeedChange = useRef(0);
  const [radians, setRadians] = useState(radiansOnLastSpeedChange.current);
  const radiansRef = useRef(radians);
  const point = getPoint({ radius, radians });
  const [linesCount, setLinesCount] = useState(1);
  const maxLinesCount = 36;
  const [showCenter, setShowCenter] = useState(false);
  const [speedValue, setSpeedValue] = useState(0);
  const [hasDifferentColors, setHasDifferentColors] = useState(false);
  const speed = (10 - speedValue) * 1000; // ms to complete full circle
  const speedRef = useRef(speed);
  const prevSpeedRef = useRef(speedRef.current);
  const rafRef = useRef();
  const randomColorsRef = useRef();
  const linesData = range(0, linesCount - 1).map((k) => {
    const p1radians = (k * Math.PI) / linesCount;
    const p1 = getPoint({ radius, radians: p1radians });
    const p2 = getPoint({ radius, radians: p1radians + Math.PI });
    const projection = getProjectionPoint({
      point,
      p1,
    });

    return {
      p1,
      p2,
      projection,
    };
  });
  const centerPoint = getCenterPoint(linesData);

  useEffect(() => {
    setSvgSize(containerRef.current.getBoundingClientRect().width * 0.7);
  }, []);

  useEffect(() => {
    randomColorsRef.current = range(1, maxLinesCount).map(() =>
      randomColor(0.75, 0.95).hexString()
    );
  }, [maxLinesCount]);

  // This is to avoid cancelling and restarting the animation frame
  // every time the speed or the radians change.
  useEffect(() => {
    speedRef.current = speed;
    radiansRef.current = radians;
  });

  useEffect(() => {
    let startTime;

    function animate(time) {
      if (startTime === undefined) {
        startTime = time;
      }

      if (speedRef.current !== prevSpeedRef.current) {
        radiansOnLastSpeedChange.current = radiansRef.current;
        prevSpeedRef.current = speedRef.current;
        startTime = time;
      }

      setRadians(
        radiansOnLastSpeedChange.current +
          (2 * Math.PI * (time - startTime)) / speedRef.current
      );

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Rotating circle illusion</h1>
        <a
          className={styles.githubLink}
          href="https://github.com/moroshko/rotating-circle-illusion"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 32 32"
            focusable="false"
            role="img"
            aria-label="GitHub"
          >
            <path
              d="M15.846 4C9.304 4 4 9.148 4 15.5c0 5.08 3.394 9.388 8.102 10.91.593.105.809-.25.809-.555 0-.273-.01-.996-.016-1.955-3.295.694-3.99-1.542-3.99-1.542-.54-1.329-1.316-1.682-1.316-1.682-1.076-.713.081-.7.081-.7 1.19.083 1.815 1.186 1.815 1.186 1.057 1.757 2.772 1.25 3.448.956.107-.743.413-1.25.752-1.538-2.63-.29-5.397-1.276-5.397-5.683 0-1.255.462-2.281 1.22-3.085-.122-.29-.529-1.46.116-3.043 0 0 .995-.31 3.258 1.179a11.67 11.67 0 012.966-.388c1.006.005 2.02.132 2.966.388 2.261-1.488 3.254-1.18 3.254-1.18.647 1.584.24 2.753.118 3.044.76.804 1.218 1.83 1.218 3.085 0 4.418-2.77 5.39-5.41 5.674.426.355.805 1.057.805 2.13 0 1.537-.015 2.777-.015 3.154 0 .308.214.665.815.553 4.703-1.524 8.095-5.83 8.095-10.908C27.694 9.148 22.39 4 15.846 4"
              fillRule="evenodd"
            ></path>
          </svg>
        </a>
      </header>
      {svgSize !== null && (
        <>
          <svg
            className={styles.svg}
            width={svgSize}
            height={svgSize}
            viewBox={viewBox}
          >
            <circle
              cx={0}
              cy={0}
              r={radius}
              fill="transparent"
              stroke="black"
              strokeWidth="1"
            />
            {showCenter && centerPoint && (
              <circle
                cx={0}
                cy={0}
                r={radius / 2}
                fill="transparent"
                stroke="#06d6a0"
                strokeWidth="0.75"
              />
            )}
            {linesData.map(({ p1, p2 }, index) => (
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="black"
                strokeWidth="0.75"
                key={index}
              />
            ))}
            {linesData.map(({ projection }, index) => (
              <circle
                cx={projection.x}
                cy={projection.y}
                r={pointRadius}
                fill={
                  hasDifferentColors ? randomColorsRef.current[index] : "#000"
                }
                key={index}
              />
            ))}
            {showCenter && centerPoint && (
              <circle
                cx={centerPoint.x}
                cy={centerPoint.y}
                r={pointRadius}
                fill="#06d6a0"
              />
            )}
            <circle cx={point.x} cy={point.y} r={pointRadius} fill="#ef476f" />
          </svg>
          <div className={styles.controls}>
            <div className={styles.control}>
              <label className={styles.controlLabel}>Lines count:</label>
              <div className={styles.controlInputs}>
                <StepButton
                  isPlus={false}
                  disabled={linesCount === 0}
                  onClick={() => {
                    setLinesCount((linesCount) => linesCount - 1);
                  }}
                />
                <div className={styles.stepValue}>{linesCount}</div>
                <StepButton
                  isPlus={true}
                  disabled={linesCount === maxLinesCount}
                  onClick={() => {
                    setLinesCount((linesCount) => linesCount + 1);
                  }}
                />
              </div>
            </div>
            <div className={styles.control}>
              <label className={styles.controlLabel}>Speed:</label>
              <div className={styles.controlInputs}>
                <StepButton
                  isPlus={false}
                  disabled={speedValue === 0}
                  onClick={() => {
                    setSpeedValue((speedValue) => speedValue - 1);
                  }}
                />
                <div className={styles.stepValue}>{speedValue + 1}</div>
                <StepButton
                  isPlus={true}
                  disabled={speedValue === 9}
                  onClick={() => {
                    setSpeedValue((speedValue) => speedValue + 1);
                  }}
                />
              </div>
            </div>
            <div className={styles.control}>
              <label className={styles.controlLabel} htmlFor="showCenter">
                Show center?
              </label>
              <div className={styles.controlInputs}>
                <ToggleInput
                  id="showCenter"
                  disabled={linesCount < 2}
                  checked={showCenter}
                  onChange={setShowCenter}
                />
              </div>
            </div>
            <div className={styles.control}>
              <label className={styles.controlLabel} htmlFor="differentColors">
                Different colors?
              </label>
              <div className={styles.controlInputs}>
                <ToggleInput
                  id="differentColors"
                  disabled={linesCount < 2}
                  checked={hasDifferentColors}
                  onChange={setHasDifferentColors}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
