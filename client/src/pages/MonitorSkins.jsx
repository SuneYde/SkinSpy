import MonitorSidebar from "../components/monitorSidebar";
import MonitorBody from "../components/MonitorBody";
import styles from "../styles/pages/MonitorSkins.module.scss";
import UpgradeSubscriptionContainer from "../components/upgradeSubscriptionContainer";
import { useState } from "react";

const MonitorSkins = () => {
  const [isUpgradeSubscriptionOpen, setIsUpgradeSubscriptionOpen] =
    useState(false);
  return (
    <div className={styles.container}>
      {isUpgradeSubscriptionOpen ? (
        <div
          onClick={() => setIsUpgradeSubscriptionOpen(false)}
          className={`${styles.overlay} ${styles.overlayVisible}`}
        ></div>
      ) : (
        <div className={styles.overlay}></div>
      )}
      {isUpgradeSubscriptionOpen ? (
        <div
          className={`${styles.subscriptionUpgradeContainer} ${styles.open}`}
        >
          <UpgradeSubscriptionContainer
            setIsUpgradeSubscriptionOpen={setIsUpgradeSubscriptionOpen}
          />
        </div>
      ) : (
        <div className={styles.subscriptionUpgradeContainer}>
          <UpgradeSubscriptionContainer />
        </div>
      )}
      <div className={styles.filterBar}>
        <MonitorSidebar
          setIsUpgradeSubscriptionOpen={setIsUpgradeSubscriptionOpen}
        />
      </div>
      <div className={styles.content}>
        <MonitorBody
          setIsUpgradeSubscriptionOpen={setIsUpgradeSubscriptionOpen}
        />
      </div>
    </div>
  );
};

export default MonitorSkins;
