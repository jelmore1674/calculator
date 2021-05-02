/** @format */
class Calc {
    constructor(prevOperandTextElement, curOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement;
        this.curOperandTextElement = curOperandTextElement;
        this.clear();
    }

    clear() {
        this.curOperand = "";
        this.prevOperandText = "";
        this.operation = undefined;
    }

    delete() {}

    appendNumber(number) {
        if (number === "." && this.curOperand.includes(".")) return;
        this.curOperand = this.curOperand.toString() + number.toString();
    }

    chooseOperation(operation) {}

    compute() {}

    updateDisplay() {
        this.curOperandTextElement.innerText = this.curOperand;
    }
}

//All queries for the Calculator
const numButtons = document.querySelectorAll("[data-number]");
const operandButtons = document.querySelectorAll("[data-operand]");
const delButton = document.querySelector("[data-delete]");
const acButton = document.querySelector("[data-all-clear]");
const equalButton = document.querySelector("[data-equals]");
const prevOperandTextElement = document.querySelector(
    "[data-previous-operand]"
);
const curOperandTextElement = document.querySelector("[data-current-operand]");

const calc = new Calc(prevOperandTextElement, curOperandTextElement);
numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calc.appendNumber(button.innerText);
        calc.updateDisplay();
    });
});

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    if (operator == "+") {
        return add(num1, num2);
    } else if (operator == "-") {
        return subtract(num1, num2);
    } else if (operator == "*") {
        return multiply(num1, num2);
    } else if (operator == "/") {
        return divide(num1, num2);
    }
}