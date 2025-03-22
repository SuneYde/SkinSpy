import { useEffect } from "react";
import styles from "../styles/components/Sidebar.module.scss";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const routesLocationsObject = {
    database: {
      name: "Database",
      icon: "fa-light fa-database",
      path: "/",
    },
    monitorSkins: {
      name: "Monitor Skins",
      icon: "fa-light fa-display-chart-up",
      path: "/monitor-skins",
    },
    statistics: {
      name: "Statistics",
      icon: "fa-light fa-chart-line",
      path: "/statistics",
    },
    tradeHistory: {
      name: "Trade History",
      icon: "fa-light fa-history",
      path: "/trade-history",
    },
    wallet: {
      name: "Wallet",
      icon: "fa-light fa-wallet",
    },
  };

  const helperLocations = {
    settings: {
      name: "Settings",
      icon: "fa-light fa-cog",
      path: "/settings",
    },
    feedback: {
      name: "Feedback",
      icon: "fa-light fa-comment",
      path: "/feedback",
    },
    help: {
      name: "Help",
      icon: "fa-light fa-life-ring",
      path: "/help",
    },
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.logoContainer}>
        <div className={styles.logo}>
          <i className="fa-solid fa-user-secret"></i>
        </div>
        <div className={styles.text}>
          <h1 className={styles.logoText}>SkinSpy</h1>
          <p className={styles.tagLine}>Reliable profits, effortless snipes</p>
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.navlinksContainer}>
        <ul className={styles.navLinks}>
          {Object.keys(routesLocationsObject).map((route) => {
            return (
              <li key={route} className={styles.navLi}>
                <Link
                  to={routesLocationsObject[route].path}
                  className={styles.navLink}
                >
                  <button
                    className={`${styles.navButton} ${
                      location.pathname === routesLocationsObject[route].path
                        ? styles.active
                        : ""
                    }`}
                  >
                    <i className={routesLocationsObject[route].icon}></i>
                    <span className={styles.spanNav}>
                      {routesLocationsObject[route].name}
                    </span>
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={styles.divider}></div>
        <ul className={styles.navLinks}>
          {Object.keys(helperLocations).map((route) => {
            return (
              <li key={route} className={styles.navLi}>
                <Link
                  to={helperLocations[route].path}
                  className={styles.navLink}
                >
                  <button
                    className={`${styles.navButton} ${
                      location.pathname === helperLocations[route].path
                        ? styles.active
                        : ""
                    }`}
                  >
                    <i className={helperLocations[route].icon}></i>
                    <span className={styles.spanNav}>
                      {helperLocations[route].name}
                    </span>
                  </button>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
