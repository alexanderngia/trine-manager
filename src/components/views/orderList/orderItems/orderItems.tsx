import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./orderItems.module.scss";
import { Layout } from "components/views/layout/layout";
import { ButtonMain } from "components/ui/button/button";
import CardList from "components/ui/card/cardList/cardList";
import { IoAdd, IoDownloadOutline } from "react-icons/io5";
export interface OrderItemsProps {}

const OrderItems: React.FC<OrderItemsProps> = (props) => {
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
        <h1>CHI TIẾT ĐƠN HÀNG</h1>
        <div className={styles["btn-container"]}>
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
                <CardList>
                  <a href="/#">
                    <ul>
                      <li>
                        <img src={listItems.imgItem} alt={listItems.imgItem} />
                      </li>
                      <li>{listItems.idItem}</li>
                      <li>{listItems.nameItem}</li>
                      <li>{listItems.qualityItem}</li>
                      <li>{listItems.colorItem}</li>
                      <li>{listItems.sizeItem}</li>
                      <li>{listItems.priceItem}</li>
                      <li>{listItems.idCustomer}</li>
                      <li>{listItems.fullNameCustomer}</li>
                      <li>{listItems.emailCustomer}</li>
                      <li>{listItems.phoneCustomer}</li>
                      <li>{listItems.noteShipping}</li>
                      <li>{listItems.statusShipping}</li>
                      <li>{listItems.adressShipping}</li>
                      <li>{listItems.stateShipping}</li>
                      <li>{listItems.priceShipping}</li>
                    </ul>
                  </a>
                </CardList>
              );
            })
          )}
        </ul>
      )}
    </Layout>
  );
};

export default OrderItems;
