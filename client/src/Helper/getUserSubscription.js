import { api } from "../api/api";

const getUserSubscription = async () => {
  try {
    const response = await api.get("validation/validated-subscription", {
      withCredentials: true,
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
