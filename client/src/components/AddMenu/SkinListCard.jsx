import styles from "../../styles/components/addMenu.module.scss";
import sanitizer from "../../Helper/Sanitizer";

const SkinListCard = ({ skin, onRemove }) => {
  const renderImageSrc = (input) => {
    const sanitized = sanitizer(input.skin);
    if (!sanitized || !sanitized.includes(" | ")) return "/images/default.png";
    const format = (str) => str.replaceAll(" ", "-").replaceAll(":", "");

    if (sanitized.includes("StatTrak")) {
      return `/images/${format(
        sanitized.split(" | ")[0].split(" ")[1]
      )}-${format(sanitized.split(" | ")[1])}.png`;
    }
    if (sanitized.includes("Souvenir")) {
      return `/images/${format(
        sanitized.split(" | ")[0].split(" ")[1]
      )}-${format(sanitized.split(" | ")[1].split(" (")[0])}.png`;
    }
    if (sanitized.includes("Charm")) {
      return `/images/${format(sanitized.split(" | ")[1])}.png`;
    }
    if (sanitized.includes("Case")) {
      return `/images/${format(sanitized)}.png`;
    }

    return `/images/${format(sanitized.split(" | ")[0])}-${format(
      sanitized.split(" | ")[1]
    )}.png`;
  };

  return (
    <div className={styles.skinListCard}>
      <div className={styles.leftContent}>
        <div className={styles.imgContainer2}>
          <img
            className={styles.img}
            src={renderImageSrc({ skin: skin.skin })}
            alt={skin.skin}
          />
        </div>
        <div className={styles.weaponInfo}>
          <p className={styles.wantedPrice}>
            Wanted for under: <span className={styles.currency}>$</span>
            {skin.maxPrice.toFixed(2)} | FloatRange: {skin.minFloat} -{" "}
            {skin.maxFloat}
            {skin.pattern && ` | Pattern: ${skin.pattern}`}
          </p>
          <p className={styles.skinName}>{skin.skin}</p>
        </div>
      </div>
      <button className={styles.removeBtn} onClick={() => onRemove(skin)}>
        <i className="fa-regular fa-trash"></i>
      </button>
    </div>
  );
};

export default SkinListCard;
