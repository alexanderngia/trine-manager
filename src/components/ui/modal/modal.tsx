import React from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";
import { IoClose } from "react-icons/io5";

export interface ModalProps {
  children: any;
  onClick?: any;
  className?: string;
}
export const Modal: React.FC<ModalProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <div className={classNames(styles["root"], className)}>
      <div className={styles["container"]}>
        <IoClose onClick={onClick} className="close"></IoClose>
        {children}
      </div>
    </div>
  );
};
