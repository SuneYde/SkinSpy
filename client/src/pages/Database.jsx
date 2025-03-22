import { useState, useEffect, useRef } from "react";
import styles from "../styles/pages/Database.module.scss";
import Filterbar from "../components/filterBar";
import ReturnSkins from "../components/returnSkins";

const Database = () => {
  const [results, setResults] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const containerRef = useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <Filterbar
          setLoadingState={setLoadingState}
          setResults={setResults}
          containerRef={containerRef}
        />
      </div>
      <div className={styles.results} ref={containerRef}>
        <ReturnSkins loadingState={loadingState} results={results} />
      </div>
    </div>
  );
};

export default Database;
