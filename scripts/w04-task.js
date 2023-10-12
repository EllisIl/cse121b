/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Elijah Foard",
    photo: "images/me.png",
    favoriteFoods: [
        "Rice", 
        "Eggs", 
        "Pizza", 
        "Beef Stroganoff"
    ],
    hobbies: [
        "Programming",
        "Game Development",
        "Making Music"
    ],
    placesLived: [
        {
            place: "Rexburg, ID",
            length: "1 year"
        }
    ]
};

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
    {
        place: "Chantilly, VA",
        length: "18 Years"
    }
)

/* DOM Manipulation - Output */

/* Name */
document.querySelector("#name").textContent = myProfile.name;

/* Photo with attributes */
document.getElementById("photo").src = myProfile.photo
document.getElementById("photo").alt = myProfile.name

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li'); // create list element
    li.textContent = food; // change the list element to the item in the loop
    document.querySelector("#favorite-foods").appendChild(li); // add the list element to the favorite foods
});

/* Hobbies List */
myProfile.hobbies.forEach(hobby => {
    let ul = document.createElement('li');
    ul.textContent = hobby;
    document.querySelector('#hobbies').appendChild(ul);
});

/* Places Lived DataList */
myProfile.placesLived.forEach(place => {
    let dt = document.createElement('dt');
    let dd = document.createElement('dd');
    dt.textContent = place.place;
    dd.textContent = place.length;
    document.querySelector("#places-lived").appendChild(dt);
    document.querySelector("#places-lived").appendChild(dd);
});

