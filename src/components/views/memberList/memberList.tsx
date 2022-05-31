import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { IoAdd, IoDownloadOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux";
import { register } from "../../../redux/reducers/authSlice";
import userService from "../../../services/userService";
import { ButtonMain } from "../../ui/button/button";
import CardList from "../../ui/card/cardList/cardList";
import { Modal } from "../../ui/modal/modal";
import { Layout } from "../layout/layout";
import styles from "./memberList.module.scss";

export interface MemberListProps {}

const MemberList: React.FC<MemberListProps> = (props) => {
  const [idUser, setIdUser] = useState(`ALL`);
  const [successful, setSuccessful] = useState(false);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const { message } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userService.getUserBoard(idUser);
        const resData = res.data.users;

        setData(resData);
      } catch (error: any) {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setData(_content);
      }
    };
    fetchData();
    const modal = localStorage.getItem("MODAL");
    if (modal) {
      setModal(true);
    }
  }, [idUser]);

  const openModal = () => {
    setModal(true);
    localStorage.setItem("MODAL", "TRUE");
  };

  const closeModal = () => {
    setModal(false);
    localStorage.removeItem("MODAL");
  };

  const initialValues = {
    userName: "",
    userEmail: "",
    userPass: "",
    userPhone: "",
    userGender: "",
    userAdress: "",
    userRole: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .min(4, "Tối thiểu 4 ký tự hoặc hơn")
      .required("Required!"),

    userEmail: Yup.string()
      .required("Required!")
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address!"
      ),
    userPass: Yup.string()
      .required("Required!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      ),
    confirmedUserPass: Yup.string()
      .required("Required!")
      .oneOf([Yup.ref("userPass"), null], "Password must match!"),
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

  const handleRegister = (formValue: any) => {
    try {
      const {
        userName,
        userEmail,
        userPass,
        confirmPass,
        userPhone,
        userGender,
        userAdress,
        userRole,
      } = formValue;
      setSuccessful(false);
      dispatch(
        register({
          userName,
          userEmail,
          userPass,
          // confirmPass,
          userPhone,
          userGender,
          userAdress,
          userRole,
        })
      );
      setSuccessful(true);
    } catch (error) {
      setSuccessful(false);
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className={styles["root"]}>
        <h1>DANH SÁCH THÀNH VIÊN</h1>
        <div className={styles["btn-container"]}>
          <ButtonMain onClick={openModal}>
            <IoAdd className={styles["icon"]} />
          </ButtonMain>
          <ButtonMain>
            <IoDownloadOutline className={styles["icon"]} />
          </ButtonMain>
        </div>
        {modal && (
          <Modal onClick={closeModal}>
            <h1>Let's signup!</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ values, handleChange }: any) => (
                <Form className={styles["form"]}>
                  {!successful && (
                    <div className={styles["container"]}>
                      <Field
                        className={styles["input"]}
                        type="text"
                        placeholder="Enter your fullname"
                        name="userName"
                        value={values.userName}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userName"
                        component="div"
                      />

                      <Field
                        className={styles["input"]}
                        type="email"
                        placeholder="Enter your email"
                        name="userEmail"
                        value={values.userEmail}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userEmail"
                        component="div"
                      />

                      <Field
                        className={styles["input"]}
                        type="password"
                        placeholder="Enter your password"
                        name="userPass"
                        value={values.userPass}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userPass"
                        component="div"
                      />
                      <Field
                        className={styles["input"]}
                        type="password"
                        placeholder="Confirm your password"
                        name="confirmPass"
                        value={values.confirmPass}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="confirmPass"
                        component="div"
                      />

                      <Field
                        className={styles["input"]}
                        type="phone"
                        placeholder="Enter your phone"
                        name="userPhone"
                        value={values.userPhone}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userPhone"
                        component="div"
                      />
                      {/* <Field
                        className={styles["select"]}
                        id="gender"
                        name="userGender"
                        component="select"
                        value={values.userGender}
                        onChange={(e: any) => handleChange(e)}
                      >
                        <option value="1">Male</option>
                        <option value="0">Female</option>
                      </Field> */}
                      <label htmlFor="Male" className={styles["checkbox"]}>
                        <Field
                          type="radio"
                          id="Male"
                          name="userGender"
                          value="1"
                        ></Field>
                        Male
                      </label>
                      <label htmlFor="Female" className={styles["checkbox"]}>
                        <Field
                          type="radio"
                          id="Female"
                          name="userGender"
                          value="0"
                        ></Field>
                        Female
                      </label>
                      <div>{values.userGender}</div>
                      {/* {console.log(values.userGender)} */}
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userGender"
                        component="div"
                      />

                      <Field
                        className={styles["input"]}
                        type="text"
                        placeholder="Enter your address"
                        name="userAdress"
                        value={values.userAdress}
                        onChange={(e: any) => handleChange(e)}
                      />
                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userAdress"
                        component="div"
                      />

                      {/* <Field
                        className={styles["select"]}
                        id="role"
                        name="userRole"
                        component="select"
                        value={values.userRole}
                        onChange={(e: any) => handleChange(e)}
                      >
                        <option value="1">Admin</option>
                        <option value="2">Sale</option>
                      </Field> */}
                      <label htmlFor="Admin" className={styles["checkbox"]}>
                        <Field
                          type="radio"
                          id="Admin"
                          name="userRole"
                          value="1"
                        ></Field>
                        Admin
                      </label>
                      <label htmlFor="Sale" className={styles["checkbox"]}>
                        <Field
                          type="radio"
                          id="Sale"
                          name="userRole"
                          value="2"
                        ></Field>
                        Sale
                      </label>
                      <div>{values.userRole}</div>

                      <ErrorMessage
                        className={styles["errMess"]}
                        name="userRole"
                        component="div"
                      />

                      {/* <p className={styles["errMessage"]}>{errMessage}</p> */}
                      <button type="submit">Signup</button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Modal>
        )}
        {data.length > 0 && (
          <ul className={styles["card-container"]}>
            {React.Children.toArray(
              data.map((listItems: any) => {
                return (
                  <CardList>
                    <a href="/#">
                      <ul>
                        <li>{listItems.fullNameUser}</li>
                        <li>
                          {listItems.genderUser === 1 ? "Male" : "Female"}
                        </li>
                        <li>{listItems.phoneUser}</li>
                        <li>{listItems.emailUser}</li>
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

export default MemberList;
