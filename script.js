const previousOperationsText = document.querySelector('#previous-operations');
const currentOperationsText = document.querySelector('#current-operations');
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationsText, currentOperationsText) {
        this.previousOperationsText = previousOperationsText;
        this.currentOperationsText = currentOperationsText;
        this.currentOperation = ""
    }

    addDigit(digit) {
        if(digit === "." && this.currentOperationsText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit;
        this.updateScreen()
    }

    processOperation(operation) {
        if(this.currentOperationsText.innerText === "" && operation !== "C") {
            if(this.previousOperationsText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }


        let operationValue;
        let previous = +this.previousOperationsText.innerText.split(" ")[0];
        let current = +this.currentOperationsText.innerText;

        switch(operation) {
            case "+":
                    operationValue = previous + current;
                    this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                    operationValue = previous - current;
                    this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                    operationValue = previous * current;
                    this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                    operationValue = previous / current;
                    this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                    this.processDelOperation();
                break;
            case "CE":
                    this.processClearCurrentOperation();
                break;
            case "C":
                    this.processClearAllOperation();
                break;
            case "=":
                    this.processEqualOperator();
                break;

            default:
                return;
        }
    }

    updateScreen(operationValue = null, operation = null, current = null, previous = null) {
        if(operationValue === null) {
            this.currentOperationsText.innerText += this.currentOperation;
        }
        else {
            if(previous === 0) {
                operationValue = current;
            }
            this.previousOperationsText.innerText = `${operationValue} ${operation}`;
            this.currentOperationsText.innerText = "";
        }
    }

    changeOperation(operation) {
        const mathOperations = [ "*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return;
        }
        this.previousOperationsText.innerText = this.previousOperationsText.innerText.slice(0, -1) + operation;
    }

    processDelOperation() {
        this.currentOperationsText.innerText = this.currentOperationsText.innerText.slice(0, -1);
    }

    processClearCurrentOperation() {
        this.currentOperationsText.innerText = "";
    }

    processClearAllOperation() {
            this.currentOperationsText.innerText = "";
            this.previousOperationsText.innerText = "";
    }

    processEqualOperator() {
        const operation = previousOperationsText.innerHTML.split(" ")[1];
        this.processOperation(operation);
    }


};

const calc = new Calculator(previousOperationsText, currentOperationsText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e)=> {
        const value = e.target.innerText;
        
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        }
        else {
            calc.processOperation(value);
        }
    })
}) 
