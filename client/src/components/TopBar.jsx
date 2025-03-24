import { useEffect, useState } from "react";
import styles from "../styles/components/TopBar.module.scss";
import { useSelector } from "react-redux";
import { api } from "../api/api";
import getUserBalance from "../Helper/getUserBalance";

const TopBar = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const [balance, setBalance] = useState();
  useEffect(() => {
    const getBalance = async () => {
      const balance = await getUserBalance();
      setBalance(balance);
    };
    getBalance();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.details}>
        <div className={styles.balance}>
          <div className={styles.inner}>
            <div className={styles.icon}>$</div>
            <div className={styles.amount}>
              {isLoading || balance == null ? "..." : `${balance.toFixed(2)}`}
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
