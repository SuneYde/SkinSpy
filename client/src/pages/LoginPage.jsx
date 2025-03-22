import styles from "../styles/pages/LoginPage.module.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authActions";
import { useNavigate } from "react-router-dom";
import { clearError } from "../redux/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [canLogIn, setCanLogIn] = useState(false);
  useEffect(() => {
    if (userData.email && userData.password) {
      setCanLogIn(true);
    } else {
      setCanLogIn(false);
    }
  }, [userData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
    if (user) {
      navigate("/");
    }
  };
  useEffect(() => {
    try {
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.banner}></div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.text}>
            <h1 className={styles.formHeader}>Welcome Back.</h1>
            <p className={styles.formSubHeader}>
              Enter personal details to log in
            </p>
          </div>
          <div className={styles.oAuthButtons}>
            <button className={styles.googleOauth}>
              <i className="fa-brands fa-google"></i>
              <span>Sign up with Google</span>
            </button>
            <button className={styles.steamOauth}>
              <i className="fa-brands fa-steam"></i>
              <span>Sign up with Steam</span>
            </button>
          </div>
          <div className={styles.divider}>
            <div className={styles.line}></div>
            <p className={styles.lineText}>Or</p>
            <div className={styles.line}></div>
          </div>
          <div className={styles.normalContainer}>
            <label className={styles.label}>Email</label>
            <input
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
              type="text"
              className={styles.input}
              name="email"
            />
          </div>
          <div className={styles.normalContainer}>
            <label className={styles.label}>Password</label>
            <input
              onChange={(e) => {
                setUserData((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
              type="password"
              className={styles.input}
              name="password"
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={!canLogIn}
          >
            {isLoading ? "Processing..." : "Log In"}
          </button>
          <div className={styles.helper}>
            <p className={styles.helperText}>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  navigate("/sign-up");
                  dispatch(clearError());
                }}
                className={styles.clicktext}
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
