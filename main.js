const form = document.getElementById("authForm");
const username = document.getElementById("username");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const zipcode = document.getElementById("zipcode");
const age = document.getElementById("age");
const errorP = document.querySelectorAll(".errorP");
const genderErrorP = document.getElementById("error-gender");
const agree = document.getElementById("agree");
const disagree = document.getElementById("disagree");
const cookieContainer = document.querySelector(".cookies");

const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
const lastnameRegex = /^[A-Za-z'-]{2,30}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const phoneRegex =
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const zipCodeRegex = /^\d{5}(-\d{4})?$/;

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

agree.addEventListener("click", function () {
  cookieContainer.style.display = "none";
  if (username) {
    Cookies.set("username", username.value, { expires: 7 });
  }
  // document.cookie = `username = ${username.value}`;
});

disagree.addEventListener("click", function () {
  cookieContainer.style.display = "none";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const errorObj = {};

  errorP.forEach((errorMsg) => {
    errorMsg.textContent = "";
  });

  if (genderErrorP) {
    genderErrorP.textContent = "";
  }

  let gender = false;

  if (!username.value.match(usernameRegex)) {
    errorObj.username = "Invalid Username";
  }

  if (!lastName.value.match(lastnameRegex)) {
    errorObj.lastName = "Invalid Lastname";
  }

  if (!password.value.match(passwordRegex)) {
    errorObj.password = "Invalid password";
  }

  if (!email.value.match(emailRegex)) {
    errorObj.email = "Invalid email";
  }

  if (!phone.value.match(phoneRegex)) {
    errorObj.phone = "Invalid phone";
  }

  if (!zipcode.value.match(zipCodeRegex)) {
    errorObj.zipcode = "Invalid zipcode";
  }

  if (age.value < 18) {
    errorObj.age = "You must be 18 years old or older.";
  }

  this.querySelectorAll('[name ="gender"]').forEach((item) => {
    if (item.checked) {
      gender = true;
    }
  });

  if (!gender) {
    errorObj.gender = "Select gender";
    if (genderErrorP) {
      genderErrorP.textContent = errorObj.gender;
    }
  }

  for (let err in errorObj) {
    let errorP = document.getElementById("error-" + err);
    if (errorP) {
      errorP.textContent = errorObj[err];
    }
  }

  if (Object.keys(errorObj).length === 0) {
    // const formData = {
    //   username: username.value,
    //   lastName: lastName.value,
    //   password: password.value,
    //   email: email.value,
    //   phone: phone.value,
    //   zipcode: zipcode.value,
    //   age: age.value,
    //   gender: gender ? "Selected" : "Not selected",
    // };

    // console.log("Form Submitted with Values:", formData);

    form.submit();
  }
});

// load TODOS

const btn = document.getElementById("btn-add");
const ul = document.getElementById("todoul");

loadFromStorage();

btn.addEventListener("click", handleClick);

function handleClick() {
  // console.log(this); //button
  const inputValue = this.previousElementSibling.value.trim();
  console.log(inputValue);

  if (inputValue) {
    createToDo(inputValue);
    savetoStorage(inputValue);
    this.previousElementSibling.value = "";
  }
}

function createToDo(text) {
  const li = document.createElement("li");
  li.innerText = text;
  ul.appendChild(li);
}

function loadFromStorage() {
  const checkItems = JSON.parse(localStorage.getItem("tasks"));

  if (checkItems) {
    checkItems.forEach((tasks) => {
      const li = document.createElement("li");
      li.innerText = tasks;
      ul.appendChild(li);
    });
  }
}

function savetoStorage(todo) {
  const todoElements = JSON.parse(localStorage.getItem("tasks")) || [];
  localStorage.setItem("tasks", JSON.stringify([...todoElements, todo]));
}
