import styles from "../../styles/components/addMenu.module.scss";
import SkinCard from "./SkinCard";

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
                    setSkinData({
                      Wear: "Factory New",
                      MinFloat: "",
                      MaxFloat: "",
                      MaxPrice: "",
                      Pattern: "",
                    });
                  } else {
                    setSelectedSkin(skin.skin);
                    setSkinData({
                      Wear: "Factory New",
                      MinFloat: "",
                      MaxFloat: "",
                      MaxPrice: "",
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
