import styles from "../../styles/components/addMenu.module.scss";

const TradeUrlInput = ({ formData, setFormData }) => {
  return (
    <div className={styles.upper}>
      <p className={styles.areaTitle}>Steam Trade URL for this session</p>
      <div className={styles.inputContainer}>
        <div className={styles.mainInput}>
          <div className={styles.icon}>
            <i className="fa-solid fa-link"></i>
          </div>
          <input
            className={styles.input}
            value={formData.tradeUrl}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                tradeUrl: e.target.value,
              }))
            }
            placeholder="Paste your Steam Trade URL here"
          />
        </div>
        <button
          onClick={() => setFormData((prev) => ({ ...prev, tradeUrl: "" }))}
          className={styles.btnInput}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default TradeUrlInput;
