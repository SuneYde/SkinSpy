import styles from "../../styles/components/addMenu.module.scss";
import sanitizer from "../../Helper/Sanitizer";
import currencyAdapter from "../../Helper/currencyAdapter";

const SkinCard = ({ skin, isSelected, onSelect }) => {
  const renderImageSrc = (input) => {
    const sanitized = sanitizer(input.skin);
    if (!sanitized || !sanitized.includes(" | ")) return "/images/default.png";
    const format = (str) => str.replaceAll(" ", "-").replaceAll(":", "");

    if (sanitized.includes("StatTrak")) {
      const weaponName = sanitized
        .split(" | ")[0]
        .replace("StatTrak", "")
        .trim();
      return `/images/${format(weaponName)}-${format(
        sanitized.split(" | ")[1]
      )}.png`;
    }
    if (sanitized.includes("Souvenir")) {
      const weaponName = sanitized
        .split(" | ")[0]
        .replace("Souvenir", "")
        .trim();
      return `/images/${format(weaponName)}-${format(
        sanitized.split(" | ")[1].split(" (")[0]
      )}.png`;
    }
    if (sanitized.includes("Charm")) {
      return `/images/${format(sanitized.split(" | ")[1])}.png`;
    }
    if (sanitized.includes("Case") && !sanitized.includes("Hardened")) {
      return `/images/${format(sanitized).replace(" | ", "-")}.png`;
    }

    return `/images/${format(sanitized.split(" | ")[0])}-${format(
      sanitized.split(" | ")[1].replace(" | ", "-")
    )}.png`;
  };

  const renderShortWear = (skin) => {
    const getShort = (str) => {
      const parts = str.includes("-")
        ? str.split("-")
        : str.includes(" ")
        ? str.split(" ")
        : [str];
      return parts.map((p) => p[0]).join("");
    };
    const keys = Object.keys(skin.wear_prices);
    return `${getShort(keys.at(-1))} - ${getShort(keys[0])}`;
  };

  return (
    <div
      className={`${styles.skinCard} ${isSelected ? styles.selected : ""}`}
      onClick={onSelect}
    >
      <div className={styles.upperCard}>
        <div
          className={`${styles.rarity} ${styles[skin.rarity.toLowerCase()]}`}
        ></div>
        <div className={styles.wears}>
          <div className={styles.wear}>{renderShortWear(skin)}</div>
        </div>
      </div>
      <div className={styles.weaponImg}>
        <img
          className={styles.img}
          src={renderImageSrc(skin)}
          alt={skin.skin}
        />
      </div>
      <div className={styles.lowerCard}>
        <div
          className={`${styles.name} ${
            skin.skin.includes("StatTrak")
              ? styles.stattrak
              : skin.skin.includes("Souvenir")
              ? styles.souvenir
              : skin.skin.includes("Knife") ||
                skin.skin.includes("Glove") ||
                skin.skin.includes("Karambit") ||
                skin.skin.includes("Bayonet") ||
                skin.skin.includes("M9") ||
                skin.skin.includes("Talon") ||
                skin.skin.includes("Skeleton")
              ? styles.rare
              : ""
          }`}
        >
          {skin.skin}
        </div>
        <div className={styles.priceRange}>
          <span className={styles.dollarSign}>$</span>
          <p className={styles.price}>
            {currencyAdapter(Object.values(skin.wear_prices).at(-1))} -{" "}
            {currencyAdapter(Object.values(skin.wear_prices)[0])}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkinCard;
