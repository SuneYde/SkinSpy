import { useEffect, useState } from "react";
import styles from "../styles/components/Account.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useSettings } from "../utils/SettingsContext";

const Account = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState({
    email: user.email,
    username: user.username,
  });

  const { detectedChanges, setDetectedChanges } = useSettings();

  useEffect(() => {
    if (!user) {
      return;
    }

    const changes = {};
    if (userData.email !== user.email) {
      changes.email = userData.email;
      console.log("email changed");
    }

    if (userData.username !== user.username) {
      changes.username = userData.username;
      console.log("username changed");
    }

    setDetectedChanges(changes);
  }, [userData, user, setDetectedChanges]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <div className={styles.accountContainer}>
      <div className={styles.userDetails}>
        <div className={styles.intoText}>
          <h1 className={styles.title}>User Details</h1>
          <p className={styles.subtitle}>Change your personal information</p>
        </div>
        <div className={styles.inputs}>
          <div className={styles.inputContainer}>
            <p className={styles.inputLabel}>Email</p>
            <input
              className={styles.input}
              type="text"
              name="email"
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
            />
          </div>
          <div className={styles.inputContainer}>
            <p className={styles.inputLabel}>Username</p>
            <input
              className={styles.input}
              type="text"
              name="username"
              value={userData.username}
              onChange={(e) => {
                setUserData({ ...userData, username: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.divider}></div>
    </div>
  );
};

export default Account;
