import "@babel/polyfill";
import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/home/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "sucess") {
      showAlert("sucess", "Logged in sucessfully!");
      window.setTimeout(() => {
        location.assign("/user/todo");
      }, 2000);
    }
  } catch (err) {
    showAlert("error", "Incorrect Email/Password, Try again!");
  }
};
