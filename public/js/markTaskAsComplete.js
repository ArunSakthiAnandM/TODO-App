import "@babel/polyfill";
import axios from "axios";
import { showAlert } from "./alerts";

export const markTaskAsComplete = async (id) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3000/user/update-todo",
      data: {
        id: id,
      },
    });
    if (res.status === 200) {
      showAlert("sucess", "Done");
      window.location.assign("http://127.0.0.1:3000/user/todo");
    }
  } catch (err) {
    console.log(err);
    showAlert("error", "Failed, Try again!");
  }
};
