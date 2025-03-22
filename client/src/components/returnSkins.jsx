import styles from "../styles/components/returnSkins.module.scss";
import { useEffect, useRef, useState } from "react";

const ReturnSkins = ({ results }) => {
  const headerRef = useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.header} ref={headerRef}>
        <div className={styles.headSkin}>
          <p className={styles.skinHeadText}>Skin</p>
        </div>
        <p className={styles.head}>Wear</p>
        <p className={styles.head}>Buy Price</p>
        <p className={styles.head}>Steam Price</p>
        <p className={styles.head}>Link</p>
      </div>
      <div className={styles.results}>
        {results.map((result, index) => (
          <div key={index} className={styles.row}>
            <div className={styles.skin}>
              <div className={styles.rarityVisualiser}>
                <div
                  className={`${styles.strip} ${styles[result.rarity]}`}
                ></div>
                <div
                  className={`${styles.fade} ${styles[`${result.rarity}fade`]}`}
                ></div>
                <div className={styles.imgContainer}>
                  <img
                    className={styles.img}
                    src={`${
                      result.skin.includes("StatTrak")
                        ? `/images/${result.skin
                            .split(" | ")[0]
                            .replace("Dual Berettas", "Dual-Berettas")
                            .split(" ")[1]
                            .replace(" ", "-")}-${(
                            result.skin.split(" | ")[1] || ""
                          ).replace(" ", "-")}.png`
                        : result.skin.includes("Souvenir")
                        ? `/images/${result.skin
                            .split(" | ")[0]
                            .replace("Dual Berettas", "Dual-Berettas")
                            .split(" ")[1]
                            .replace("Souvenir", "")
                            .replace(" ", "-")}-${(
                            result.skin.split(" | ")[1] || ""
                          )
                            .split(" (")[0]
                            .replaceAll(" ", "-")}.png`
                        : result.skin.includes("Charm")
                        ? `/images/${(
                            result.skin.split(" | ")[1] || ""
                          ).replaceAll(" ", "-")}.png`
                        : result.skin.split(" ").at(-1).includes("Case") ||
                          result.skin.split(" ").at(-2).includes("Case")
                        ? `/images/${result.skin
                            .replaceAll(":", "")
                            .replaceAll(" ", "-")}.png`
                        : `/images/${result.skin
                            .split(" | ")[0]
                            .replaceAll(" ", "-")}-${(
                            result.skin.split(" | ")[1] || ""
                          ).replaceAll(" ", "-")}.png`
                    }`}
                  />
                </div>
              </div>
              <div className={styles.skinText}>
                <p className={styles.weapon}>{result.skin.split(" | ")[0]}</p>
                <p className={styles.skinName}>{result.skin.split(" | ")[1]}</p>
              </div>
            </div>
            <p className={styles.bodyLab}>{result.wear}</p>
            <p className={styles.bodyLab}>
              €{(result.price * 0.1341).toFixed(2)}
            </p>
            <p className={styles.bodyLab}>
              €{((result.price / 0.7) * 0.1341).toFixed(2)}
            </p>
            <a
              className={styles.bodyLab}
              href={`${
                result.skin.includes("StatTrak")
                  ? `https://steamcommunity.com/market/listings/730/${result.skin.replace(
                      " ",
                      "%E2%84%A2 "
                    )}%20%28${result.wear}%29`
                  : result.skin.includes("Souvenir")
                  ? `https://steamcommunity.com/market/listings/730/${result.skin.replace(
                      " (Souvenir)",
                      ""
                    )}%20%28${result.wear}%29`
                  : result.skin.includes("Charm")
                  ? `https://steamcommunity.com/market/listings/730/${result.skin}`
                  : `https://steamcommunity.com/market/listings/730/${result.skin}%20%28${result.wear}%29`
              }`}
              target="_blank"
              rel="noreferrer"
            >
              <button className={styles.linkBtn}>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReturnSkins;
