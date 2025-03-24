import { api } from "../api/api";

const getUserSubscription = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await api.get("validation/validated-subscription", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.error) {
      console.error(response.data.error);
      return;
    }

    return response.data.subscription;
  } catch (error) {
    console.error(error);
  }
};

export default getUserSubscription;
