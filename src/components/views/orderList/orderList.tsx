import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./orderList.module.scss";
import { Layout } from "../layout/layout";
import { ButtonMain } from "../../ui/button/button";
import CardList from "../../ui/card/cardList/cardList";
import {
  IoAdd,
  IoDownloadOutline,
  IoRemoveCircleSharp,
} from "react-icons/io5";
export interface OrderListProps {}

const OrderList: React.FC<OrderListProps> = (props) => {
  const [idOrder, setIdOder] = useState(`ALL`);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/order-list?id=${idOrder}`
        );
        const resData = res.data.orders;

        setData(resData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idOrder]);
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH ĐƠN HÀNG</h1>
        <div className={styles["btn-container"]}>
          <div className={styles["filter"]}>
            <ButtonMain>NEW</ButtonMain>
            <ButtonMain>SHIPPING</ButtonMain>
            <ButtonMain>DONE</ButtonMain>
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
                        <li>{listItems.id}</li>
                        <li>{listItems.fullNameCustomer}</li>
                        <li>{listItems.phoneCustomer}</li>
                        <li>{listItems.statusShipping}</li>
                        <li>{listItems.adressShipping}</li>
                        <li>{listItems.priceShipping}</li>
                        <li>
                          <IoRemoveCircleSharp />
                        </li>
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

export default OrderList;
