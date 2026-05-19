function startGame()
{
    // game start time save
    localStorage.setItem(
        "startTime",
        Date.now()
    );

    window.location.href =
    "room1.html";
}