import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "hooks/useRedux";
import { login } from "redux/reducers/authSlice";
import styles from "./login.module.scss";

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const { user } = useAppSelector((state) => state.auth);
  const { message } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userAuth = () => {
      if (user) {
        const userLength = Object.keys(user).length;
        if (userLength > 0) {
          return <Navigate to="/dashboard" />;
        }
      }
    };
    userAuth();
  }, [user]);

  const handleLogin = async (formValue: any) => {
    const { userEmail, userPass } = formValue;
    
    try {
      dispatch(login({ userEmail, userPass }));
    } catch (error: any) {
      console.log(error, "Login Error");
    }
  };

  const initialValues = {
    userEmail: "",
    userPass: "",
  };

  const validationSchema = Yup.object().shape({
    userEmail: Yup.string()
      .required("Required!")
      .matches(
        /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please enter a valid email address!"
      ),
    userPass: Yup.string().required("Required!"),
  });

  return (
    <div className={styles["root"]}>
      <div className={styles["login-page"]}>
        <h1>Hi! Let's login!</h1>
        <div className={styles["form"]}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ values, handleChange }: any) => (
              <Form className={styles["login-form"]}>
                <Field
                  type="email"
                  placeholder="Enter your email"
                  name="userEmail"
                  value={values.userEmail}
                  onChange={(e: any) => handleChange(e)}
                  autoComplete="off"
                />
                <ErrorMessage
                  className={styles["errMess"]}
                  name="userEmail"
                  component="div"
                />
                <Field
                  type="password"
                  placeholder="Enter your password"
                  name="userPass"
                  value={values.userPass}
                  onChange={(e: any) => handleChange(e)}
                  autoComplete="off"
                />
                <ErrorMessage
                  className={styles["errMess"]}
                  name="userPass"
                  component="div"
                />
                <p className={styles["errMessage"]}>{message}</p>
                <button type="submit">Login</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
