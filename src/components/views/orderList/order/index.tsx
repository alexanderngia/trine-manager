import { Layout } from "components/views/layout";
import { Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect, useState } from "react";
import { messageActions } from "redux/reducers/messageSlice";
import postService from "services/postService";
import styles from "./index.module.scss";
import { ButtonMain, ButtonSub } from "components/ui/button/button";
import { history } from "utils/history";
import { Card, CardList, CardItem } from "components/ui/card";
import productService from "services/productService";
import { Search } from "components/ui/search";
import { cartActions } from "redux/reducers/cartSlice";

export interface OrderProps {}

const Order: React.FC<OrderProps> = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);

  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);
  const { order } = useAppSelector((state) => state.order);
  // const { cart } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const [initialValue, setInitialValue] = useState({
    id: "",
    authorNew: `${user && user.fullNameUser}`,
    urlNew: "",
    titleNew: "",
    bodyNew: "",
    bodyHtmlNew: "",
    featureImgNew: "",
    categoryNew: "",
    keywordTagNew: "",
    titleTagNew: "",
    descripTagNew: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productService.getProductBoard("ALL");
        const resData = res.data.products;

        setData(resData);
        if (order) {
          setInitialValue({
            id: `${order.id}`,
            authorNew: `${order.author}`,
            urlNew: `${order}`,
            titleNew: `${order.title}`,
            bodyNew: `${order.body}`,
            bodyHtmlNew: `${order.bodyHtml}`,
            featureImgNew: `${order.featureImg}`,
            categoryNew: `${order.category}`,
            keywordTagNew: `${order.keywordTag}`,
            titleTagNew: `${order.title}`,
            descripTagNew: `${order.descripTag}`,
          });
          dispatch(messageActions.clearMessage());
        }
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleRegister = async (formValue: any, { resetForm }: any) => {
    const {
      authorNew,
      urlNew,
      titleNew,
      bodyNew,
      bodyHtmlNew,
      featureImgNew,
      categoryNew,
      keywordTagNew,
      titleTagNew,
      descripTagNew,
    } = formValue;
    try {
      let res = await postService.handleRegisterApi({
        authorNew,
        urlNew,
        titleNew,
        bodyNew,
        bodyHtmlNew,
        featureImgNew,
        categoryNew,
        keywordTagNew,
        titleTagNew,
        descripTagNew,
      });
      const message = res.data.message;
      const errMessage = res.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        await alert(`${message}`);
        history.push("/order-manager");
      }

      // return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: any) => {
    const {
      id,
      authorNew,
      urlNew,
      titleNew,
      bodyNew,
      bodyHtmlNew,
      featureImgNew,
      categoryNew,
      keywordTagNew,
      titleTagNew,
      descripTagNew,
    } = formValue;
    try {
      let res = await postService.handleUpdateApi({
        id,
        authorNew,
        urlNew,
        titleNew,
        bodyNew,
        bodyHtmlNew,
        featureImgNew,
        categoryNew,
        keywordTagNew,
        titleTagNew,
        descripTagNew,
      });

      const message = res.data.message;
      const errMessage = res.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`Post ${message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteItem = async (deleteItem: any) => {
    try {
      let confirmDelete = prompt(
        `Nh???p DELETE v??o ?? ????? x??c nh???n x??a ${deleteItem.titleNew}!`,
        ""
      );
      if (confirmDelete === "DELETE") {
        let res = await postService.handleDeleteApi(deleteItem.id);
        const errMessage = res.data.errMessage;
        const message = res.data.message;
        if (errMessage) {
          dispatch(messageActions.setMessage(errMessage));
        }
        if (message) {
          dispatch(messageActions.clearMessage());
          await alert(deleteItem.titleNew + message);
          history.push("/Order-manager");
        }
      }
      if (confirmDelete === "" || null) {
        dispatch(
          messageActions.setMessage(`Fail to remove ${deleteItem.titleNew}!`)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalItems = (product: any) => {};
  const handleAddToCart = (addedProduct: any) => {
    setCart((prev): any => {
      // Product in cart already
      const itemInCart = prev.find((item: any) => item.id === addedProduct.id);
      if (itemInCart) {
        prev.map((item: any) => {
          return item.id === addedProduct.id
            ? { ...item, amount: item.amount + 1 }
            : item;
        });
      }
      // first time product in cart
      return [...prev, { ...addedProduct, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: any) => {
    // setCart((prev: any) => {
    //   return prev.reduce((ack: any, item: any) => {
    //     if (item.id === id) {
    //       if (item.amount === 1) return ack;
    //       console.log(item, "item");
    //       return [...ack, { ...item, amount: item.amount - 1 }];
    //     } else {
    //       return [...ack, ...item];
    //     }
    //   }, []);
    // });
  };
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>{order ? "C???P NH???T ????N H??NG" : "T???O ????N H??NG"}</h1>
        <div className={styles["container-cart"]}>
          <div className={styles["column"]}>
            <span className={styles["row"]}>
              <Search className={styles["search"]} />
              <div className={styles["filter"]}>
                <ButtonMain>LINGERIA</ButtonMain>
                <ButtonMain>ACCESSORIES</ButtonMain>
                <ButtonMain className={styles["last-button"]}>DRESS</ButtonMain>
              </div>
            </span>
            <span className={styles["row"]}>
              <label className={styles["label"]}>Ch???n S???n Ph???m</label>
              {data.length > 0 && (
                <>
                  <ul className={styles["container-card"]}>
                    {React.Children.toArray(
                      data.map((listItems: any) => {
                        return (
                          <CardItem
                            className={styles["card-item"]}
                            onClick={() =>
                              // dispatch(cartActions.addToCart(listItems))
                              handleAddToCart(listItems)
                            }
                            titleCard={listItems.nameItem}
                            imgCard={listItems.imgItem}
                            qtyCard={listItems.qualityItem}
                            colorCard={listItems.colorItem}
                            sizeCard={listItems.sizeItem}
                            priceCard={listItems.priceItem}
                          />
                        );
                      })
                    )}
                  </ul>
                </>
              )}
            </span>
            <span className={styles["row"]}>
              <Formik
                initialValues={initialValue}
                validateOnChange={true}
                onSubmit={order ? handleUpdate : handleRegister}
                // onSubmit={(values) => {
                //   console.log(values);
                // }}
                enableReinitialize={true}
              >
                {({ values, setFieldValue }: any) => (
                  <Form className={styles["form"]}>
                    <div className={styles["container"]}>
                      <span className={styles["box"]}>
                        <Field
                          className={styles["input"]}
                          type="text"
                          name="id"
                          hidden
                        />
                        <Field
                          hidden
                          className={styles["input"]}
                          type="text"
                          name="authorNew"
                          onChange={() =>
                            setFieldValue("authorNew", `${order.author}`)
                          }
                        />
                        <label
                          htmlFor="cusFullName"
                          className={styles["label"]}
                        >
                          T??n Kh??ch H??ng
                        </label>
                        <Field
                          id="cusFullName"
                          className={styles["input"]}
                          type="text"
                          name="cusFullName"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label htmlFor="cusPhone" className={styles["label"]}>
                          S??? ??i???n Tho???i
                        </label>
                        <Field
                          className={styles["input"]}
                          type="number"
                          name="cusPhone"
                          id="cusPhone"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label htmlFor="cusEmail" className={styles["label"]}>
                          Email
                        </label>
                        <Field
                          className={styles["input"]}
                          type="email"
                          name="cusEmail"
                          id="cusEmail"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label htmlFor="cusAdress" className={styles["label"]}>
                          ?????a Ch???
                        </label>
                        <Field
                          className={styles["input"]}
                          type="text"
                          name="cusAdress"
                          id="cusAdress"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label htmlFor="saleNote" className={styles["label"]}>
                          Ghi Ch?? ????n H??ng
                        </label>
                        <Field
                          className={styles["input"]}
                          type="text"
                          placeholder="Kh??ch quen c???n g???p, giao trong ng??y"
                          name="saleNote"
                          id="saleNote"
                        />
                      </span>
                      <span className={styles["box"]}>
                        <label htmlFor="cusNote" className={styles["label"]}>
                          Ghi Ch?? C???a Kh??ch
                        </label>

                        <Field
                          className={styles["input"]}
                          type="text"
                          placeholder="Giao h??ng l??c 5h chi???u"
                          name="cusNote"
                          id="cusNote"
                        />
                      </span>
                      <div className={styles["button-container"]}>
                        <ButtonSub
                          type="button"
                          onClick={() => handleDeleteItem(values)}
                        >
                          Delete
                        </ButtonSub>
                        <ButtonMain type="submit">
                          {order ? "Update" : "Save"}
                        </ButtonMain>
                      </div>
                    </div>
                    <p className={styles["message"]}>{message}</p>
                  </Form>
                )}
              </Formik>
            </span>
          </div>
          <div className={styles["column"]}>
            <div className={styles["cart-box"]}>
              <div className={styles["cart"]}>
                <div className={styles["cart-items"]}>
                  {cart && cart.length === 0 ? (
                    <div className={styles["cart-text"]}>
                      Ch???n s???n ph???m th??m v??o gi??? h??ng!
                    </div>
                  ) : null}

                  {cart &&
                    React.Children.toArray(
                      cart.map((item: any) => {
                        return (
                          <CardItem
                            onClick={() => handleRemoveFromCart(item.id)}
                            titleCard={item.nameItem}
                            imgCard={item.imgItem}
                            priceCard={item.priceItem}
                            sizeCard={item.sizeItem}
                            colorCard={item.colorItem}
                            qtyCard={item.amount}
                          ></CardItem>
                        );
                      })
                    )}
                </div>
              </div>
              <div className={styles["cart-total"]}>
                <hr />
                <div className={styles["sub-total"]}>
                  <span>VAT</span>
                  <span>Shipping</span>
                </div>
                <hr />
                <div className={styles["total"]}>TOTAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
