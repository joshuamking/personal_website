import htmlString = JQuery.htmlString;

const hourlyWage: number = 15;

function calcPay (thisHours: number) {
    const overHours = thisHours - 40;
    let pay         = 0;

    if (overHours > 0) {
        thisHours = 40;
        pay       = overHours * hourlyWage * 1.5;
    }

    pay += thisHours * hourlyWage;
    return pay;
}

window.onload = () => {

    let num: number     = 1;
    let hours: number[] = [];

    // Get hours
    while (num >= 0) {
        let response   = prompt("Enter the number of hours that the employee worked this past week.");
        let notANumber = () => num = confirm("Response was not a number. Would you like to try again?") ? 0 : -1;

        try {
            if (response && response.length > 0) { num = parseInt(response); }
            else { num = NaN;}

            if (isNaN(num)) {
                notANumber();
            }
        }
        catch (err) { notANumber(); }

        if (!isNaN(num) && num >= 0) {
            hours.push(num);
        }
    }

    let outputTable = $("#output_rows");
    let totalPay    = 0;

    let output: htmlString = "";
    for (let i = 0; i < hours.length; i++) {
        let thisHours = hours[ i ];
        let thisPay   = calcPay(thisHours);
        totalPay += thisPay;

        output += `<tr>
    <td>${i + 1}</td>
    <td>${thisHours}</td>
    <td>$${thisPay}.00</td>
</tr>`;
    }

    outputTable.html(output);
    $("#total_pay").text(`Total: $${totalPay}.00`);
};
