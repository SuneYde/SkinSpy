import styles from "../styles/pages/RegisterPage.module.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authActions";
import { useNavigate } from "react-router-dom";
import { clearError } from "../redux/authSlice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const [canSignUp, setCanSignUp] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState({
    containsSpecialChar: false,
    longerThan8Chars: false,
  });

  useEffect(() => {
    if (
      userData.email &&
      userData.password &&
      userData.username &&
      confirmPassword
    ) {
      setCanSignUp(true);
    } else {
      setCanSignUp(false);
    }
  }, [userData, confirmPassword]);

  useEffect(() => {
    try {
      setPasswordCheck({
        containsSpecialChar: /[^A-Za-z0-9]/.test(userData.password),
        longerThan8Chars: userData.password.length >= 8, // Fixed typo and made it independent
      });
    } catch (error) {
      console.error(error);
    }
  }, [userData.password]);

  useEffect(() => {
    try {
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(register(userData));
    if (!error) {
      navigate("/");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <div className={styles.banner}></div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.text}>
            <h1 className={styles.formHeader}>Create an account.</h1>
            <p className={styles.formSubHeader}>
              Enter personal details to get started
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
          <div className={styles.topInputs}>
            <div className={styles.miniContainer}>
              <label className={styles.label}>Username</label>
              <input
                name="username"
                className={styles.input}
                onChange={(e) => {
                  setUserData((prev) => ({
                    ...prev,
                    username: e.target.value,
                  }));
                }}
              />
            </div>
            <div className={styles.miniContainer}>
              <label className={styles.label}>Email</label>
              <input
                name="email"
                className={styles.input}
                onChange={(e) => {
                  setUserData((prev) => ({
                    ...prev,
                    email: e.target.value.toLowerCase(),
                  }));
                }}
              />
            </div>
          </div>
          <div className={styles.normalContainer}>
            <label className={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              className={styles.input}
              onChange={(e) => {
                setUserData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <div className={styles.passwordContainer}>
            <div className={styles.firstCheck}>
              <div
                className={`${styles.circle} ${
                  passwordCheck.containsSpecialChar
                    ? styles.checked
                    : styles.unchecked
                }`}
              >
                {passwordCheck.containsSpecialChar ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <i className="fa-solid fa-xmark"></i>
                )}
              </div>
              <p className={styles.checkText}>
                Key must have special symbols like @#$% etc.
              </p>
            </div>
            <div className={styles.secondCheck}>
              <div
                className={`${styles.circle} ${
                  passwordCheck.longerThan8Chars
                    ? styles.checked
                    : styles.unchecked
                }`}
              >
                {passwordCheck.longerThan8Chars ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <i className="fa-solid fa-xmark"></i>
                )}
              </div>
              <p className={styles.checkText}>
                Key must be longer than 8 chars
              </p>
            </div>
          </div>
          <div className={styles.normalContainer}>
            <label className={styles.label}>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              className={styles.input}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className={styles.errorContainer}>
            {error && <p className={styles.error}>{error}</p>}
          </div>
          <button
            disabled={!canSignUp}
            type="submit"
            className={styles.submitButton}
          >
            Sign Up
          </button>
          <div className={styles.helper}>
            <p className={styles.helperText}>
              Already have an account?{" "}
              <span
                onClick={() => {
                  navigate("/login");
                  dispatch(clearError());
                }}
                className={styles.clicktext}
              >
                Log In
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
