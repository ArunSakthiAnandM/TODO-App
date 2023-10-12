import "@babel/polyfill";
import axios from "axios";
import { showAlert } from "./alerts";

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/home/logout",
    });
    if (res.data.status === "sucess") {
      showAlert("sucess", "Logged out sucessfully!");
      location.assign("/home");
    }
  } catch (err) {
    showAlert("error", "Logout Failed, Try again!");
  }
};
