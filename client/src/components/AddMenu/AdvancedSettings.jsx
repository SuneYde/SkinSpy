import styles from "../../styles/components/addMenu.module.scss";

const AdvancedInput = ({ title, value, onChange, type = "number" }) => (
  <div className={styles.inputAdvanced}>
    <p className={styles.inputTitle}>{title}</p>
    <input
      type={type}
      value={value}
      className={styles.advancedInput}
      onChange={onChange}
    />
  </div>
);

const AdvancedSettings = ({
  skinData,
  setSkinData,
  isDropdownOpen,
  setIsDropdownOpen,
  dropdownRef,
  error,
  wearOptions,
  isAdvancedSettingsOpen,
  setIsAdvancedSettingsOpen,
  setError,
}) => {
  return (
    <div
      className={`${styles.advancedSettings} ${
        isAdvancedSettingsOpen ? styles.isUnFolded : ""
      }`}
    >
      <div
        className={styles.topAdvanced}
        onClick={() => setIsAdvancedSettingsOpen((prev) => !prev)}
      >
        <p className={styles.areaTitle}>Advanced Settings</p>
        <p className={`${styles.error} ${error ? styles.errorShowing : ""}`}>
          {error}
        </p>
        <div
          className={`${styles.lowerIcon} ${
            isAdvancedSettingsOpen ? styles.rotate : ""
          }`}
        >
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>

      {isAdvancedSettingsOpen && (
        <div className={styles.advancedBody}>
          <div className={styles.inputContainerAdvanced}>
            {/* Wear Dropdown */}
            <div className={styles.inputAdvanced}>
              <p className={styles.inputTitle}>Wear</p>
              <div className={styles.customDropdown}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={styles.choice}
                >
                  {skinData.Wear}
                </button>
                <div
                  className={`${styles.dropdownMenu} ${
                    isDropdownOpen ? styles.open : ""
                  }`}
                  ref={dropdownRef}
                >
                  {wearOptions.map((option, index) => (
                    <div
                      key={index}
                      className={styles.option}
                      onClick={() => {
                        setSkinData((prev) => ({ ...prev, Wear: option }));
                        setIsDropdownOpen(false);
                      }}
                    >
                      <p>{option}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Max Price */}
            <AdvancedInput
              title="Max Price"
              value={skinData.MaxPrice}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value < 0) {
                  setError("Invalid value");
                  return;
                }
                setError("");
                setSkinData((prev) => ({ ...prev, MaxPrice: value }));
              }}
            />
          </div>

          <div className={styles.inputContainerAdvanced}>
            {/* Min Float */}
            <AdvancedInput
              title="Min Float"
              value={skinData.MinFloat}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value < 0 || value > 0.99) {
                  setError("Invalid Float");
                  return;
                }
                setError("");
                setSkinData((prev) => ({ ...prev, MinFloat: value }));
              }}
            />

            {/* Max Float */}
            <AdvancedInput
              title="Max Float"
              value={skinData.MaxFloat}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value < 0 || value > 0.99) {
                  setError("Invalid Float");
                  return;
                }
                setError("");
                setSkinData((prev) => ({ ...prev, MaxFloat: value }));
              }}
            />
          </div>

          {/* Pattern Input Solo */}
          <div className={styles.inputContainerAdvancedSolo}>
            <AdvancedInput
              title="Specific Pattern"
              value={skinData.Pattern}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (value < 0 || value > 999) {
                  setError("Invalid Pattern");
                  return;
                }
                setSkinData((prev) => ({
                  ...prev,
                  Pattern: e.target.value,
                }));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettings;
