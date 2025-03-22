import styles from "../styles/pages/MonitorSkins.module.scss";
import MonitorSidebar from "../components/monitorSidebar";

const MonitorSkins = () => {
  return (
    <div className={styles.container}>
      <div className={styles.filterBar}>
        <MonitorSidebar />
      </div>
      <div className={styles.content}></div>
    </div>
  );
};

export default MonitorSkins;
