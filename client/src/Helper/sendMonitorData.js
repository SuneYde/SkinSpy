import { api } from "../api/api";

const sendMonitorData = async (totalBalanceUsed, SkinsBeingMonitored) => {
  try {
    const response = await api.post(
      "monitor/send-monitor-data",
      { totalBalanceUsed, SkinsBeingMonitored },
      {
        withCredentials: true,
      }
    );
    if (response.data.error) {
      console.error(response.data.error);
      return;
    }
    return { message: response.data.message };
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

export default sendMonitorData;
