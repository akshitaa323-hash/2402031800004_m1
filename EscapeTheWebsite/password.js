function checkPassword()
{
    let userPassword =
    document.getElementById(
        "password"
    ).value;

    // room1 wala code
    let correctPassword =
    localStorage.getItem(
        "secretCode"
    );

    let message =
    document.getElementById(
        "message"
    );

    if(userPassword === correctPassword)
    {
        message.innerHTML =
        "Access Granted ✅";

        message.style.color =
        "lime";

        setTimeout(function()
        {
            window.location.href =
            "room2.html";
        },1500);
    }

    else
    {
        message.innerHTML =
        "Access Denied ❌";

        message.style.color =
        "red";
    }
}