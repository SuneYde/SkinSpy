import { Outlet, useNavigate } from "react-router";
import styles from "../styles/layout/DashboardLayout.module.scss";
import Sidebar from "../components/sidebar";
import TopBar from "../components/TopBar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.bodyContainer}>
        <div className={styles.topbar}>
          <TopBar />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
