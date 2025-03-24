import styles from "../../styles/components/addMenu.module.scss";
import SkinListCard from "./SkinListCard";

const SkinList = ({
  selectedSkins,
  setSelectedSkins,
  setTotalValue,
  setUnCheckedSkins,
}) => {
  const handleRemove = (skinToRemove) => {
    setTotalValue((prev) => prev - skinToRemove.maxPrice);

    setSelectedSkins((prev) =>
      prev.filter(
        (s) =>
          !(
            s.skin === skinToRemove.skin && s.maxPrice === skinToRemove.maxPrice
          )
      )
    );

    setUnCheckedSkins((prev) =>
      prev.filter((s) => s.skin !== skinToRemove.skin)
    );
  };

  return (
    <div className={styles.skinList}>
      <div className={styles.header}>
        <p className={styles.skinName}>Skinlist</p>
        <p className={styles.totalValue}>
          Total Skin Value:{" "}
          <span className={styles.value}>
            $
            {selectedSkins
              .reduce((acc, cur) => acc + Number(cur.maxPrice), 0)
              .toFixed(2)}
          </span>
        </p>
      </div>

      <div className={styles.skinListBody}>
        {selectedSkins.map((skin, index) => (
          <SkinListCard key={index} skin={skin} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default SkinList;
