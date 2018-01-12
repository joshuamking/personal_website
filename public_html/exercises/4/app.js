"use strict";
function fib(n) {
    let fibs = [0, 1];
    for (let i = 2; i < n; i++) {
        const oneFibsAgo = fibs[i - 1];
        const twoFibsAgo = fibs[i - 2];
        fibs.push(oneFibsAgo + twoFibsAgo);
    }
    let fibsAsString = "";
    for (let i = 0; i < fibs.length; i++) {
        fibsAsString += `${fibs[i]}${i == fibs.length - 1 ? "" : ", "}`;
    }
    return fibsAsString;
}
function asterisks(n) {
    let output = "";
    for (let i = 1; i <= n; i++) {
        let asterisksToPrint = "";
        for (let j = i; j > 0; j--) {
            asterisksToPrint += "* ";
        }
        output += asterisksToPrint + "\n";
    }
    return output;
}
function sortArray(arr) {
    let sortedArr = [];
    for (let i = 0; arr.length > 0; i++) {
        let indexOfSmallest = 0;
        for (let j = 0; j < arr.length; j++) {
            indexOfSmallest = arr[j] <= arr[indexOfSmallest] ? j : indexOfSmallest;
        }
        sortedArr.push(arr.splice(indexOfSmallest, 1)[0]);
    }
    return sortedArr;
}
function mostCommonItem(arr) {
    if (!arr && arr.length <= 0) {
        return "Empty array!";
    }
    let mappingObject = {};
    for (let i = 0; i < arr.length; i++) {
        let occurrenceCount = mappingObject[arr[i]];
        occurrenceCount = occurrenceCount ? occurrenceCount : 0;
        mappingObject[arr[i]] = occurrenceCount + 1;
    }
    let mostFrequentItem = arr[0];
    for (let key in mappingObject) {
        let thisCount = mappingObject["" + key];
        mostFrequentItem = thisCount > mappingObject["" + mostFrequentItem] ? key : mostFrequentItem;
    }
    return `${mostFrequentItem} ( ${mappingObject[mostFrequentItem]} time${mappingObject[mostFrequentItem] > 1
        ? "s"
        : ""} ) `;
}
function shuffleArray(arr) {
    let shuffledArr = [];
    for (let i = 0; arr.length > 0; i++) {
        const indexToTake = Math.round(Math.random() * (arr.length - 1));
        shuffledArr.push(arr.splice(indexToTake, 1)[0]);
    }
    return shuffledArr;
}
console.log("// First 10 fibonacci numbers");
const fibsOutput = fib(10);
console.log(fibsOutput);
console.log("");
console.log("// First 10 rows of asterisks");
const asterisksOutput = asterisks(10);
console.log(asterisksOutput);
console.log("");
console.log("// Array sort");
const sortArrayArr = [3, 8, 7, 6, 5, -4, 3, 2, 1];
const sortArrayArrCopy = [3, 8, 7, 6, 5, -4, 3, 2, 1];
const sortedArr = sortArray(sortArrayArr);
console.log(sortArrayArrCopy + " => " + sortedArr);
console.log("");
console.log("// Most common item in array");
const mostCommonItemArr = [3, "a", "a", "a", 2, 3, "a", 3, "a", 2, 4, 9, 3];
const mostCommonItemOutput = mostCommonItem(mostCommonItemArr);
console.log(mostCommonItemArr + " => " + mostCommonItemOutput);
console.log("");
console.log("// Shuffle items in array");
const shuffleArrayArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffleArrayArrCopy = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const shuffleArrayOutput = shuffleArray(shuffleArrayArr);
console.log(shuffleArrayArrCopy + " => " + shuffleArrayOutput);
console.log("");
//# sourceMappingURL=app.js.map