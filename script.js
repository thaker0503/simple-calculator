const calculator = document.querySelector("#calculator");
const calculatorKeys = calculator.querySelector(".calculator__keys");
const calculatorDisplay = calculator.querySelector(".calculator__display");

function calculate(n1, operator, n2) {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    switch (operator) {
        case 'add':
            return firstNum + secondNum;
        case 'subtract':
            return firstNum - secondNum;
        case 'multiply':
            return firstNum * secondNum;
        case 'divide':
            return firstNum / secondNum;
    }
}

calculatorKeys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = calculatorDisplay.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        Array.from(key.parentNode.children).forEach((k) => k.classList.remove("is-depressed"));

        if (!action || action === "number") {
            if (displayedNum === "0" || previousKeyType === "operator" || previousKeyType === "calculate") {
                calculatorDisplay.textContent = keyContent;
            } else {
                calculatorDisplay.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = "number";
        }

        if (action === "backspace" && displayedNum !== "0") {
            if (displayedNum.length === 1) {
                calculatorDisplay.textContent = "0";
            } else {
                calculatorDisplay.textContent = displayedNum.slice(0, -1);
                calculator.dataset.previousKeyType = "backspace";
            }
        }

        if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate") {
                const calcValue = calculate(firstValue, operator, secondValue);
                calculatorDisplay.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add("is-depressed");
            calculator.dataset.previousKeyType = "operator";
            calculator.dataset.operator = action;
        }

        if (action === "decimal") {
            if (!displayedNum.includes(".")) {
                calculatorDisplay.textContent = displayedNum + ".";
            } else if (previousKeyType === "operator" || previousKeyType === "calculate") {
                calculatorDisplay.textContent = "0.";
            }

            calculator.dataset.previousKeyType = "decimal";
        }

        if (action === "clear") {
            if (key.textContent === "AC") {
                calculator.dataset.firstValue = "";
                calculator.dataset.modValue = "";
                calculator.dataset.operator = "";
                calculator.dataset.previousKeyType = "";
            } else {
                key.textContent = "AC";
            }

            calculatorDisplay.textContent = 0;
            calculator.dataset.previousKeyType = "clear";
        }

        if (action !== "clear") {
            const clearButton = calculator.querySelector("[data-action=clear]");
            clearButton.textContent = "CE";
        }

        if (action === "calculate") {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;

            if (firstValue) {
                if (previousKeyType === "calculate") {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }

                calculatorDisplay.textContent = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = "calculate";
        }
    }
});