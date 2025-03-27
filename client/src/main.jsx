import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import App from "./App.jsx";
import "./styles/pages/main.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/authActions.js";
import LoadingPage from "./pages/Loadingpage.jsx";
import { getBalance } from "./redux/balanceActions.js";
import { getActiveSkins } from "./redux/userActions.js";

const InitStartup = () => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      await dispatch(checkAuth());
      await dispatch(getBalance());
      await dispatch(getActiveSkins());
      setIsInitialized(true);
    };

    initAuth();
  }, [dispatch]);

  // Show loading or application based on initialization state
  return isInitialized ? <App /> : <LoadingPage />;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <InitStartup />
    </Provider>
  </StrictMode>
);
