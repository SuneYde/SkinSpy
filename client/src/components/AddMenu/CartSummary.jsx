import styles from "../../styles/components/addMenu.module.scss";

const CartSummary = ({ getTotalValue }) => {
  const feePercentage = 0.05;
  const serviceFee = getTotalValue * feePercentage;
  const totalWithFee = getTotalValue + serviceFee;

  return (
    <div className={styles.cartSummary}>
      <div className={styles.topSummary}>
        <p className={styles.total}>Total</p>
        <div className={styles.totalAmount}>
          <span className={styles.currency}>$</span>
          <p className={styles.valueAmount}>{totalWithFee.toFixed(2)}</p>
        </div>
      </div>

      <div className={styles.cartInfo}>
        <p className={styles.totalSkinsValue}>Skins Value</p>
        <p className={styles.totalSkinsValue}>{getTotalValue.toFixed(2)}</p>
      </div>

      <div className={styles.cartInfo}>
        <p className={styles.totalSkinsValue}>Service Fee</p>
        <p className={styles.totalSkinsValue}>5%</p>
      </div>

      <div className={styles.cartInfo}>
        <p className={styles.totalSkinsValue}>Amount Added to balance</p>
        <p className={styles.totalSkinsValue}>{totalWithFee.toFixed(2)}</p>
      </div>

      <button className={styles.addSkins}>Add Skins</button>
    </div>
  );
};

export default CartSummary;
