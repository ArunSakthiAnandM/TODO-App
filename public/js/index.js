import { markTaskAsComplete } from "./markTaskAsComplete";
import { login } from "./login";
import { logout } from "./logout";
import { updateProfile } from "./updateProfile";
import { createSlides } from "./slider";

const loginButton = document.querySelector(".login-form");
if (loginButton) {
  loginButton.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}

const logoutButton = document.querySelector(".logout-btn");
if (logoutButton) {
  logoutButton.addEventListener("click", logout);
}

const statusBtns = document.querySelectorAll(".status-btn");
if (statusBtns) {
  statusBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      markTaskAsComplete(e.target.id);
    });
  });
}

const userDataForm = document.querySelector(".user-container");
if (userDataForm) {
  userDataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const userName = document.getElementById("userName").value;
    const mobileNumber = document.getElementById("mobileNumber").value;

    updateProfile(userName, email, mobileNumber);
  });
}

// const inputForm = document.querySelector(".new-task-form");
// if (inputForm) {
//   inputForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log(req.body);
//   });
// }

// const enrollButton = document.querySelector(".enroll-form");
// if (enrollButton) {
//   enrollButton.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const userName = document.getElementById("userName").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     // const passwordConfrim = document.getElementById("passwordConfrim").value;
//     const dob = document.getElementById("dob").value;
//     const mobileNumber = document.getElementById("mobileNumber").value;
//     console.log(userName, email, password, dob, mobileNumber);
//     enroll(userName, email, password, dob, mobileNumber);
//   });
// }

const slider = document.querySelector(".slider");
if (slider) {
  slider.style.overflow = "hidden";
  createSlides();
}
