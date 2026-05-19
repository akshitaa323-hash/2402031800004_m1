let riddles = [

{
    question:
    "I get wetter the more I dry 😭",
    answer:
    "towel"
},

{
    question:
    "What has hands but can never clap? 😂",
    answer:
    "clock"
},

{
    question:
    "What has many teeth but cannot bite? 😈",
    answer:
    "comb"
},

{
    question:
    "What goes up but never comes down? 👀",
    answer:
    "age"
},

{
    question:
    "Why don't skeletons fight each other? 💀",
    answer:
    "they dont have the guts"
},

{
    question:
    "What kind of room has no doors or windows? 😂",
    answer:
    "mushroom"
},

{
    question:
    "What can travel around the world while staying in one spot? 🌍",
    answer:
    "stamp"
},

{
    question:
    "What has one eye but cannot see? 👁️",
    answer:
    "needle"
}

];


// Random riddle choose
let randomIndex =
Math.floor(
    Math.random() *
    riddles.length
);

let selectedRiddle =
riddles[randomIndex];


// Page load pe random riddle show
window.onload = function()
{
    document.getElementById(
        "question"
    ).innerHTML =
    selectedRiddle.question;
}


// Submit button function
function checkAnswer()
{
    let userAnswer =
    document.getElementById(
        "answer"
    )
    .value
    .toLowerCase()
    .trim();

    let correctAnswer =
    selectedRiddle.answer
    .toLowerCase();

    let message =
    document.getElementById(
        "message"
    );

    if(userAnswer === correctAnswer)
    {
        message.innerHTML =
        "Correct Answer ✅";

        message.style.color =
        "lime";

        setTimeout(function()
        {
            window.location.href =
            "final.html";
        },1000);
    }

    else
    {
        message.innerHTML =
        "HAHA Wrong 😂";

        message.style.color =
        "red";
    }
}