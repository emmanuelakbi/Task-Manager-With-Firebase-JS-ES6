import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js  ";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDIclrIp4PVok9YcYxW--RlxrmFU7mokf8",
  authDomain: "replpwebdev.firebaseapp.com",
  projectId: "replpwebdev",
  storageBucket: "replpwebdev.appspot.com",
  messagingSenderId: "829915607167",
  appId: "1:829915607167:web:1a90edad9f936f0cb04f4a",
  measurementId: "G-1021MKPSK4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const main = document.getElementById("main");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login");
const signUpButton = document.getElementById("sign-up");

const createAct = document.getElementById("create-acct");
const signUpEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signUpPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById(
  "confirm-password-signup"
);
const createActBtn = document.getElementById("create-acct-btn");
const returnButton = document.getElementById("return-btn");

const emailErrorText = document.querySelector(".email-error");
const emailErrorIcon = document.querySelector(".error-icon1");
const passwordErrorText = document.querySelector(".password-error");
const passwordErrorIcon = document.querySelector(".error-icon2");

const emailSignUpErrorText = document.querySelector(".email-signup-error");
const emailSignUpErrorIcon = document.querySelector(".error-icon3");

const confirmEmailSignUpErrorText = document.querySelector(
  ".confirm-email-signup-error"
);
const confirmEmailSignUpErrorIcon = document.querySelector(".error-icon4");

const passwordSignUpErrorText = document.querySelector(
  ".password-signup-error"
);
const passwordSignUpErrorIcon = document.querySelector(".error-icon5");

const confirmPasswordSignUpErrorText = document.querySelector(
  ".confirm-password-signup-error"
);
const confirmPasswordSignUpErrorIcon = document.querySelector(".error-icon6");

let email,
  password,
  signUpEmail,
  confirmSignUpEmail,
  signUpPassword,
  confirmSignUpPassword;

createActBtn.addEventListener("click", () => {
  // SIGN-UP VALIDATION
  let isVerified = true;

  signUpEmail = signUpEmailIn.value;
  confirmSignUpEmail = confirmSignupEmailIn.value;
  if (signUpEmail != confirmSignUpEmail) {
    window.alert("Email field do not match. Try again");
    isVerified = false;
  }

  signUpPassword = signUpPasswordIn.value;
  confirmSignUpPassword = confirmSignUpPasswordIn.value;
  if (signUpPassword != confirmSignUpPassword) {
    window.alert("Password field do not match. Try again");
    isVerified = false;
  }

  if (
    signUpEmail == null ||
    confirmSignUpEmail == null ||
    signUpPassword == null ||
    confirmSignUpPassword == null
  ) {
    window.alert("Please fill out all required fields.");
    isVerified = false;
  }

  // SIGN-UP FIREBASE FORM AUTHENTICATION
  if (isVerified) {
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        window.alert("Success! Account created.");
        window.location = "./createTask.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`ERROR CODE: ${errorCode}`);

        window.alert("Error occurred. Try again.");
        window.alert(errorMessage);
      });
  }
});

loginButton.addEventListener("click", () => {
  // EMAIL INPUT FORM VALIDATION
  if (emailInput.value.trim() === "") {
    emailErrorText.style.display = "block";
    emailErrorText.textContent = "Email cannot be empty";
    emailErrorIcon.style.opacity = 1;
    emailInput.style.borderColor = "red";
    setTimeout(() => {
      emailErrorText.style.display = "none";
    }, 4000);
  } else if (
    !emailInput.value.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
  ) {
    emailErrorText.style.display = "block";
    emailErrorText.textContent = "Looks like this is not an email";
    emailErrorIcon.style.opacity = 1;
    emailInput.style.borderColor = "red";
    setTimeout(() => {
      emailErrorText.style.display = "none";
    }, 4000);
  } else {
    emailErrorText.style.display = "none";
    emailErrorIcon.style.opacity = 0;
    emailInput.style.borderColor = "blueviolet";
  }

  // PASSWORD INPUT FORM VALIDATION
  if (passwordInput.value.trim() === "") {
    passwordErrorText.style.display = "block";
    passwordErrorIcon.style.opacity = 1;
    passwordInput.style.borderColor = "red";
    setTimeout(() => {
      passwordErrorText.style.display = "none";
    }, 4000);
  } else {
    passwordErrorText.style.display = "none";
    passwordErrorIcon.style.opacity = 0;
    passwordInput.style.borderColor = "blueviolet";
  }

  // SIGN-IN FIREBASE FORM AUTHENTICATION
  email = emailInput.value;
  password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);

      window.alert("Success! Welcome back");
      window.location = "./createTask.html";
    })
    .error((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;

      window.alert("Error occurred. Try again");
    });
});

signUpButton.addEventListener("click", () => {
  main.style.display = "none";
  createAct.style.display = "block";
});

returnButton.addEventListener("click", function () {
  main.style.display = "block";
  createAct.style.display = "none";
});
