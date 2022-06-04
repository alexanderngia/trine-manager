import React from "react";
import styles from "./button.module.scss";
import classNames from "classnames";
export interface ButtonProps {
  children: any;
  onClick?: any;
  className?: string;
  type?: any;
  disabled?: boolean;
}
export const ButtonMain: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles["root"], className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const ButtonSub: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type,
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles["root subBtn"], className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
