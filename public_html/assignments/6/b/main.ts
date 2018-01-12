let num              = Math.round(Math.random() * 100);
let numOfGuessesLeft = 6;
let minGuess         = 0;
let maxGuess         = 100;

window.onload = () => {
};

function userGuessChange (userInputField: HTMLInputElement) {
    let userInputLabel: JQuery<HTMLElement> = $("label[for=user_input]");
    let guessesLeft: JQuery<HTMLElement>    = $("#guesses_left");

    let userGuess: number = parseInt(userInputField.value);
    userInputField.value  = "";

    if (userGuess < minGuess || userGuess > maxGuess) {
        userInputLabel.text(`Please guess a value between ${minGuess} and ${maxGuess}.`);
        return;
    }

    numOfGuessesLeft--;
    let msg: string;
    if (userGuess == num) {
        msg                   = `You guessed it correctly! Congratulations! The number was ${num}`;
        userInputField.hidden = true;
    }
    else if (userGuess > num) {
        msg      = `The number is less than ${userGuess}`;
        maxGuess = userGuess;
    }
    else {
        msg      = `The number is greater than ${userGuess}`;
        minGuess = userGuess;
    }

    if (numOfGuessesLeft <= 0) {
        userInputField.hidden = true;
        msg += "<br>Game over&semi; you lost&excl;";
        msg += `<br>The number was ${num}`;
        guessesLeft.text("");
    }
    else {
        guessesLeft.text(`Guesses left: ${numOfGuessesLeft}`);
    }

    userInputField.placeholder = `Guess a number: ${minGuess}-${maxGuess}`;
    userInputLabel.html(msg);
}