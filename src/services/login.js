import createAxiosInstance from "../lib/axios";
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
} from "@/redux/profileSlice";
const axiosInstance = createAxiosInstance(); // Call the function to get the instance

export const login = async ({ username, password }) => {
  try {
    const res = await axiosInstance.post(`web/authenticate`, {
      username,
      password,
    });

    if (res.data.status) {
      const { token, details } = res.data.payload;
      // Store the token and details if needed
      // localStorage.setItem("token", token);
      // localStorage.setItem("userDetails", JSON.stringify(details));
      // Return the relevant data
      return { token, details };
    } else {
      // Handle unsuccessful login attempt
      throw new Error(res.data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const resetPassword = async ({
  username,
  current_password,
  password,
  confirm_password,
}) => {
  try {
    const res = await axiosInstance.post(`web/update_user_auth`, {
      username,
      current_password,
      password,
      confirm_password,
    });
    return res.data;
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchProfile = () => async (dispatch) => {
  dispatch(fetchProfileStart());
  try {
    const res = await axiosInstance.get(`web/profile`, {
      headers: {
        "X-APP-KEY": "7ey11nw9zdsd33232Ldlfo6j6V4bZQ4594",
      },
    });
    if (res.data.status) {
      dispatch(fetchProfileSuccess(res.data.payload));
    } else {
      throw new Error(res.data.message);
    }
  } catch (error) {
    dispatch(fetchProfileFailure(error.message));
  }
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post(`web/logout`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
