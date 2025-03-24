import styles from "../../styles/components/addMenu.module.scss";

const InfoBar = ({ isInfoBarOpen, setIsInfoBarOpen }) => {
  return (
    <div className={styles.detailsTop}>
      <p className={styles.areaTitle}>Details</p>
      <button
        className={styles.infoBar}
        onClick={() => setIsInfoBarOpen((prev) => !prev)}
      >
        <span>How Monitoring Charges Work</span>
        <div
          className={`${styles.arrowIcon} ${
            isInfoBarOpen ? styles.rotate : ""
          }`}
        >
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </button>

      {isInfoBarOpen && (
        <ul className={styles.infoBarContainer}>
          <li className={styles.info}>
            <div className={styles.iconInfo}>
              <i className="fa-solid fa-circle"></i>
            </div>
            The amount is added to your account balance to be available if we
            find the skins. If you withdraw to your bank account with an active
            monitoring session, the monitoring session will be cancelled.
          </li>
          <li className={styles.info}>
            <div className={styles.iconInfo}>
              <i className="fa-solid fa-circle"></i>
            </div>
            Your balance can be viewed on the site and can be withdrawn anytime
            via the Wallet tab to your linked bank account.
          </li>
          <li className={styles.info}>
            <div className={styles.iconInfo}>
              <i className="fa-solid fa-circle"></i>
            </div>
            If a skin is found, the amount you bought it for will be subtracted
            from your account balance, and the skin will be added to your
            inventory.
          </li>
          <li className={styles.info}>
            <div className={styles.iconInfo}>
              <i className="fa-solid fa-circle"></i>
            </div>
            If you have any questions, please contact us via the support.
          </li>
        </ul>
      )}
    </div>
  );
};

export default InfoBar;
