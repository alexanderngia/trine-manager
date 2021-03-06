import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Plus } from "@styled-icons/boxicons-regular/Plus";
import { Download } from "@styled-icons/bootstrap/Download";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { register } from "redux/reducers/authSlice";
import { messageActions } from "redux/reducers/messageSlice";
import userService from "services/userService";
import { ButtonMain, ButtonSub } from "components/ui/button/button";
import { CardList } from "components/ui/card";
import { Modal } from "components/ui/modal/modal";
import { Layout } from "components/views/layout";
import styles from "./index.module.scss";

export interface MemberListProps {}

const MemberList: React.FC<MemberListProps> = (props) => {
  const [deleteUser, setDeleteUser] = useState([]);
  const [data, setData] = useState([]);

  const [role, setRole] = useState("");
  const [modal, setModal] = useState(false);

  const [profile, setProfile] = useState(false);

  const [initialValue, setInitialValue] = useState({
    id: "",
    userName: "",
    userEmail: "",
    userPass: "",
    userPhone: "",
    userGender: "",
    userAdress: "",
    userRole: "",
  });
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getUserBoard("ALL");
        const resData = res.data.users;

        setData(resData);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchData();

    const modal = localStorage.getItem("MODAL");
    if (modal) {
      setModal(true);
    }
  }, []);
  useEffect(() => {
    if (user) {
      setRole(user.typeRole);
    }
  }, [user]);

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
        ...initialValue,
        id: `${infoUser.id}`,
        userName: `${infoUser.fullNameUser}`,
        userEmail: `${infoUser.emailUser}`,
        // userPass: `${infoUser.passwordUser}`,
        userPhone: `${infoUser.phoneUser}`,
        userGender: `${infoUser.genderUser}`,
        userAdress: `${infoUser.adressUser}`,
        userRole: `${infoUser.typeRole}`,
      });
      setDeleteUser(infoUser);
      dispatch(messageActions.clearMessage());
    }
  };

  const closeItemModal = () => {
    setProfile(false);
    setInitialValue({
      id: "",
      userName: "",
      userEmail: "",
      userPass: "",
      userPhone: "",
      userGender: "",
      userAdress: "",
      userRole: "",
    });
  };

  const deleteItem = async (userRemove: any) => {
    try {
      let confirmDelete = prompt(
        `Nh???p DELETE v??o ?? ????? x??c nh???n x??a ${userRemove.fullNameUser}!`,
        ""
      );
      if (confirmDelete === "DELETE") {
        let res = await userService.handleDeleteApi(userRemove.id);
        const errMessage = res.data.errMessage;
        const message = res.data.message;
        if (errMessage) {
          dispatch(messageActions.setMessage(errMessage));
        }
        if (message) {
          dispatch(messageActions.clearMessage());
          alert(userRemove.fullNameUser + message);
          setProfile(false);
        }
      }
      if (confirmDelete === "" || null) {
        dispatch(
          messageActions.setMessage(
            `Fail to remove ${userRemove.fullNameUser}!`
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "T???i thi???u 4 k?? t??? ho???c h??n")
      .required("Required!"),

    userEmail: Yup.string()
      .required("Required!")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address!"
      ),
    userPass: Yup.string().required("Required!"),
    userPhone: Yup.string()
      .required("Required!")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Please enter a valid phone number!"
      ),
    userGender: Yup.string().required("Required!"),
    userAdress: Yup.string().required("Required!"),
    userRole: Yup.string().required("Required!"),
  });

  const handleRegister = (formValue: any, { resetForm }: any) => {
    const {
      userName,
      userEmail,
      userPass,
      userPhone,
      userGender,
      userAdress,
      userRole,
    } = formValue;
    try {
      dispatch(
        register({
          userName,
          userEmail,
          userPass,
          userPhone,
          userGender,
          userAdress,
          userRole,
        })
      );
      resetForm({});
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (formValue: any) => {
    const {
      id,
      userName,
      userEmail,
      // userPass,
      userPhone,
      userGender,
      userAdress,
      userRole,
    } = formValue;
    try {
      let res = await userService.handleUpdateApi({
        id,
        userName,
        userEmail,
        // userPass,
        userPhone,
        userGender,
        userAdress,
        userRole,
      });

      const message = res.data.message;
      const errMessage = res.data.errMessage;
      if (errMessage) {
        dispatch(messageActions.setMessage(errMessage));
      }
      if (message) {
        alert(`${userName} ${message}`);
        setProfile(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchemaItem = Yup.object().shape({
    userName: Yup.string()
      .min(4, "T???i thi???u 4 k?? t??? ho???c h??n")
      .required("Required!"),

    userEmail: Yup.string()
      .required("Required!")
      .matches(
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address!"
      ),
    userPhone: Yup.string()
      .required("Required!")
      .matches(
        /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
        "Please enter a valid phone number!"
      ),
    userGender: Yup.string().required("Required!"),
    userAdress: Yup.string().required("Required!"),
    userRole: Yup.string().required("Required!"),
  });
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH S??CH TH??NH VI??N</h1>
        {role === "ADMIN" && (
          <div className={styles["btn-container"]}>
            <ButtonMain onClick={openModal}>
              <Plus size={20} className={styles["icon"]} />
            </ButtonMain>
            <ButtonMain>
              <Download size={20} className={styles["icon"]} />
            </ButtonMain>
          </div>
        )}

        {modal && (
          <Modal onClick={closeModal}>
            <h1>Let's signup!</h1>
            <Formik
              initialValues={initialValue}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ values, handleChange }: any) => (
                <Form className={styles["form"]}>
                  <div className={styles["container"]}>
                    <span className={styles["box"]}>
                      <label htmlFor="userName" className={styles["label"]}>
                        Full Name
                      </label>
                      <Field
                        id="userName"
                        className={styles["input"]}
                        type="text"
                        placeholder="Nguy???n V??n A"
                        name="userName"
                        value={values.userName}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userName"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="userEmail" className={styles["label"]}>
                        Email
                      </label>

                      <Field
                        className={styles["input"]}
                        type="email"
                        placeholder="nguyenvana@gmail.com"
                        name="userEmail"
                        id="userEmail"
                        value={values.userEmail}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userEmail"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="userPass" className={styles["label"]}>
                        M???t Kh???u
                      </label>

                      <Field
                        className={styles["input"]}
                        type="password"
                        placeholder="abc1223@"
                        name="userPass"
                        id="userPass"
                        value={values.userPass}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userPass"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="userPhone" className={styles["label"]}>
                        Phone
                      </label>

                      <Field
                        className={styles["input"]}
                        type="phone"
                        placeholder="0988379379"
                        name="userPhone"
                        id="userPhone"
                        value={values.userPhone}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userPhone"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <label htmlFor="userAdress" className={styles["label"]}>
                        ?????a Ch???
                      </label>
                      <Field
                        className={styles["input"]}
                        type="text"
                        placeholder="100C H???u Giang Qu???n 6 TP.HCM"
                        name="userAdress"
                        id="userAdress"
                        value={values.userAdress}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userAdress"
                        component="div"
                      />
                    </span>
                    <span className={styles["box"]}>
                      <p>Gi???i T??nh</p>
                      <div className={styles["container-checkbox"]}>
                        <label htmlFor="Male" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="Male"
                            name="userGender"
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
                            name="userGender"
                            value="0"
                          ></Field>
                          <span>
                            <p>Female</p>
                          </span>
                        </label>
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="userGender"
                          component="div"
                        />
                      </div>
                    </span>
                    <span className={styles["box"]}>
                      <p>Vai Tr??</p>
                      <div className={styles["container-checkbox"]}>
                        <label htmlFor="Admin" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="Admin"
                            name="userRole"
                            value="ADMIN"
                          ></Field>
                          <span>
                            <p>Admin</p>
                          </span>
                        </label>
                        <label htmlFor="Sale" className={styles["checkbox"]}>
                          <Field
                            type="radio"
                            id="Sale"
                            name="userRole"
                            value="SALE"
                          ></Field>
                          <span>
                            <p>Sale</p>
                          </span>
                        </label>
                        <ErrorMessage
                          className={styles["errMess"]}
                          name="userRole"
                          component="div"
                        />
                      </div>
                    </span>
                  </div>
                  <p className={styles["message"]}>{message}</p>

                  <div className={styles["button-container"]}>
                    <button type="submit">T???o Th??nh Vi??n</button>
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
                      titleCard={listItems.fullNameUser}
                      qtyCard={listItems.genderUser === 1 ? "Male" : "Female"}
                      sizeCard={listItems.phoneUser}
                      priceCard={listItems.emailUser}
                    />
                  );
                })
              )}
            </ul>
            {profile && (
              <Modal onClick={closeItemModal}>
                <h1>TH??NG TIN TH??NH VI??N</h1>
                <Formik
                  initialValues={initialValue}
                  validationSchema={validationSchemaItem}
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
                            htmlFor="userNameUpdate"
                            className={styles["label"]}
                          >
                            Full Name
                          </label>

                          <Field
                            id="userNameUpdate"
                            className={styles["input"]}
                            type="text"
                            placeholder="Nguy???n V??n A"
                            name="userName"
                            value={values.userName}
                            onChange={(e: any) => handleChange(e)}
                          />
                          <ErrorMessage
                            className={styles["errMess"]}
                            name="userName"
                            component="div"
                          />
                        </span>
                        <span className={styles["box"]}>
                          <label
                            htmlFor="userEmailUpdate"
                            className={styles["label"]}
                          >
                            Email
                          </label>

                          <Field
                            className={styles["input"]}
                            type="email"
                            placeholder="nguyenvana@gmail.com"
                            name="userEmail"
                            id="userEmailUpdate"
                            value={values.userEmail}
                            onChange={(e: any) => handleChange(e)}
                          />
                          <ErrorMessage
                            className={styles["errMess"]}
                            name="userEmail"
                            component="div"
                          />
                        </span>
                        <span className={styles["box"]}>
                          <label
                            htmlFor="userPhoneUpdate"
                            className={styles["label"]}
                          >
                            Phone
                          </label>

                          <Field
                            className={styles["input"]}
                            type="phone"
                            placeholder="0988379379"
                            name="userPhone"
                            id="userPhoneUpdate"
                            value={values.userPhone}
                            onChange={(e: any) => handleChange(e)}
                          />
                          <ErrorMessage
                            className={styles["errMess"]}
                            name="userPhone"
                            component="div"
                          />
                        </span>
                        <span className={styles["box"]}>
                          <label
                            htmlFor="userAdressUpdate"
                            className={styles["label"]}
                          >
                            ?????a Ch???
                          </label>
                          <Field
                            className={styles["input"]}
                            type="text"
                            placeholder="100C H???u Giang Qu???n 6 TP.HCM"
                            name="userAdress"
                            id="userAdressUpdate"
                            value={values.userAdress}
                            onChange={(e: any) => handleChange(e)}
                          />
                          <ErrorMessage
                            className={styles["errMess"]}
                            name="userAdress"
                            component="div"
                          />
                        </span>
                        <span className={styles["box"]}>
                          <p>Gi???i T??nh</p>
                          <div className={styles["container-checkbox"]}>
                            <label
                              htmlFor="MaleUpdate"
                              className={styles["checkbox"]}
                            >
                              <Field
                                type="radio"
                                id="MaleUpdate"
                                name="userGender"
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
                                name="userGender"
                                value="0"
                              ></Field>
                              <span>
                                <p>Female</p>
                              </span>
                            </label>
                            <ErrorMessage
                              className={styles["errMess"]}
                              name="userGender"
                              component="div"
                            />
                          </div>
                        </span>
                        <span className={styles["box"]}>
                          <p>Vai Tr??</p>
                          <div className={styles["container-checkbox"]}>
                            <label
                              htmlFor="AdminUpdate"
                              className={styles["checkbox"]}
                            >
                              <Field
                                type="radio"
                                id="AdminUpdate"
                                name="userRole"
                                value="ADMIN"
                              ></Field>
                              <span>
                                <p>Admin</p>
                              </span>
                            </label>
                            <label
                              htmlFor="SaleUpdate"
                              className={styles["checkbox"]}
                            >
                              <Field
                                type="radio"
                                id="SaleUpdate"
                                name="userRole"
                                value="SALE"
                              ></Field>
                              <span>
                                <p>Sale</p>
                              </span>
                            </label>

                            <ErrorMessage
                              className={styles["errMess"]}
                              name="userRole"
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
                          X??a Th??nh Vi??n
                        </ButtonSub>
                        <button type="submit">C???p Nh???t</button>
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

export default MemberList;
