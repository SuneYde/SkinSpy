import styles from "../styles/components/MonitorBody.module.scss";
import UpgradeSubscriptionContainer from "./upgradeSubscriptionContainer";
import { useState } from "react";
import AddMenu from "./addMenu";
const MonitorBody = ({ setIsUpgradeSubscriptionOpen, userPlan }) => {
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(9);
  const [selectedSkin, setSelectedSkin] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [isInfoBarOpen, setIsInfoBarOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div
        className={`${styles.addMenu} ${isAddMenuOpen ? styles.isVisible : ""}`}
      >
        <AddMenu
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setIsAddMenuOpen={setIsAddMenuOpen}
          selectedSkin={selectedSkin}
          setSelectedSkin={setSelectedSkin}
          userInput={userInput}
          setUserInput={setUserInput}
          isInfoBarOpen={isInfoBarOpen}
          setIsInfoBarOpen={setIsInfoBarOpen}
        />
      </div>
      <div
        onClick={() => {
          setIsAddMenuOpen(false);
          setCurrentPage(9);
          setSelectedSkin(null);
          setUserInput("");
        }}
        className={`${styles.overlay} ${
          isAddMenuOpen ? styles.overlayVisible : ""
        }`}
      ></div>
      <div className={styles.upperContainer}>
        <div className={styles.logs}>
          <div className={styles.header}>
            <h2 className={styles.title}>Monitored Skins</h2>
          </div>
          <div className={styles.body}></div>
        </div>
        <div className={styles.events}>
          <div className={styles.header}>
            <h2 className={styles.title}>Events</h2>
          </div>
          <div className={styles.body}></div>
        </div>
        <div className={styles.info}>
          <div className={styles.header}>
            <h2 className={styles.title}>Info</h2>
          </div>
          <div className={styles.body}></div>
        </div>
      </div>
      <div className={styles.lowerContainer}>
        <div className={styles.skinList}>
          <div className={styles.header}>
            <div className={styles.leftSide}>
              <h2 className={styles.title}>Sessions</h2>
              {userPlan === "Free" && (
                <button
                  className={styles.boost}
                  onClick={() => setIsUpgradeSubscriptionOpen(true)}
                >
                  <span>Boost Buy Positions</span>
                  <div className={styles.icon}>
                    <i className="fa-light fa-bolt"></i>
                  </div>
                </button>
              )}
            </div>
            <div className={styles.rightSide}>
              <button
                onClick={() => setIsAddMenuOpen(true)}
                className={styles.addSkin}
              >
                Create Sessioon
              </button>
              <button className={styles.refresh}>Edit</button>
            </div>
          </div>
          <div className={styles.body}></div>
        </div>
      </div>
    </div>
  );
};

export default MonitorBody;
