// random 3 digit code
let randomCode =
Math.floor(
    100 + Math.random() * 900
);

// localStorage me save
localStorage.setItem(
    "secretCode",
    randomCode
);

// items list
let items = [
    "painting",
    "lamp",
    "clock",
    "book"
];

// random item choose
let randomItem =
items[
    Math.floor(
        Math.random() *
        items.length
    )
];

// clickable object
document.getElementById(
    randomItem
).addEventListener(
    "click",
    showClue
);

function showClue()
{
    document.getElementById(
        "popup"
    ).style.display =
    "flex";

    // popup me random code
    document.querySelector(
        ".popup-box h1"
    ).innerHTML =
    randomCode;
}

function goNext()
{
    window.location.href =
    "password.html";
}