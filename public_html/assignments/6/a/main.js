"use strict";
var hourlyWage = 15;
function calcPay(thisHours) {
    var overHours = thisHours - 40;
    var pay = 0;
    if (overHours > 0) {
        thisHours = 40;
        pay = overHours * hourlyWage * 1.5;
    }
    pay += thisHours * hourlyWage;
    return pay;
}
window.onload = function () {
    var num = 1;
    var hours = [];
    while (num >= 0) {
        var response = prompt("Enter the number of hours that the employee worked this past week.");
        var notANumber = function () { return num = confirm("Response was not a number. Would you like to try again?") ? 0 : -1; };
        try {
            if (response && response.length > 0) {
                num = parseInt(response);
            }
            else {
                num = NaN;
            }
            if (isNaN(num)) {
                notANumber();
            }
        }
        catch (err) {
            notANumber();
        }
        if (!isNaN(num) && num >= 0) {
            hours.push(num);
        }
    }
    var outputTable = $("#output_rows");
    var totalPay = 0;
    var output = "";
    for (var i = 0; i < hours.length; i++) {
        var thisHours = hours[i];
        var thisPay = calcPay(thisHours);
        totalPay += thisPay;
        output += "<tr>\n    <td>" + (i + 1) + "</td>\n    <td>" + thisHours + "</td>\n    <td>$" + thisPay + ".00</td>\n</tr>";
    }
    outputTable.html(output);
    $("#total_pay").text("Total: $" + totalPay + ".00");
};
//# sourceMappingURL=main.js.map