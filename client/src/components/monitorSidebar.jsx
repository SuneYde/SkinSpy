import styles from "../styles/components/monitorSidebar.module.scss";
import { useState, useEffect } from "react";
import marketPlacesData from "../utils/marketPlaces";
import { useSelector } from "react-redux";

const MonitorSidebar = ({ setIsUpgradeSubscriptionOpen }) => {
  const [marketPlaces, setMarketPlaces] = useState(marketPlacesData);
  const [helperText, setHelperText] = useState({
    maxSpendLimit: false,
    maxTradesThisSession: false,
  });
  const user = useSelector((state) => state.auth.user);
  const [emailNotification, setEmailNotification] = useState(true);

  const toggleMarketplace = (marketPlace) => {
    setMarketPlaces((prev) => ({
      ...prev,
      [marketPlace]: !prev[marketPlace],
    }));
  };

  const handleClickMarketplace = (marketPlace) => {
    if (marketPlace === "Skinport") {
      toggleMarketplace(marketPlace);
    } else if (marketPlace === "CSMoney") {
      const userPlan = user.subscription.plan;
      if (userPlan === "Plus") {
        toggleMarketplace(marketPlace);
      } else {
        setIsUpgradeSubscriptionOpen(true);
      }
    } else if (marketPlace === "CSFloat") {
      const userPlan = user.subscription.plan;
      if (userPlan === "Plus") {
        toggleMarketplace(marketPlace);
      } else {
        setIsUpgradeSubscriptionOpen(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.divContainer}>
        <button className={styles.submit}>
          <i className="fa-solid fa-desktop"></i>
          <span>Start Monitoring</span>
        </button>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.divContainer}>
        <p className={styles.divLabel}>Marketplaces</p>
        {Object.keys(marketPlaces).map((marketPlace) => (
          <div className={styles.switchContainer} key={marketPlace}>
            <p className={styles.switchLabel}>{marketPlace}</p>
            <div
              onClick={() => handleClickMarketplace(marketPlace)}
              className={`${
                marketPlace === "Skinport"
                  ? styles.switchContainerDiv
                  : marketPlace !== "Skinport" &&
                    user.subscription.plan === "Free"
                  ? styles.disabledSwitchContainerDiv
                  : styles.switchContainerDiv
              }`}
            >
              <div className={styles.off}>
                <div
                  className={`${styles.iconVertical} ${
                    marketPlaces[marketPlace] ? styles.isOfflineVertical : ""
                  } ${
                    marketPlace !== "Skinport" &&
                    user.subscription.plan === "Free"
                      ? styles.isOfflineVertical
                      : ""
                  }`}
                ></div>
              </div>
              <div
                className={`${styles.on} ${
                  marketPlaces[marketPlace] ? "" : styles.isOffline
                }`}
              >
                <i className="fa-regular fa-circle"></i>
              </div>
              <div
                className={`${styles.switch} ${
                  marketPlaces[marketPlace] ? styles.activeSwitch : ""
                }`}
              ></div>
            </div>
          </div>
        ))}
        <div className={styles.divider}></div>
        <div className={styles.divContainer}>
          <p className={styles.divLabel}>Session</p>
          <div className={styles.inputContainer}>
            <div className={styles.helperText}>
              <p>Max Spend Limit</p>
              <div
                className={styles.help}
                onMouseEnter={() =>
                  setHelperText((prev) => ({
                    ...prev,
                    maxSpendLimit: true,
                  }))
                }
                onMouseLeave={() =>
                  setHelperText((prev) => ({
                    ...prev,
                    maxSpendLimit: false,
                  }))
                }
              >
                <div
                  className={`${styles.helperTextFloating} ${
                    helperText.maxSpendLimit ? styles.visible : ""
                  }`}
                >
                  <p>Max amount of money to be spend in this session</p>
                </div>
                <i className="fa-solid fa-question-circle"></i>
              </div>
            </div>
            <div className={styles.input}>
              <p className={styles.icon}>$</p>
              <input
                className={styles.inputActual}
                type="number"
                placeholder="Max Spend Limit"
              />
              <div className={styles.btns}>
                <button className={styles.sideBtn}>-</button>
                <button className={`${styles.sideBtn} ${styles.right}`}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.helperText}>
              <p>Max Trades This Session</p>
              <div
                className={styles.help}
                onMouseEnter={() =>
                  setHelperText((prev) => ({
                    ...prev,
                    maxTradesThisSession: true,
                  }))
                }
                onMouseLeave={() =>
                  setHelperText((prev) => ({
                    ...prev,
                    maxTradesThisSession: false,
                  }))
                }
              >
                <div
                  className={`${styles.helperTextFloating2} ${
                    helperText.maxTradesThisSession ? styles.visible : ""
                  }`}
                >
                  <p>
                    Max Amount of trades in this session (cant be more than your
                    skinlist)
                  </p>
                </div>
                <i className="fa-solid fa-question-circle"></i>
              </div>
            </div>
            <div className={styles.input}>
              <p className={styles.icon}>$</p>
              <input
                className={styles.inputActual}
                type="number"
                placeholder="Max Trades"
              />
              <div className={styles.btns}>
                <button className={styles.sideBtn}>-</button>
                <button className={`${styles.sideBtn} ${styles.right}`}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.divContainer}>
          <p className={styles.divLabel}>Notifications</p>
          <div className={styles.switchContainer}>
            <p className={styles.switchLabel}>Email</p>
            <div
              onClick={() => setEmailNotification(!emailNotification)}
              className={`${styles.switchContainerDiv}`}
            >
              <div className={styles.off}>
                <div
                  className={`${styles.iconVertical} ${
                    emailNotification ? styles.isOfflineVertical : ""
                  } ${emailNotification ? styles.isOfflineVertical : ""}`}
                ></div>
              </div>
              <div
                className={`${styles.on} ${
                  emailNotification ? "" : styles.isOffline
                }`}
              >
                <i className="fa-regular fa-circle"></i>
              </div>
              <div
                className={`${styles.switch} ${
                  emailNotification ? styles.activeSwitch : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
      </div>
    </div>
  );
};

export default MonitorSidebar;
