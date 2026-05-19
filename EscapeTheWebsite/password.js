function checkPassword()
{
    let userPassword =
    document.getElementById(
        "password"
    ).value;

    // room1 wala random code
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
        },1000);
    }

    else
    {
        // popup alert
        alert(
            "❌ Incorrect Code! Try Again."
        );

        message.innerHTML =
        "Incorrect Code ❌";

        message.style.color =
        "red";

        // input clear
        document.getElementById(
            "password"
        ).value = "";
    }
}