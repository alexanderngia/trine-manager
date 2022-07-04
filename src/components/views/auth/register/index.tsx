import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import React, { useEffect } from "react";
import { register } from "redux/reducers/authSlice";
import { messageActions } from "redux/reducers/messageSlice";
import * as Yup from "yup";
import styles from "./index.module.scss";
interface RegisterProps {}

const Register: React.FC<RegisterProps> = (props) => {

  const { message } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(messageActions.clearMessage());
  }, [dispatch]);

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

  return (
    <div className={styles["root"]}>
      <div className={styles["login-page"]}>
        <h1>Let's signup!</h1>
        <Formik
          initialValues={initialValues}
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
                    placeholder="Nguyễn Văn A"
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
                    Mật Khẩu
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
                    Địa Chỉ
                  </label>
                  <Field
                    className={styles["input"]}
                    type="text"
                    placeholder="100C Hậu Giang Quận 6 TP.HCM"
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
                  <p>Giới Tính</p>
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
                  <p>Vai Trò</p>
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
                <button type="submit">Tạo Thành Viên</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
