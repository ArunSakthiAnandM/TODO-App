import "@babel/polyfill";
import axios from "axios";
import { showAlert } from "./alerts";

export const updateProfile = async (userName, email, mobileNumber) => {
  try {
    console.log("entered update profile function");
    const res = axios({
      method: "POST",
      url: "http://127.0.0.1:3000/user/profile",
      data: {
        userName,
        email,
        mobileNumber,
      },
    });
    res.then((res) => {
      if (res.status === 200) {
        showAlert("sucess", "Updated");
      }
      window.location.assign("http://127.0.0.1:3000/user/profile");
    });
  } catch (err) {
    console.log(err);
    showAlert("error", "Failed here");
  }
};
