/** @format */
class Calc {
    constructor(prevOperandTextElement, curOperandTextElement) {
        this.prevOperandTextElement = prevOperandTextElement;
        this.curOperandTextElement = curOperandTextElement;
        this.clear();
    }

    clear() {
        this.curOperand = "";
        this.prevOperand = "";
        this.operation = undefined;
    }

    delete() {
        this.curOperand = this.curOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.curOperand.includes(".")) return;
        this.curOperand = this.curOperand.toString() + number.toString();
    }

    chooseOperation(op) {
        if (this.curOperand === "") return;
        if (this.prevOperand != "") {
            this.operate();
        }
        this.operation = op;
        this.prevOperand = this.curOperand;
        this.curOperand = "";
    }

    operate() {
        let math;
        const a = parseFloat(this.prevOperand);
        let b = parseFloat(this.curOperand);
        if (a == 0 && b == 0) {
            alert("You can't divide 0 by 0! Stupid Moron!");
        }
        if (isNaN(a) || isNaN(b)) return;
        switch (this.operation) {
            case "+":
                math = a + b;
                break;
            case "-":
                math = a - b;
                break;
            case "*":
                math = a * b;
                break;
            case "/":
                math = a / b;
                break;
            default:
                return;
        }
        this.curOperand = math;
        this.operation = undefined;
        this.prevOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.curOperandTextElement.innerText = this.getDisplayNumber(
            this.curOperand
        );
        if (this.operation != null) {
            this.prevOperandTextElement.innerText = `${this.getDisplayNumber(
				this.prevOperand
			)} ${this.operation}`;
        } else {
            this.prevOperandTextElement.innerText = "";
        }
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

operandButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calc.chooseOperation(button.innerText);
        calc.updateDisplay();
    });
});

equalButton.addEventListener("click", () => {
    calc.operate();
    calc.updateDisplay();
});

acButton.addEventListener("click", () => {
    calc.clear();
    calc.updateDisplay();
});

delButton.addEventListener("click", () => {
    calc.delete();
    calc.updateDisplay();
});