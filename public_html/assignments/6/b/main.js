"use strict";
var num = Math.round(Math.random() * 100);
var numOfGuessesLeft = 6;
var minGuess = 0;
var maxGuess = 100;
window.onload = function () {
};
function userGuessChange(userInputField) {
    var userInputLabel = $("label[for=user_input]");
    var guessesLeft = $("#guesses_left");
    var userGuess = parseInt(userInputField.value);
    userInputField.value = "";
    if (userGuess < minGuess || userGuess > maxGuess) {
        userInputLabel.text("Please guess a value between " + minGuess + " and " + maxGuess + ".");
        return;
    }
    numOfGuessesLeft--;
    var msg;
    if (userGuess == num) {
        msg = "You guessed it correctly! Congratulations! The number was " + num;
        userInputField.hidden = true;
    }
    else if (userGuess > num) {
        msg = "The number is less than " + userGuess;
        maxGuess = userGuess;
    }
    else {
        msg = "The number is greater than " + userGuess;
        minGuess = userGuess;
    }
    if (numOfGuessesLeft <= 0) {
        userInputField.hidden = true;
        msg += "<br>Game over&semi; you lost&excl;";
        msg += "<br>The number was " + num;
        guessesLeft.text("");
    }
    else {
        guessesLeft.text("Guesses left: " + numOfGuessesLeft);
    }
    userInputField.placeholder = "Guess a number: " + minGuess + "-" + maxGuess;
    userInputLabel.html(msg);
}
//# sourceMappingURL=main.js.map