import styles from "../styles/components/TopBar.module.scss";
import { useSelector } from "react-redux";

const TopBar = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.balance}>
          <div className={styles.inner}>
            <div className={styles.icon}>$</div>
            <div className={styles.amount}>
              {isLoading ? "..." : user?.balance.toFixed(2)}
            </div>
          </div>
          <button className={styles.addMoney}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className={styles.notifications}>
          <div className={styles.blop}></div>
          <i className="fa-solid fa-bell"></i>
        </div>
        <div className={styles.avatar}></div>
      </div>
    </div>
  );
};

export default TopBar;
