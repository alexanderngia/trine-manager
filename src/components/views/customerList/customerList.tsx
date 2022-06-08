import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { IoAdd, IoDownloadOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { messageActions } from "redux/reducers/messageSlice";
import customerService from "services/customerService";
import { ButtonMain, ButtonSub } from "components/ui/button/button";
import CardList from "components/ui/card/cardList/cardList";
import { Modal } from "components/ui/modal/modal";
import { Layout } from "components/views/layout/layout";
import styles from "./customerList.module.scss";

export interface CustomerListProps {}

const CustomerList: React.FC<CustomerListProps> = (props) => {
  const [idCus, setIdCus] = useState(`ALL`);
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");
  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState(false);
  const [deleteUser, setDeleteUser] = useState([]);

  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();

  const [initialValue, setInitialValue] = useState({
    id: "",
    cusName: "",
    cusEmail: "",
    cusPhone: "",
    cusGender: "",
    cusAdress: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await customerService.getCustomerBoard(idCus);
        const resData = res.data.customers;

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
    }
  }, [idCus, data, user]);

  const openModal = () => {
    setModal(true);
    localStorage.setItem("MODAL", "TRUE");
    dispatch(messageActions.clearMessage());
  };

  const closeModal = () => {
    setModal(false);
    localStorage.removeItem("MODAL");
  };

  const openItemModal = async (infoUser: any) => {
    setProfile(true);
    if (infoUser) {
      setInitialValue({
        id: `${infoUser.id}`,
        cusName: `${infoUser.fullNameCus}`,
        cusEmail: `${infoUser.emailCus}`,
        cusPhone: `${infoUser.phoneCus}`,
        cusGender: `${infoUser.genderCus}`,
        cusAdress: `${infoUser.adressCus}`,
      });
      setDeleteUser(infoUser);
      dispatch(messageActions.clearMessage());
    }
  };

  const closeItemModal = () => {
    setProfile(false);
    setInitialValue({
      id: "",
      cusName: "",
      cusEmail: "",
      cusPhone: "",
      cusGender: "",
      cusAdress: "",
    });
  };

  const deleteItem = async (userRemove: any) => {
    try {
      let confirmDelete = prompt(
        `Nhập DELETE vào ô để xác nhận xóa ${userRemove.fullNameCus}!`,
        ""
      );
      if (confirmDelete === "DELETE") {
        let res = await customerService.handleDeleteApi(userRemove.id);
        const errMessage = res.data.errMessage;
        const message = res.data.message;
        if (errMessage) {
          dispatch(messageActions.setMessage(errMessage));
        }
        if (message) {
          dispatch(messageActions.clearMessage());
          alert(userRemove.fullNameCus + message);
          setProfile(false);
        }
      }
      if (confirmDelete === "" || null) {
        dispatch(
          messageActions.setMessage(`Fail to remove ${userRemove.fullNameCus}!`)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    cusName: Yup.string()
      .min(4, "Tối thiểu 4 ký tự hoặc hơn")
      .required("Required!"),

    cusEmail: Yup.string()
      .required("Required!")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address!"
      ),
    cusPhone: Yup.string()
      .required("Required!")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Please enter a valid phone number!"
      ),
    cusGender: Yup.string().required("Required!"),
    cusAdress: Yup.string().required("Required!"),
  });

  const handleRegister = async (formValue: any, { resetForm }: any) => {
    const { cusName, cusEmail, cusPhone, cusGender, cusAdress } = formValue;
    try {
      let res = await customerService.handleRegisterApi({
        cusName,
        cusEmail,
        cusPhone,
        cusGender,
        cusAdress,
      });
      dispatch(messageActions.setMessage(res.data.message));
      resetForm({});

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: any) => {
    const { id, cusName, cusEmail, cusPhone, cusGender, cusAdress } = formValue;
    try {
      let res = await customerService.handleUpdateApi({
        id,
        cusName,
        cusEmail,
        cusPhone,
        cusGender,
        cusAdress,
      });

      const message = res.data.message;
      const errMessage = res.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`${cusName} ${message}`);
        setProfile(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH KHÁCH HÀNG</h1>
        <div className={styles["btn-container"]}>
          <ButtonMain onClick={openModal}>
            <IoAdd className={styles["icon"]} />
          </ButtonMain>
          {role === "ADMIN" && (
            <ButtonMain>
              <IoDownloadOutline className={styles["icon"]} />
            </ButtonMain>
          )}
        </div>
        {modal && (
          <Modal onClick={closeModal}>
            <h1>Thêm Khách Hàng Thân Thiết Nào!</h1>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ values, handleChange }: any) => (
                <Form className={styles["form"]}>
                  <div className={styles["container"]}>
                    <span className={styles["box"]}>
                      <label htmlFor="cusName" className={styles["label"]}>
                        Full Name
                      </label>
                      <Field
                        id="cusName"
                        className={styles["input"]}
                        type="text"
                        placeholder="Nguyễn Văn A"
                        name="cusName"
                        value={values.cusName}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="cusName"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="cusEmail" className={styles["label"]}>
                        Email
                      </label>

                      <Field
                        className={styles["input"]}
                        type="email"
                        placeholder="nguyenvana@gmail.com"
                        name="cusEmail"
                        id="cusEmail"
                        value={values.cusEmail}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="cusEmail"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="cusPhone" className={styles["label"]}>
                        Phone
                      </label>

                      <Field
                        className={styles["input"]}
                        type="phone"
                        placeholder="0988379379"
                        name="cusPhone"
                        id="cusPhone"
                        value={values.cusPhone}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="cusPhone"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="cusAdress" className={styles["label"]}>
                        Địa Chỉ
                      </label>
                      <Field
                        className={styles["input"]}
                        type="text"
                        placeholder="100C Hậu Giang Quận 6 TP.HCM"
                        name="cusAdress"
                        id="cusAdress"
                        value={values.cusAdress}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="cusAdress"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <p>Giới Tính</p>
                      <div className={styles["container-checkbox"]}>
                        <label htmlFor="Male" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="Male"
                            name="cusGender"
                            value="1"
                          ></Field>
                          <span>
                            <p>Male</p>
                          </span>
                        </label>
                        <label htmlFor="Female" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="Female"
                            name="cusGender"
                            value="0"
                          ></Field>
                          <span>
                            <p>Female</p>
                          </span>
                        </label>
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="cusGender"
                          component="div"
                        />
                      </div>
                    </span>
                  </div>
                  <p className={styles["message"]}>{message}</p>

                  <div className={styles["button-container"]}>
                    <button type="submit">Thêm Khách Hàng</button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
        )}
        {data.length > 0 && (
          <>
            <ul className={styles["card-container"]}>
              {React.Children.toArray(
                data.map((listItems: any) => {
                  return (
                    <CardList
                      className={styles["customer-list"]}
                      onClick={() => openItemModal(listItems)}
                    >
                      <ul>
                        <li>{listItems.fullNameCus}</li>
                        <li>{listItems.genderCus === 1 ? "Male" : "Female"}</li>
                        <li>{listItems.phoneCus}</li>
                        <li>{listItems.emailCus}</li>
                      </ul>
                    </CardList>
                  );
                })
              )}
            </ul>
            {profile && (
              <Modal onClick={closeItemModal}>
                <h1>THÔNG TIN KHÁCH HÀNG</h1>
                <Formik
                  initialValues={initialValue}
                  validationSchema={validationSchema}
                  onSubmit={handleUpdate}
                >
                  {({ values, handleChange }: any) => (
                    <Form className={styles["form"]}>
                      <div className={styles["container"]}>
                        <span className={styles["box"]}>
                          <Field
                            className={styles["input"]}
                            type="text"
                            name="id"
                            value={values.id}
                            onChange={(e: any) => handleChange(e)}
                            hidden
                          />
                          <label
                            htmlFor="cusNameUpdate"
                            className={styles["label"]}
                          >
                            Full Name
                          </label>

                          <Field
                            id="cusNameUpdate"
                            className={styles["input"]}
                            type="text"
                            placeholder="Nguyễn Văn A"
                            name="cusName"
                            value={values.cusName}
                            onChange={(e: any) => handleChange(e)}
                          />
                          <ErrorMessage
                            className={styles["errMess"]}
                            name="cusName"
                            component="div"
                          />
                        </span>
                        <span className={styles["box"]}>
                          <label
                            htmlFor="cusEmailUpdate"
                            className={styles["label"]}
                          >
                            Email
                          </label>

                          <Field
                            className={styles["input"]}
                            type="email"
                            placeholder="nguyenvana@gmail.com"
                            name="cusEmail"
                            id="cusEmailUpdate"
                            value={values.cusEmail}
                            onChange={(e: any) => handleChange(e)}
                          />
                          <ErrorMessage
                            className={styles["errMess"]}
                            name="cusEmail"
                            component="div"
                          />
                        </span>
                        <span className={styles["box"]}>
                          <label
                            htmlFor="cusPhoneUpdate"
                            className={styles["label"]}
                          >
                            Phone
                          </label>

                          <Field
                            className={styles["input"]}
                            type="phone"
                            placeholder="0988379379"
                            name="cusPhone"
                            id="cusPhoneUpdate"
                            value={values.cusPhone}
                            onChange={(e: any) => handleChange(e)}
                          />
                          <ErrorMessage
                            className={styles["errMess"]}
                            name="cusPhone"
                            component="div"
                          />
                        </span>
                        <span className={styles["box"]}>
                          <label
                            htmlFor="cusAdressUpdate"
                            className={styles["label"]}
                          >
                            Địa Chỉ
                          </label>
                          <Field
                            className={styles["input"]}
                            type="text"
                            placeholder="100C Hậu Giang Quận 6 TP.HCM"
                            name="cusAdress"
                            id="cusAdressUpdate"
                            value={values.cusAdress}
                            onChange={(e: any) => handleChange(e)}
                          />
                          <ErrorMessage
                            className={styles["errMess"]}
                            name="cusAdress"
                            component="div"
                          />
                        </span>
                        <span className={styles["box"]}>
                          <p>Giới Tính</p>
                          <div className={styles["container-checkbox"]}>
                            <label
                              htmlFor="MaleUpdate"
                              className={styles["checkbox"]}
                            >
                              <Field
                                type="radio"
                                id="MaleUpdate"
                                name="cusGender"
                                value="1"
                              ></Field>
                              <span>
                                <p>Male</p>
                              </span>
                            </label>
                            <label
                              htmlFor="FemaleUpdate"
                              className={styles["checkbox"]}
                            >
                              <Field
                                type="radio"
                                id="FemaleUpdate"
                                name="cusGender"
                                value="0"
                              ></Field>
                              <span>
                                <p>Female</p>
                              </span>
                            </label>
                            <ErrorMessage
                              className={styles["errMess"]}
                              name="cusGender"
                              component="div"
                            />
                          </div>
                        </span>
                      </div>
                      <p className={styles["message"]}>{message}</p>

                      <div className={styles["button-container"]}>
                        <ButtonSub
                          type="button"
                          onClick={() => deleteItem(deleteUser)}
                        >
                          Xóa Khách Hàng
                        </ButtonSub>
                        <button type="submit">Cập Nhật</button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default CustomerList;
