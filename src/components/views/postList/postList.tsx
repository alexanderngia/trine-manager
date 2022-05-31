import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./postList.module.scss";
import { Layout } from "../layout/layout";
import { ButtonMain } from "../../ui/button/button";
import CardList from "../../ui/card/cardList/cardList";
import { IoAdd, IoDownloadOutline } from "react-icons/io5";
export interface ProductListProps {}

const PostList: React.FC<ProductListProps> = (props) => {
  const [idProduct, setIdProduct] = useState(`ALL`);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/warehouse?id=${idProduct}`
        );
        const resData = res.data.products;

        setData(resData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idProduct]);
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH BÀI VIẾT</h1>
        <div className={styles["btn-container"]}>
          <div className={styles["filter"]}>
            <ButtonMain>LINGERIA</ButtonMain>
            <ButtonMain>ACCESSORIES</ButtonMain>
            <ButtonMain>DRESS</ButtonMain>
          </div>
          <div className={styles["btnCrud"]}>
            <ButtonMain>
              <IoAdd className={styles["icon"]} />
            </ButtonMain>
            <ButtonMain>
              <IoDownloadOutline className={styles["icon"]} />
            </ButtonMain>
          </div>
        </div>
        {data.length > 0 && (
          <ul className={styles["card-container"]}>
            {React.Children.toArray(
              data.map((listItems: any) => {
                return (
                  <CardList className={styles["card-custom"]}>
                    <a href="/#">
                      <ul>
                        <li>
                          <img
                            src={listItems.imgItem}
                            alt={listItems.imgItem}
                          />
                        </li>
                        <li>{listItems.nameItem}</li>
                        <li>{listItems.qualityItem}</li>
                        <li>{listItems.colorItem}</li>
                        <li>{listItems.sizeItem}</li>
                        <li>{listItems.priceItem}</li>
                      </ul>
                    </a>
                  </CardList>
                );
              })
            )}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default PostList;
