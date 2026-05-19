window.onload = function()
{
    let startTime =
    localStorage.getItem(
        "startTime"
    );

    let endTime = Date.now();

    let totalSeconds =
    Math.floor(
        (endTime - startTime)
        / 1000
    );

    let minutes =
    Math.floor(
        totalSeconds / 60
    );

    let seconds =
    totalSeconds % 60;

    document.getElementById(
        "timerResult"
    ).innerHTML =
    "⏱️ Time Taken: "
    + minutes +
    " min "
    + seconds +
    " sec";
}

function playAgain()
{
    localStorage.clear();

    window.location.href =
    "index.html";
}