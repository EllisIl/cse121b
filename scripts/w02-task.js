/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = "Elijah Foard";
let currentYear = new Date().getFullYear();
let profilePicture = "images/me.png";

/* Step 3 - Element Variables */
const nameElement = document.getElementById("name");
const foodElement = document.getElementById("food");
const yearElement = document.querySelector("#year");
const imageElement = document.querySelector("#image");


/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt', `Profile image of ${fullName}`);


/* Step 5 - Array */
let favFoods = ["Rice", "Eggs", "Pizza", "Beef Stroganoff"]

foodElement.textContent = favFoods.join(", ");

let newFavFood = "Chips"
favFoods.push(newFavFood);
foodElement.innerHTML += `<br>${favFoods.join(", ")}`;

favFoods.shift();
foodElement.innerHTML += `<br>${favFoods.join(", ")}`;

favFoods.pop();
foodElement.innerHTML += `<br>${favFoods.join(", ")}`;