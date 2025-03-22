import styles from "../styles/components/searchQuery.module.scss";
import { useEffect, useState } from "react";

const SearchQuery = ({ setInputValues, inputValues, setClickedSkin }) => {
  const [allSkins, setAllSkins] = useState([]);
  const [skins, setSkins] = useState([]);
  useEffect(() => {
    const getNames = async () => {
      const url = "http://localhost:3000/allSkinNames";
      const response = await fetch(url);
      const data = await response.json();
      setAllSkins(data);
      setSkins(data);
    };
    getNames();
  }, []);

  useEffect(() => {
    if (inputValues.searchString) {
      const string = inputValues.searchString.toLowerCase();
      const filteredSkins = allSkins.filter((skin) =>
        skin.toLowerCase().includes(string)
      );
      setSkins(filteredSkins);
    } else {
      setSkins(allSkins);
    }
  }, [inputValues.searchString, allSkins]);

  return (
    <div className={styles.dropdown}>
      {skins.map((skin, index) => (
        <div
          key={index}
          className={styles.containerSkin}
          onClick={() => {
            setInputValues({ ...inputValues, searchString: skin });
            setClickedSkin(skin);
          }}
        >
          <p className={styles.skinText}>{skin}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchQuery;
