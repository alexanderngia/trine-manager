import React from "react";
import styles from "./modal.module.scss";
import classNames from "classnames";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

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
        <CloseOutline onClick={onClick} className="close" />
        {children}
      </div>
    </div>
  );
};
