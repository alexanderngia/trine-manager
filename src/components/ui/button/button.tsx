import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";
export interface ButtonProps {
  children: any;
  onClick?: any;
  className?: string;
}
export const ButtonMain: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={classNames(styles["root"], className)}>
      {children}
    </button>
  );
};

export const ButtonSub: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(styles["root subBtn"], className)}
    >
      {children}
    </button>
  );
};
