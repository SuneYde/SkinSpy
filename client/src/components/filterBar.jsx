import styles from "../styles/components/Filterbar.module.scss";
import { useState, useEffect, useRef } from "react";
import typeSwitchesData from "../utils/typeSwitches";
import CustomDropdown from "./CustomDropdown";
import dropdownValuesData from "../utils/dropdownValues";
import dropdownStatusData from "../utils/dropdownStatus";
import csgoCollections from "../utils/csgoCollections";
import SearchQuery from "./searchQuery";

const Filterbar = ({ setResults, containerRef }) => {
  /* -------------------------------------------------------------------------- */
  /*                                  VARIABLES                                 */
  /* -------------------------------------------------------------------------- */

  // State for managing switches, dropdowns, and input values
  const [typeSwitches, setTypeSwitches] = useState(typeSwitchesData);
  const [dropdownValues, setDropdownValues] = useState(dropdownValuesData);
  const [dropdownStatus, setDropdownStatus] = useState(dropdownStatusData);
  const [unsortedSkins, setUnsortedSkins] = useState([]);
  const [displayedSkins, setDisplayedSkins] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(25);
  const [errors, setErrors] = useState({
    searchErrors: {
      noInput: {
        status: false,
        message: "Please enter a search",
      },
      notEnoughChars: {
        status: false,
        message: "Please enter at least 3 characters",
      },
    },
  });
  const [inputValues, setInputValues] = useState({
    minPrice: "",
    maxPrice: "",
    searchString: "",
  });
  const dropdownRef = useRef(null);
  const [clickedSkin, setClickedSkin] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                  USEEFFECT                                 */
  /* -------------------------------------------------------------------------- */

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownStatus({ Wear: false, SortBy: false, Collection: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const findSkins = async () => {
      try {
        const url = `http://localhost:3000/skins`;
        const response = await fetch(url);
        const data = await response.json();
        setUnsortedSkins(data);
      } catch (error) {
        console.error("Error fetching skins:", error);
      }
    };
    findSkins();
  }, []);

  useEffect(() => {
    const sortedSkins = getSortedSkins();
    setResults(sortedSkins);
    console.log(sortedSkins);
  }, [typeSwitches, dropdownValues, inputValues, unsortedSkins]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [containerRef]); // Only runs when containerRef changes

  useEffect(() => {
    const sortedSkins = getSortedSkins(); // Get all filtered & sorted skins
    const newSkins = sortedSkins.slice(0, (currentPage + 1) * pageSize);

    setDisplayedSkins((prevSkins) => [...prevSkins, ...newSkins]); // Append new data
    setResults(newSkins);
  }, [
    currentPage,
    unsortedSkins,
    typeSwitches,
    dropdownValues,
    inputValues,
    unsortedSkins,
  ]); // Trigger update when page or filters change

  useEffect(() => {
    const sortedSkinsList = getSortedSkins();
    setDisplayedSkins(sortedSkinsList);
  }, [
    inputValues,
    unsortedSkins,
    typeSwitches,
    dropdownValues,
    inputValues,
    unsortedSkins,
  ]);

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValues.searchString.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        searchErrors: {
          ...prevErrors.searchErrors,
          noInput: {
            ...prevErrors.searchErrors.noInput,
            status: true,
          },
        },
      }));
      return;
    }

    if (inputValues.searchString.length <= 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        searchErrors: {
          ...prevErrors.searchErrors,
          notEnoughChars: {
            ...prevErrors.searchErrors.notEnoughChars,
            status: true,
          },
        },
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        searchErrors: {
          ...prevErrors.searchErrors,
          noInput: {
            ...prevErrors.searchErrors.noInput,
            status: false,
          },
        },
      }));
      return;
    }

    if (errors.searchErrors) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        searchErrors: {
          ...prevErrors.searchErrors,
          noInput: {
            ...prevErrors.searchErrors.noInput,
            status: false,
          },
          notEnoughChars: {
            ...prevErrors.searchErrors.notEnoughChars,
            status: false,
          },
        },
      }));
    }

    let searchText = inputValues.searchString.toLowerCase();

    setResults(
      getSortedSkins().filter((skin) =>
        skin.skin.toLowerCase().includes(searchText)
      )
    );
  };

  // Function to increment price values
  const increment = (e) => {
    e.preventDefault();
    handlePriceChange(e.target.getAttribute("datatype"), 10);
  };

  // Function to decrement price values
  const decrement = (e) => {
    e.preventDefault();
    handlePriceChange(e.target.getAttribute("datatype"), -10);
  };

  const resetFilters = () => {
    setInputValues({ minPrice: "", maxPrice: "", searchString: "" });
    setTypeSwitches(typeSwitchesData);
    setDropdownValues(dropdownValuesData);
  };

  // Handle price changes with validation
  const handlePriceChange = (type, change) => {
    setInputValues((prevValues) => {
      const newValue = Number(prevValues[type]) + change;
      if (newValue < 0) return prevValues;
      if (type === "minPrice" && newValue > Number(prevValues.maxPrice))
        return prevValues;
      if (type === "maxPrice" && newValue < Number(prevValues.minPrice))
        return prevValues;
      return { ...prevValues, [type]: newValue };
    });
  };

  // Toggle function for type switches
  const toggleSwitch = (type) => {
    setTypeSwitches((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Handle dropdown toggling
  const toggleDropdown = (key) => {
    setDropdownStatus((prev) => {
      return { ...prev, [key]: !prev[key] };
    });
  };

  const getSortedSkins = () => {
    if (unsortedSkins.length === 0) return [];
    const filteredSkins = unsortedSkins.flatMap((skin) => {
      // Special handling for case items
      if (
        (skin.skin && skin.skin.split(" ").at(-1).includes("Case")) ||
        (skin.skin.split(" ").at(-2).includes("Case") && typeSwitches.Cases)
      ) {
        return [
          {
            id: skin._id,
            skin: skin.skin,
            price: skin.price || 0, // Ensure price is always a number
            rarity: skin.rarity,
            isCase: true, // Flag it as a case for easier identification
          },
        ];
      }

      if (skin.wear_prices) {
        return Object.entries(skin.wear_prices)
          .filter(([wear]) => {
            if (dropdownValues.Wear === "Any") return true;
            return wear.toLowerCase() === dropdownValues.Wear.toLowerCase();
          })
          .map(([wear, price]) => {
            return {
              id: skin._id,
              skin: skin.skin,
              price: price,
              rarity: skin.rarity,
              wear: wear,
            };
          });
      } else if (typeSwitches.Charms) {
        return [
          {
            id: skin._id,
            skin: skin.skin,
            price: skin.price,
            rarity: skin.rarity,
          },
        ];
      }

      // If it has a collection, include it
      if (skin.collection) {
        return [
          {
            id: skin._id,
            skin: skin.skin,
            price: skin.price,
            collection: skin.collection,
            rarity: skin.rarity,
          },
        ];
      }

      // Fallback for other cases
      return [
        {
          id: skin._id,
          skin: skin.skin,
          price: skin.price || 0, // Ensure price is always a number
          rarity: skin.rarity,
        },
      ];
    });

    const sortedSkins = filteredSkins.sort((a, b) => {
      const sortMode = dropdownValues.SortBy.toLowerCase();
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;

      if (sortMode === "highest price") {
        return priceB - priceA;
      }

      if (sortMode === "lowest price") {
        return priceA - priceB;
      }
      return 0;
    });
    const sortedSkins2 = sortedSkins.filter((skin) => {
      const name = String(skin.skin || "").toLowerCase();
      const knifeList = [
        "Bayonet",
        "Bowie Knife",
        "Butterfly Knife",
        "Falchion Knife",
        "Flip Knife",
        "Gut Knife",
        "Huntsman Knife",
        "Karambit",
        "M9 Bayonet",
        "Navaja Knife",
        "Nomad Knife",
        "Paracord Knife",
        "Shadow Daggers",
        "Skeleton Knife",
        "Stiletto Knife",
        "Survival Knife",
        "Talon Knife",
        "Ursus Knife",
      ];

      // If no typeSwitches are checked, return all items
      const activeFilters = Object.entries(typeSwitches)
        .filter(([_, checked]) => checked)
        .map(([type]) => type);

      if (activeFilters.length === 0) return true;

      return activeFilters.some((type) => {
        if (type === "Vanilla") {
          return (
            !name.includes("stattrak") &&
            !name.includes("souvenir") &&
            !name.includes("gloves") &&
            !name.includes("knife") &&
            !name.includes("charm") &&
            !name.includes("case") &&
            !name.includes("sticker") &&
            !name.includes("agent") &&
            !name.includes("pin") &&
            !name.includes("hand wraps") &&
            !name.includes("glove") &&
            !knifeList.some((knife) => name.includes(knife.toLowerCase()))
          );
        }

        if (type === "StatTrak") {
          return name.includes("stattrak");
        }

        if (type === "Cases") {
          return (
            name.split(" ").at(-1).includes("case") ||
            name.split(" ").at(-1).includes("2") ||
            (name.split(" ").at(-1).includes("3") && name.includes("case"))
          );
        }

        if (type === "Gloves") {
          return name.includes("gloves") || name.includes("hand wraps");
        }

        if (type === "Knives") {
          return knifeList.some((knife) => name.includes(knife.toLowerCase()));
        }

        if (type === "Charms") {
          return name.includes("charm");
        }

        if (type === "Souvenir") {
          return name.includes("souvenir");
        }

        if (type === "Agents") {
          return name.includes("agent");
        }

        if (type === "Pins") {
          return name.includes("pin");
        }

        return false;
      });
    });

    const sortedSkins3 = sortedSkins2.filter((skin) => {
      const collection = (skin.collection || "").toLowerCase();
      const selectedCollection = dropdownValues.Collection.toLowerCase();
      return selectedCollection === "any" || collection === selectedCollection;
    });
    const sortedSkins4 = sortedSkins3.filter((skin) => {
      const price = Number(skin.price) || 0;
      const minPrice = Number(inputValues.minPrice) || 0;
      const maxPrice = Number(inputValues.maxPrice) || Infinity;
      return price >= minPrice && price <= maxPrice;
    });
    return sortedSkins4;
  };
  /* -------------------------------------------------------------------------- */
  /*                                  COMPONENT                                 */
  /* -------------------------------------------------------------------------- */

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      {/* Search Bar Section */}
      <div className={styles.divContainer}>
        <button className={styles.submit} type="submit">
          <i className="fa-solid fa-database"></i>
          <span>Search Database</span>
        </button>
        <div
          className={`${styles.inputSearch} ${
            Object.values(errors.searchErrors).some((error) => error.status)
              ? styles.error
              : ""
          }`}
        >
          <i className="fa-light fa-search"></i>
          <input
            className={`${styles.input}`}
            type="text"
            onChange={(e) => {
              setClickedSkin(false);
              setInputValues((prev) => {
                return { ...prev, searchString: e.target.value };
              });
            }}
            value={inputValues.searchString}
            placeholder="Search for skins..."
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setSearchOpen(false)}
          />
        </div>
        {errors.searchErrors &&
          Object.entries(errors.searchErrors).map(([key, error]) =>
            error.status ? (
              <p key={key} className={styles.errorText}>
                {error.message}
              </p>
            ) : null
          )}
        <div
          className={`${styles.searchRecommendations} ${
            inputValues.searchString && !clickedSkin && searchOpen
              ? styles.visibleActve
              : ""
          }`}
        >
          <SearchQuery
            inputValues={inputValues}
            setInputValues={setInputValues}
            setClickedSkin={setClickedSkin}
          />
        </div>
      </div>
      <div className={styles.divider}></div>

      {/* Type Switches */}
      <div className={styles.divContainer}>
        <p className={styles.divLabel}>Type</p>
        <div className={styles.switches}>
          {Object.keys(typeSwitches).map((type) => (
            <div
              className={styles.switchContainer}
              onClick={() => toggleSwitch(type)}
              key={type}
            >
              <label className={styles.switchLabel}>{type}</label>
              <div className={styles.switchContainerDiv}>
                <div className={styles.off}>
                  <div
                    className={`${styles.iconVertical} ${
                      typeSwitches[type] ? styles.isOfflineVertical : ""
                    }`}
                  ></div>
                </div>
                <div
                  className={`${styles.on} ${
                    typeSwitches[type] ? "" : styles.isOffline
                  }`}
                >
                  <i className="fa-regular fa-circle"></i>
                </div>
                <div
                  className={`${styles.switch} ${
                    typeSwitches[type] ? styles.activeSwitch : ""
                  }`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.divider}></div>

      {/* Dropdowns (Wear, Sort By, Collection) */}
      {[
        {
          label: "Wear",
          key: "Wear",
          options: [
            "Any",
            "Factory New",
            "Minimal Wear",
            "Field-Tested",
            "Well-Worn",
            "Battle-Scared",
          ],
        },
        {
          label: "Sort By",
          key: "SortBy",
          options: ["Highest Price", "Lowest Price"],
        },
        { label: "Collection", key: "Collection", options: csgoCollections },
      ].map(({ label, key, options }) => (
        <div key={key} className={styles.divContainer}>
          <p className={styles.divLabel}>{label}</p>
          <div className={styles.customDropdown}>
            <div
              onClick={() => toggleDropdown(key)}
              className={styles.inputDropdown}
            >
              <p className={styles.dropdownText}>{dropdownValues[key]}</p>
              <i className="fa-solid fa-caret-down"></i>
            </div>
            <div
              className={`${styles.dropdownContainer} ${
                dropdownStatus[key] ? styles.activeDropdown : ""
              }`}
              ref={dropdownRef}
            >
              <CustomDropdown
                options={options}
                setSelected={(option) =>
                  setDropdownValues((prev) => ({ ...prev, [key]: option }))
                }
                setDropdownStatus={setDropdownStatus}
                type={key}
              />
            </div>
          </div>
        </div>
      ))}
      <div className={styles.divider}></div>

      {/* Price Range Section */}
      <div className={styles.divContainer}>
        <p className={styles.divLabel}>Price Range</p>
        {["minPrice", "maxPrice"].map((type) => (
          <div key={type} className={styles.priceContainer}>
            <div className={styles.dollarIcon}>$</div>
            <input
              type="number"
              className={styles.priceInput}
              placeholder={`${type === "minPrice" ? "Min" : "Max"} Price`}
              value={inputValues[type]}
              onChange={(e) =>
                setInputValues({ ...inputValues, [type]: e.target.value })
              }
            />
            <button
              className={styles.decrementBtn}
              datatype={type}
              onClick={decrement}
            >
              -
            </button>
            <button
              className={styles.incrementBtn}
              datatype={type}
              onClick={increment}
            >
              +
            </button>
          </div>
        ))}
      </div>
      <div className={styles.divider}></div>

      {/* Reset Filters Button */}
      <button onClick={resetFilters} className={styles.resetBtn}>
        Reset Filters
      </button>
    </form>
  );
};

export default Filterbar;
