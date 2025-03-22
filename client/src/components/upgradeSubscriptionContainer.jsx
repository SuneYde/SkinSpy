import styles from "../styles/components/upgradeSubscriptionContainer.module.scss";

const UpgradeSubscriptionContainer = ({ setIsUpgradeSubscriptionOpen }) => {
  const features = [
    "Priority queue for faster purchases",
    "No transaction fees",
    "Expanded skin list capacity",
    "Advanced float & pattern filtering",
    "Multi-account support",
    "No spending limits",
    "Access to multiple marketplaces",
    "Documentation access",
  ];
  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div className={styles.bannerContainer}>
          <div className={styles.logo}>
            <i className="fa-solid fa-user-secret"></i>
            <span>SkinSpy</span>
          </div>
          <h1 className={styles.title}>
            <span className={styles.maximizeText}>Maximize </span>
            your profits with Plus
          </h1>
        </div>
      </div>
      <div className={styles.sellingPointContainer}>
        <div className={styles.topTitel}>
          <p className={styles.sellingTitle}>Upgrade to Plus</p>
          <div
            className={styles.close}
            onClick={() => setIsUpgradeSubscriptionOpen(false)}
          >
            <i className="fa-regular fa-xmark"></i>
          </div>
        </div>
        <ul className={styles.sellingPoints}>
          {features.map((feature, index) => (
            <li key={index} className={styles.sellingPoint}>
              <i className="fa-regular fa-check"></i>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className={styles.buttons}>
          <button className={styles.upgradeBtn}>
            <i className="fa-light fa-rocket-launch"></i>
            <span>Upgrade</span>
          </button>
          <span className={styles.learnMore}>Learn More</span>
        </div>
        <p className={styles.information}>
          You will be charged 39.99$ today which will start a new billing cycle.
          For more information read our{" "}
          <span className={styles.link}>Terms</span> and{" "}
          <span className={styles.link}>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default UpgradeSubscriptionContainer;
