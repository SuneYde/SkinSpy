import { api } from "../api/api";

const getUserBalance = async (user_id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await api.get("validation/validated-balance", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.error) {
      console.error(response.data.error);
      return;
    }

    return response.data.balance;
  } catch (error) {
    console.error(error);
  }
};

export default getUserBalance;
