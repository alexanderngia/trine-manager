import React from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
export interface CardProps {
  className?: string;
  onClick?: any;
  imgCard?: string;
  titleCard: string;
  qtyCard?: string;
  colorCard?: string;
  sizeCard?: string;
  priceCard?: string;
  textCardOne?: string;
  textCardTwo?: string;
  textCardThree?: string;
  textCardFour?: string;
}
export const CardList: React.FC<CardProps> = ({
  className,
  onClick,
  imgCard,
  titleCard,
  qtyCard,
  colorCard,
  sizeCard,
  priceCard,
  textCardOne,
  textCardTwo,
  textCardThree,
  textCardFour,
}) => {
  return (
    <li onClick={onClick} className={classNames(styles["root"], className)}>
      <ul className={styles["card-list"]}>
        {imgCard && (
          <li className={styles["img"]}>
            <div
              style={{
                backgroundImage: `url(${imgCard})`,
                backgroundPosition: `center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                width: `50px`,
                height: `50px`,
                borderRadius: `50px`,
              }}
            ></div>
          </li>
        )}
        <li>{titleCard}</li>
        {qtyCard && <li>{qtyCard}</li>}
        {colorCard && (
          <li>
            <div
              style={{
                backgroundColor: `${colorCard}`,
                width: `25px`,
                height: `25px`,
                borderRadius: `50px`,
              }}
            ></div>
          </li>
        )}
        {sizeCard && <li>{sizeCard}</li>}
        {priceCard && <li>{priceCard}</li>}
        {textCardOne && <li>{textCardOne}</li>}
        {textCardTwo && <li>{textCardTwo}</li>}
        {textCardThree && <li>{textCardThree}</li>}
        {textCardFour && <li>{textCardFour}</li>}
      </ul>
    </li>
  );
};

export const Card: React.FC<CardProps> = ({
  className,
  onClick,
  imgCard,
  titleCard,
  qtyCard,
  colorCard,
  sizeCard,
  priceCard,
  textCardOne,
  textCardTwo,
  textCardThree,
  textCardFour,
}) => {
  return (
    <li
      onClick={onClick}
      className={classNames(styles["root"], styles["root-card"], className)}
    >
      <ul className={styles["card"]}>
        {imgCard && (
          <li className={styles["img"]}>
            <div
              style={{
                backgroundImage: `url(${imgCard})`,
                backgroundPosition: `center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                width: `100%`,
                height: `100px`,
                borderRadius: `5px`,
              }}
            ></div>
          </li>
        )}
        <li className={styles["title"]}>{titleCard}</li>
        {priceCard && <li>{priceCard}</li>}
        {qtyCard && <li>{qtyCard}</li>}
        {sizeCard && <li>{sizeCard}</li>}
        {colorCard && (
          <li className={styles["color"]}>
            <div
              style={{
                backgroundColor: `${colorCard}`,
                width: `10px`,
                height: `10px`,
                borderRadius: `50px`,
              }}
            ></div>
          </li>
        )}
        {textCardOne && <li>{textCardOne}</li>}
        {textCardTwo && <li>{textCardTwo}</li>}
        {textCardThree && <li>{textCardThree}</li>}
        {textCardFour && <li>{textCardFour}</li>}
      </ul>
    </li>
  );
};

export const CardItem: React.FC<CardProps> = ({
  className,
  onClick,
  imgCard,
  titleCard,
  qtyCard,
  colorCard,
  sizeCard,
  priceCard,
  textCardOne,
  textCardTwo,
  textCardThree,
  textCardFour,
}) => {
  return (
    <li onClick={onClick} className={classNames(styles["root"], className)}>
      <ul className={styles["card-item"]}>
        {imgCard && (
          <li className={styles["img"]}>
            <div
              className={styles["inner"]}
              style={{
                backgroundImage: `url(${imgCard})`,
              }}
            ></div>
          </li>
        )}
        <span className={styles["column"]}>
          <li>
            <h3>{titleCard}</h3>
          </li>
          {qtyCard && <li>{qtyCard}x</li>}
          {sizeCard && <li>{sizeCard}</li>}
          {colorCard && (
            <li>
              <div className={styles["pad-color"]}>
                <div
                  className={styles["color"]}
                  style={{
                    backgroundColor: `${colorCard}`,
                  }}
                ></div>
              </div>
            </li>
          )}
        </span>
        {priceCard && <li className={styles["price"]}>{priceCard}</li>}
        {textCardOne && <li>{textCardOne}</li>}
        {textCardTwo && <li>{textCardTwo}</li>}
        {textCardThree && <li>{textCardThree}</li>}
        {textCardFour && <li>{textCardFour}</li>}
      </ul>
    </li>
  );
};
