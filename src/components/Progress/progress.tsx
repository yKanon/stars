import React, { FC, CSSProperties } from "react";
import { ThemeProps } from "../icon/icon";

export interface IProgressProps {
  percentage: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: CSSProperties;
  theme?: ThemeProps;
}

const Progress: FC<IProgressProps> = (props) => {
  const { percentage, strokeHeight, showText, styles, theme } = props;

  return (
    <div className="stars-progress-bar" style={styles}>
      <div
        className="stars-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`stars-progress-bar-inner color-${theme}`}
          style={{ width: `${percentage}%` }}
        >
          {showText && <span className="inner-text">{`${percentage}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};

export default Progress;
