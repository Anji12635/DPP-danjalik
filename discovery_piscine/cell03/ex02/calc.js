
const form = document.getElementById("calcForm");
const leftInput = document.getElementById("left");
const rightInput = document.getElementById("right");
const operator = document.getElementById("operator");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const leftText = leftInput.value.trim();
    const rightText = rightInput.value.trim();

    // Check that both inputs contain only non-negative integers.
    if (
        leftText === "" ||
        rightText === "" ||
        !/^\d+$/.test(leftText) ||
        !/^\d+$/.test(rightText)
    ) {
        alert("Error :(");
        return;
    }

    const left = Number(leftText);
    const right = Number(rightText);
    let result;

    // Division and modulo by zero are not allowed.
    if ((operator.value === "/" || operator.value === "%") && right === 0) {
        alert("It's over 9000!");
        return;
    }

    switch (operator.value) {
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
    }

    alert(result);
    console.log(result);
});

// Show a reminder every 30 seconds.
setInterval(function () {
    alert("Please, use me...");
}, 30000);
