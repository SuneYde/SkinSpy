import { api } from "../api/api";

const validateOrder = async (order) => {
  try {
    const response = await api.post(
      "validation/validate-order",
      { order },
      {
        withCredentials: true, // ✅ Ensure cookies are sent
      }
    );

    if (response.data.error) {
      console.error(response.data.error);
      return;
    }
    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

export default validateOrder;
