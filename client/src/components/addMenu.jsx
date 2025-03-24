// Updated AddMenu.jsx after refactoring
import styles from "../styles/components/addMenu.module.scss";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import sanitizer from "../Helper/Sanitizer";

// Component Imports
import TradeUrlInput from "./AddMenu/TradeUrlInput";
import SkinSearch from "./AddMenu/SkinSearch";
import AdvancedSettings from "./AddMenu/AdvancedSettings";
import InfoBar from "./AddMenu/InfoBar";
import SkinList from "./AddMenu/SkinList";
import CartSummary from "./AddMenu/CartSummary";

const AddMenu = ({
  setCurrentPage,
  currentPage,
  selectedSkin,
  setSelectedSkin,
  userInput,
  setUserInput,
  isInfoBarOpen,
  setIsInfoBarOpen,
}) => {
  const user = useSelector((state) => state.auth.user);
  const [unsortedSkins, setUnsortedSkins] = useState([]);
  const [skins, setSkins] = useState([]);
  const [error, setError] = useState("");
  const [renderMorePossible, setRenderMorePossible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdvancedSettingsOpen, setIsAdvancedSettingsOpen] = useState(true);
  const dropdownRef = useRef(null);
  const [selectedSkins, setSelectedSkins] = useState([]);
  const [getTotalValue, setTotalValue] = useState(0);
  const [unCheckedSkins, setUnCheckedSkins] = useState([]);

  const [formData, setFormData] = useState({
    tradeUrl: user.tradeUrl || "",
  });

  const wearOptions = [
    "Factory New",
    "Minimal Wear",
    "Field-Tested",
    "Well-Worn",
    "Battle-Scarred",
  ];

  const [skinData, setSkinData] = useState({
    Wear: "Factory New",
    MinFloat: "",
    MaxFloat: "",
    MaxPrice: "",
    Pattern: "",
  });

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
    const fetchSkins = async () => {
      try {
        const response = await fetch("http://localhost:3000/skins");
        const data = await response.json();
        setUnsortedSkins(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSkins();
  }, []);

  useEffect(() => {
    const sortAndFilterSkins = () => {
      const filtered = unsortedSkins
        .filter(
          (skin) =>
            skin.wear_prices && Object.values(skin.wear_prices).length > 0
        )
        .sort(
          (a, b) =>
            parseFloat(Object.values(b.wear_prices).at(-1)) -
            parseFloat(Object.values(a.wear_prices).at(-1))
        )
        .filter((skin) =>
          skin.skin.toLowerCase().includes(userInput.toLowerCase())
        );

      setSkins(filtered.slice(0, currentPage));
      setRenderMorePossible(filtered.length > currentPage);
    };

    sortAndFilterSkins();
  }, [unsortedSkins, userInput, currentPage]);

  useEffect(() => {
    const { MinFloat, MaxFloat, MaxPrice } = skinData;
    if (MinFloat > MaxFloat) setError("Min Float must be less than Max Float");
    else if (MaxPrice < 0) setError("Max Price must be greater than 0");
    else setError("");
  }, [skinData]);

  const addSkin = () => {
    if (!selectedSkin) return;
    const alreadyAdded = selectedSkins.find(
      (s) => s.skin === selectedSkin && s.maxPrice === skinData.MaxPrice
    );
    if (alreadyAdded) {
      setError("Skin already added");
      return;
    }
    if (!skinData.MaxPrice) {
      setError("Max Price is required");
      return;
    }

    const { MinFloat, MaxFloat, MaxPrice, Pattern, Wear } = skinData;
    let min = MinFloat;
    let max = MaxFloat;

    if (Wear !== "Multiple") {
      const ranges = {
        "Factory New": [0, 0.07],
        "Minimal Wear": [0.07, 0.15],
        "Field-Tested": [0.15, 0.38],
        "Well-Worn": [0.38, 0.45],
        "Battle-Scarred": [0.45, 1],
      };
      [min, max] = ranges[Wear] || [MinFloat, MaxFloat];
    }

    const skinObj = {
      skin: selectedSkin,
      minFloat: min,
      maxFloat: max,
      maxPrice: MaxPrice,
      pattern: Pattern,
    };

    setTotalValue((prev) => prev + MaxPrice);
    setSelectedSkins((prev) => [...prev, skinObj]);
    setUnCheckedSkins((prev) => [...prev, skinObj]);
  };

  return (
    <div className={styles.container}>
      <TradeUrlInput formData={formData} setFormData={setFormData} />

      <div className={styles.lower}>
        <div className={styles.searchSkins}>
          <SkinSearch
            skins={skins}
            selectedSkin={selectedSkin}
            setSelectedSkin={setSelectedSkin}
            setSkinData={setSkinData}
            userInput={userInput}
            setUserInput={setUserInput}
            renderMorePossible={renderMorePossible}
            setCurrentPage={setCurrentPage}
            addSkin={addSkin}
          />

          <AdvancedSettings
            skinData={skinData}
            setSkinData={setSkinData}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            dropdownRef={dropdownRef}
            error={error}
            wearOptions={wearOptions}
            isAdvancedSettingsOpen={isAdvancedSettingsOpen}
            setIsAdvancedSettingsOpen={setIsAdvancedSettingsOpen}
            setError={setError}
          />
        </div>

        <div className={styles.details}>
          <InfoBar
            isInfoBarOpen={isInfoBarOpen}
            setIsInfoBarOpen={setIsInfoBarOpen}
          />
          <div className={styles.divider}></div>
          <SkinList
            selectedSkins={selectedSkins}
            setSelectedSkins={setSelectedSkins}
            setTotalValue={setTotalValue}
            setUnCheckedSkins={setUnCheckedSkins}
          />
          <CartSummary getTotalValue={getTotalValue} />
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
