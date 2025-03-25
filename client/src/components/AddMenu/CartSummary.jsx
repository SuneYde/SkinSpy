import { useEffect, useState } from "react";
import styles from "../../styles/components/addMenu.module.scss";
import validateOrder from "../../Helper/validateOrder";
import { useSelector } from "react-redux";
import sendMonitorData from "../../Helper/sendMonitorData";
import { getBalance } from "../../redux/balanceActions";
import { useDispatch } from "react-redux";

const CartSummary = ({
  getTotalValue,
  userBalance,
  selectedSkins,
  setIsAddMenuOpen,
}) => {
  const dispatch = useDispatch();
  const feePercentage = 0.05;
  const serviceFee = getTotalValue * feePercentage;
  const totalWithFee = getTotalValue + serviceFee;
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  useEffect(() => {
    console.log(selectedSkins);
  }, [selectedSkins]);

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Submit started, loading set to true");

    if (selectedSkins.length <= 0) {
      setError("Please add skins to the cart");
      setLoading(false);
      console.log("Error: No skins selected, loading set to false");
      return;
    }

    if (!user) {
      setError("Please login to continue");
      setLoading(false);
      console.log("Error: User not logged in, loading set to false");
      return;
    }

    const order = selectedSkins.map((skin) => ({
      maxFloat: skin.maxFloat,
      minFloat: skin.minFloat,
      maxPrice: skin.maxPrice,
      pattern: skin.pattern,
      skin: skin.skin,
    }));

    let response;
    try {
      response = await validateOrder(order);
      if (!response) {
        throw new Error("Failed to validate order");
      }
    } catch (err) {
      console.error("validateOrder failed:", err);
      setError("Not enough balance");
      setLoading(false);
      console.log("Error: Validation failed, loading set to false");
      return;
    }

    if (response.error) {
      setError("Not enough balance");
      setLoading(false);
      console.log("Error: Not enough balance, loading set to false");
      return;
    }

    if (response.success) {
      console.log("Order successfully validated, proceeding to payment");
      try {
        await sendMonitorData(totalWithFee, selectedSkins);
        dispatch(getBalance());
      } catch (error) {
        console.error("sendMonitorData failed:", error);
        setError("Failed to send monitor data");
      }
    }

    setLoading(false);
    setIsAddMenuOpen(false);
    console.log("Process completed, loading set to false");
  };

  return (
    <div className={styles.cartSummary}>
      {error && <p className={styles.errorText}>{error}</p>}
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
        <p className={styles.totalSkinsValue}>Required Available Balance</p>
        <p className={styles.totalSkinsValue}>{totalWithFee.toFixed(2)}</p>
      </div>

      <button
        className={styles.addSkins}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Loading..."
          : Number(userBalance) >= totalWithFee
          ? "Add Skins"
          : "Deposit Balance"}
      </button>
    </div>
  );
};

export default CartSummary;
