import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Database from "./pages/Database";
import MonitorSkins from "./pages/MonitorSkins";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Settings from "./pages/Settings";
import Account from "./components/Account";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Database />} />
          <Route path="monitor-skins" element={<MonitorSkins />} />
          <Route path="settings" element={<Settings />}>
            <Route index element={<Account />} />
          </Route>
        </Route>
        <Route path="sign-up" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
