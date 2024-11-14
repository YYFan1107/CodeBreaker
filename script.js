let clock = 7;
let code = randomCode();
let guess = "";

function randomCode() {
    let generatedCode = "";
    for (let i = 0; i < 3; i++) {
        generatedCode += Math.floor(Math.random() * 3) + 1;
    }
    return generatedCode;
}

function enterCode(num) {
    if (guess.length < 3) {
        guess += num;
        $("#currentGuess").text(`Current Guess: ${guess}`);
        if (guess.length === 3) {
            check();
        }
    }
}

function check() {
    if (parseInt(guess) !== parseInt(code)) {
        clock--;
        $("#clock").text(`Countdown: ${clock}`);
        if (clock === 0) {
            updateLog("You've been captured.");
            $("body").removeClass("win-background").addClass("lose-background");
            $("#replay-btn").show();
        } else {
            let hint;
            if (parseInt(guess) > parseInt(code)) {
                hint = "Guess lower";
            } else {
                hint = "Guess higher";
            }
            updateLog(hint);
            clearGuess();
        }
    } else {
        updateLog("You've cracked the code!");
        $("body").removeClass("lose-background").addClass("win-background");
        $("#replay-btn").show();
        let successfulVaults = parseInt(localStorage.getItem("success")) || 0;
        successfulVaults++;
        localStorage.setItem("success", successfulVaults);
    }
}

function clearGuess() {
    guess = "";
    $("#currentGuess").text("Current guess: ");
}

function updateLog(note) {
    $("<li>").text(note).appendTo("#log");
}

function replay() {
    clock = 7;
    guess = "";
    code = randomCode();
    $("#clock").text(`Countdown: ${clock}`);
    $("#currentGuess").text("Current guess: ");
    $("#log").empty();
    $("#replay-btn").hide();
    $("body").removeClass("win-background lose-background");
}

if (!localStorage.getItem("success")) {
    localStorage.setItem("success", 0);
}

document.getElementById("successBtn").addEventListener("click", function() {
    let userResponse = prompt("Do you want to view the number of successful vaults?");
    if (userResponse.toLowerCase() === "yes") {
        const successfulVaults = localStorage.getItem("success") || 0;
        alert(`Number of successful vaults: ${successfulVaults}`);
    }
});