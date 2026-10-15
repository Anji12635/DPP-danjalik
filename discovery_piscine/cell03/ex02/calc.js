
$(document).ready(function () {

    $("#calculate").on("click", function () {
        // Read the input values using jQuery
        const leftText = $("#leftNumber").val().trim();
        const rightText = $("#rightNumber").val().trim();
        const operator = $("#operator").val();

        // Only accept non-negative integers
        if (!/^\d+$/.test(leftText) || !/^\d+$/.test(rightText)) {
            alert("Error :(");
            return;
        }

        const left = Number(leftText);
        const right = Number(rightText);

        // Check division or modulo by zero
        if ((operator === "/" || operator === "%") && right === 0) {
            alert("It's over 9000!");
            return;
        }

        let result;

        // Perform the selected operation
        switch (operator) {
            case "+":
                result = left + right;
                break;

            case "-":
                result = left - right;
                break;

            case "*":
                result = left * right;
                break;

            case "/":
                result = left / right;
                break;

            case "%":
                result = left % right;
                break;

            default:
                alert("Error :(");
                return;
        }

        // Display the result
        alert(result);
        console.log(result);
    });

    // Show a reminder every 30 seconds
    setInterval(function () {
        alert("Please, use me...");
    }, 30000);

});

