import styles from "../../styles/components/addMenu.module.scss";
import SkinCard from "./SkinCard";
import currencyAdapter from "../../Helper/currencyAdapter";

const SkinSearch = ({
  skins,
  selectedSkin,
  setSelectedSkin,
  setSkinData,
  userInput,
  setUserInput,
  renderMorePossible,
  setCurrentPage,
  addSkin,
}) => {
  return (
    <div className={styles.upperSearch}>
      <div className={styles.topSearch}>
        <p className={styles.areaTitle}>Search skins</p>
        <div className={styles.topButtons}>
          <button className={styles.addSkin} onClick={addSkin}>
            <i className="fa-regular fa-plus"></i>
            <span>Add Skin</span>
          </button>
          <button className={styles.filter}>
            <i className="fa-regular fa-filter"></i>
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className={styles.searchInputContainer}>
        <div className={styles.searchIcon}>
          <i className="fa-solid fa-search"></i>
        </div>
        <input
          className={styles.searchInput}
          placeholder="Search for skins"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>

      <div className={styles.searchBody}>
        <div className={styles.weapons}>
          <div className={styles.weaponFormatted}>
            {skins.map((skin, index) => (
              <SkinCard
                key={index}
                skin={skin}
                isSelected={selectedSkin === skin.skin}
                onSelect={() => {
                  if (selectedSkin === skin.skin) {
                    setSelectedSkin(null);
                    const skinRaw = skins.find((s) => s.skin === skin.skin);
                    console.log(skinRaw);
                    const suggestedPrice =
                      skinRaw.wear_prices[skinRaw.wear_prices.length - 1];
                    const formattedPrice = suggestedPrice * 0.1341;
                    setSkinData({
                      Wear: "Any",
                      MinFloat: "",
                      MaxFloat: "",
                      MaxPrice: formattedPrice,
                      Pattern: "",
                    });
                  } else {
                    setSelectedSkin(skin.skin);
                    const skinRaw = skins.find((s) => s.skin === skin.skin);
                    console.log(skinRaw);
                    const wearValues = Object.values(skinRaw.wear_prices);
                    const suggestedPrice = wearValues[wearValues.length - 1];
                    const formattedPrice = suggestedPrice * 0.1341;
                    setSkinData({
                      Wear: "Any",
                      MinFloat: "",
                      MaxFloat: "",
                      MaxPrice: formattedPrice,
                      Pattern: "",
                    });
                  }
                }}
              />
            ))}
          </div>

          {renderMorePossible && (
            <div className={styles.moreDiv}>
              <button
                className={styles.renderMore}
                onClick={() => setCurrentPage((prev) => prev + 9)}
              >
                <span>Render More</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinSearch;
