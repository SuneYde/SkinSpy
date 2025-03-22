import styles from "../styles/components/addMenu.module.scss";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";

const AddMenu = () => {
  const user = useSelector((state) => state.auth.user);

  const [unsortedSkins, setUnsortedSkins] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [skins, setSkins] = useState([]);
  const [currentPage, setCurrentPage] = useState(9);

  const [skinDataList, setSkinDataList] = useState([]);

  const [formData, setFormData] = useState({
    tradeUrl: user.tradeUrl ? user.tradeUrl : "",
    Wear: "Factory New",
    MinFloat: "",
    MaxFloat: "",
    MaxPrice: "",
    Pattern: "",
    Skin: "",
  });

  const [error, setError] = useState("");

  const [renderMorePossible, setRenderMorePossible] = useState(false);

  const wearOptions = [
    "Factory New",
    "Minimal Wear",
    "Field-Tested",
    "Well-Worn",
    "Battle-Scarred",
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const findSkins = async () => {
      try {
        const url = "http://localhost:3000/skins";
        const response = await fetch(url);
        const data = await response.json();
        setUnsortedSkins(data);
      } catch (error) {
        console.log(error);
      }
    };
    findSkins();
  }, []);

  useEffect(() => {
    const sortSkins = async () => {
      const filtered = unsortedSkins.filter((skin) => {
        const name = skin.skin.toLowerCase();
        return name.includes(userInput.toLowerCase());
      });

      const newSkins = filtered.slice(0, currentPage);
      setSkins(newSkins);
      if (filtered.length > currentPage) {
        setRenderMorePossible(true);
      }
    };

    sortSkins(); // just call it
  }, [unsortedSkins, userInput, currentPage]);

  useEffect(() => {
    if (formData.MinFloat > formData.MaxFloat) {
      setError("Min Float must be less than Max Float");
    } else {
      setError("");
    }

    if (formData.MaxFloat < formData.MinFloat) {
      setError("Max Float must be greater than Min Float");
    }

    if (formData.MaxPrice < 0) {
      setError("Max Price must be greater than 0");
    }

    for (let i = 0; i < formData.length; i++) {
      if (formData[i] === "") {
        setError("");
      }
    }
  }, [formData]);

  useEffect(() => {
    const minFloat = parseFloat(formData.MinFloat);
    const maxFloat = parseFloat(formData.MaxFloat);
    const floatRanges = {
      FactoryNew: [0, 0.07],
      MinimalWear: [0.07, 0.15],
      FieldTested: [0.15, 0.38],
      WellWorn: [0.38, 0.45],
      BattleScarred: [0.45, 1],
    };

    const findWear = (float) => {
      for (const wear in floatRanges) {
        const [min, max] = floatRanges[wear];
        if (float >= min && float <= max) {
          return wear;
        }
      }
      return "Unknown";
    };

    const minWear = findWear(minFloat);
    const maxWear = findWear(maxFloat);

    // You could now compare them and decide what to do
    console.log(`Min wear: ${minWear}, Max wear: ${maxWear}`);

    if (minWear !== maxWear) {
      setFormData((prev) => {
        return { ...prev, Wear: "Multiple" };
      });
      return;
    }
  }, [formData.MinFloat, formData.MaxFloat]);

  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(true);

  return (
    <div className={styles.container}>
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
                setFormData((prev) => {
                  return { ...prev, tradeUrl: e.target.value };
                })
              }
              placeholder="Paste your Steam Trade URL here"
            />
          </div>
          <button
            onClick={() =>
              setFormData((prev) => {
                return { ...prev, tradeUrl: "" };
              })
            }
            className={styles.btnInput}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      <div className={styles.lower}>
        <div className={styles.searchSkins}>
          <div className={styles.upperSearch}>
            <p className={styles.areaTitle}>Search skins</p>
            <div className={styles.searchInputContainer}>
              <div className={styles.searchIcon}>
                <i className="fa-solid fa-search"></i>
              </div>
              <input
                className={styles.searchInput}
                placeholder="Search for skins"
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.searchBody}>
            <div className={styles.weaponFormatted}>
              {skins.map((skin, index) => (
                <div key={index} className={styles.skinCard}>
                  <div className={styles.upperCard}>
                    <div
                      className={`${styles.rarity} ${
                        styles[skin.rarity.toLowerCase()]
                      }`}
                    ></div>
                    <div className={styles.wears}>
                      <div className={styles.wear}>
                        {(() => {
                          const firstKey = Object.keys(skin.wear_prices).at(-1);
                          const lastKey = Object.keys(skin.wear_prices)[0];

                          const getShort = (str) => {
                            const parts = str.includes("-")
                              ? str.split("-")
                              : str.includes(" ")
                              ? str.split(" ")
                              : [str];

                            return parts.map((p) => p[0]).join("");
                          };

                          return `${getShort(firstKey)} - ${getShort(lastKey)}`;
                        })()}
                      </div>
                    </div>
                  </div>
                  <div className={styles.weaponImg}>
                    <img
                      className={styles.img}
                      src={`${
                        skin.skin.includes("StatTrak")
                          ? `/images/${skin.skin
                              .split(" | ")[0]
                              .replace("Dual Berettas", "Dual-Berettas")
                              .split(" ")[1]
                              .replace(" ", "-")}-${(
                              skin.skin.split(" | ")[1] || ""
                            ).replace(" ", "-")}.png`
                          : skin.skin.includes("Souvenir")
                          ? `/images/${skin.skin
                              .split(" | ")[0]
                              .replace("Dual Berettas", "Dual-Berettas")
                              .split(" ")[1]
                              .replace("Souvenir", "")
                              .replace(" ", "-")}-${(
                              skin.skin.split(" | ")[1] || ""
                            )
                              .split(" (")[0]
                              .replaceAll(" ", "-")}.png`
                          : skin.skin.includes("Charm")
                          ? `/images/${(
                              skin.skin.split(" | ")[1] || ""
                            ).replaceAll(" ", "-")}.png`
                          : skin.skin.split(" ").at(-1).includes("Case") ||
                            skin.skin.split(" ").at(-2).includes("Case")
                          ? `/images/${skin.skin
                              .replaceAll(":", "")
                              .replaceAll(" ", "-")}.png`
                          : `/images/${skin.skin
                              .split(" | ")[0]
                              .replaceAll(" ", "-")}-${(
                              skin.skin.split(" | ")[1] || ""
                            ).replaceAll(" ", "-")}.png`
                      }`}
                    />
                  </div>
                  <div className={styles.lowerCard}>
                    <div className={styles.name}>{skin.skin}</div>
                    <div className={styles.priceRange}>
                      <span className={styles.dollarSign}>$</span>
                      <p className={styles.price}>
                        {(
                          Object.values(skin.wear_prices).at(-1) * 0.1341
                        ).toFixed(2)}{" "}
                        -{" "}
                        {(Object.values(skin.wear_prices)[0] * 0.1341).toFixed(
                          2
                        )}
                      </p>
                    </div>
                  </div>
                </div>
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
              <p
                className={`${styles.error} ${
                  error ? styles.errorShowing : ""
                }`}
              >
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
                  <div className={styles.inputAdvanced}>
                    <p className={styles.inputTitle}>Wear</p>
                    <div className={styles.customDropdown}>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={styles.choice}
                      >
                        {formData.Wear}
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
                              setFormData((prev) => {
                                return { ...prev, Wear: option };
                              });
                              setIsDropdownOpen(false);
                            }}
                          >
                            <p>{option}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={styles.inputAdvanced}>
                    <p className={styles.inputTitle}>Max Price</p>
                    <input
                      type="number"
                      value={formData.MaxPrice}
                      className={styles.advancedInput}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 0) {
                          setError("Invalid value");
                          return;
                        }

                        setError("");
                        setFormData((prev) => ({
                          ...prev,
                          MaxPrice: value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className={styles.inputContainerAdvanced}>
                  <div className={styles.inputAdvanced}>
                    <p className={styles.inputTitle}>Min Float</p>
                    <input
                      type="number"
                      value={formData.MinFloat}
                      className={styles.advancedInput}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 0 || value > 0.99) {
                          setError("Invalid Float");
                          return;
                        }

                        setError("");
                        setFormData((prev) => ({
                          ...prev,
                          MinFloat: value,
                        }));
                      }}
                    />
                  </div>
                  <div className={styles.inputAdvanced}>
                    <p className={styles.inputTitle}>Max Float</p>
                    <input
                      type="number"
                      className={styles.advancedInput}
                      value={formData.MaxFloat}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 0 || value > 0.99) {
                          setError("Invalid Float");
                          return;
                        }

                        setError("");
                        setFormData((prev) => ({
                          ...prev,
                          MaxFloat: value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className={styles.inputContainerAdvancedSolo}>
                  <div className={styles.inputAdvanced}>
                    <p className={styles.inputTitle}>Specific Pattern</p>
                    <input
                      type="number"
                      value={formData.Pattern}
                      className={styles.advancedInput}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < 0 || value > 999) {
                          setError("Invalid Pattern");
                          return;
                        }
                        setFormData((prev) => {
                          return { ...prev, Pattern: e.target.value };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.details}></div>
      </div>
    </div>
  );
};

export default AddMenu;
