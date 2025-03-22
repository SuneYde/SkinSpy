// Settings.jsx
import { Link, Outlet, useLocation } from "react-router";
import styles from "../styles/pages/Settings.module.scss";
import { useEffect, useState } from "react";
import { SettingsContext } from "../utils/SettingsContext"; // Adjust path as needed
import { api } from "../api/api";
import { useSelector } from "react-redux";

const Settings = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const [detectedChanges, setDetectedChanges] = useState({});

  const routes = {
    account: { name: "Account", path: "/settings" },
    appearance: { name: "Appearance", path: "appearance" },
    security: { name: "Security", path: "security" },
    notifications: { name: "Notifications", path: "notifications" },
    billing: { name: "Billing", path: "billing" },
  };

  const handleDiscard = () => {
    setDetectedChanges({});
  };

  const handleSave = async () => {
    try {
      await api.patch("/auth/update", detectedChanges, {
        headers: {
          Authorization: `Bearer ${user.token}`, // 👈 Send your token here!
        },
      });
      setDetectedChanges({});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Settings</h1>
      </div>
      <div className={styles.upperContainer}>
        <div className={styles.settingsNavbar}>
          {Object.keys(routes).map((route) => (
            <div className={styles.route} key={route}>
              <Link to={routes[route].path}>
                <button
                  className={`${styles.button} ${
                    location.pathname === routes[route].path
                      ? styles.active
                      : ""
                  }`}
                >
                  {routes[route].name}
                </button>
              </Link>
            </div>
          ))}
        </div>

        <div className={`${styles.buttons} `}>
          <button
            onClick={handleDiscard}
            className={styles.discardButton}
            disabled={!Object.keys(detectedChanges).length}
          >
            Discard
          </button>
          <button
            className={styles.saveButton}
            disabled={!Object.keys(detectedChanges).length}
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className={styles.settingsContent}>
        <SettingsContext.Provider
          value={{ detectedChanges, setDetectedChanges }}
        >
          <Outlet />
        </SettingsContext.Provider>
      </div>
    </div>
  );
};

export default Settings;
