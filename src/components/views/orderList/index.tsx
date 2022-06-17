import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./index.module.scss";
import { Layout } from "components/views/layout";
import { ButtonMain } from "components/ui/button/button";
import CardList from "components/ui/card/cardList/cardList";
import { IoAdd, IoDownloadOutline, IoRemoveCircleSharp } from "react-icons/io5";
import { useAppSelector } from "hooks/useRedux";
import orderService from "services/orderService";
export interface OrderListProps {}

const OrderList: React.FC<OrderListProps> = (props) => {
  const [idOrder, setIdOder] = useState(`ALL`);
  const [role, setRole] = useState("");
  const [modal, setModal] = useState(false);

  const [data, setData] = useState([]);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await orderService.getOrderBoard(idOrder);
        const resData = res.data.orders;

        setData(resData);
        setRole(user.typeRole);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();

    const modal = localStorage.getItem("MODAL");
    if (modal) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [idOrder, data, user]);
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
