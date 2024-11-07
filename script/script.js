const displayInput = document.querySelector(".display-input");
const displayOutput = document.querySelector(".display-output");
const operators = document.querySelector(".operators");
const keys = document.querySelector(".keys");
const executeKeys = document.querySelector(".execute-keys");
const OPERATORS = "+-*/";
const KEYS = "1234567890.";
const EXECUTE_KEYS = "=CEnterBackspace";
let isCalculationDone = false;
let enteredKey;
let isOperatorIncluded = false;

displayOutput.textContent = "0";

createOperatorsButtons();
createKeyButtons();
createClearButton();
createExecuteButton();
createBackspaceButton();
getKeyPressed();

let calculation = {
        "+": (a, b) => +a + +b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
        undefined: (a, b) => +a,
};

function calculate(input) {
    let splittedInput = input.split(" ");
    let elementsToBeCalculated,
        operandA,
        operandB,
        operator;
    do {
        elementsToBeCalculated = splittedInput.splice(0, 3);
        operandA = elementsToBeCalculated[0];
        operandB = elementsToBeCalculated[2];
        operator = elementsToBeCalculated[1];
        splittedInput.unshift(calculation[operator](operandA, operandB));
    } while (splittedInput.length > 1);
    displayOutput.textContent = (splittedInput[0] === Infinity) ? "Error: Division By 0" : 
                                    (Number.isInteger(splittedInput[0])) ? splittedInput[0] : splittedInput[0].toFixed(6);
    isCalculationDone = true;
}

function createOperatorsButtons() {
    let operatorKeys = OPERATORS.split("");
    operatorKeys.forEach(operator => {
        let button = createAButton(operator, keyClickEventFunction);
        operators.appendChild(button);
    });
}

function createKeyButtons() {
    let keysToAdd = KEYS.split("");
    keysToAdd.forEach(key => {
        let button = createAButton(key, keyClickEventFunction);
        keys.appendChild(button);
    }); 
}

function createClearButton() {
    let button = createAButton("C", clearKeyEventFunction);
    executeKeys.appendChild(button);
}

function createExecuteButton() {
    let button = createAButton("=", enterKeyEventFunction);
    executeKeys.appendChild(button);
}

function createBackspaceButton() {
    let button = createAButton("<-", backspaceKeyEventFunction);
    keys.appendChild(button);
}

function getKeyPressed() {
    window.addEventListener("keypress", keyPressEventFunction);
}

function createAButton(name, eventFunction) {
    const button = document.createElement("button");
    button.classList.add("key");
    if (OPERATORS.includes(name))
        button.classList.add("operator");
    else if (EXECUTE_KEYS.includes(name))
        button.classList.add("execute-key");
    button.textContent = name;

    button.addEventListener("click", eventFunction);
    return button;
}

function keyClickEventFunction(event) {
    let textToDisplay = event.target.textContent;

    if (textToDisplay !== "." || !enteredKey.includes(".") ) {
        if (isCalculationDone) {
            displayInput.textContent = (OPERATORS.includes(textToDisplay)) ? displayOutput.textContent : "";
            displayOutput.textContent = 0;
            isCalculationDone = false;
            isOperatorIncluded = false;
        }

        if (OPERATORS.includes(textToDisplay) && !isOperatorIncluded) {
            displayInput.textContent += ` ${textToDisplay} `;
            enteredKey = "";
            isOperatorIncluded = true;
        }
        else if (KEYS.includes(textToDisplay)) {
            displayInput.textContent += textToDisplay;
            enteredKey += textToDisplay;
        }
    }
}

function clearKeyEventFunction() {
    displayInput.textContent = "";
    displayOutput.textContent = 0;
}

function enterKeyEventFunction() {
    calculate(displayInput.textContent.replace(/[\n\r]+|[\s]{2,}/g, ""));
}

function backspaceKeyEventFunction() {
    displayInput.textContent = displayInput.textContent.slice(0, displayInput.textContent.length - 1);
}

function keyPressEventFunction(event) {
    let key = event.key;
    if ((OPERATORS + KEYS).includes(key)) {
        if (key !== "." || !enteredKey.includes(".") ) {
            if (isCalculationDone) {
                displayInput.textContent = (OPERATORS.includes(key)) ? displayOutput.textContent : "";
                displayOutput.textContent = 0;
                isCalculationDone = false;
                isOperatorIncluded = false;
            }
    
            if (OPERATORS.includes(key) && !isOperatorIncluded) {
                displayInput.textContent += ` ${key} `;
                enteredKey = "";
                isOperatorIncluded = true;
            }
            else if (KEYS.includes(key)) {
                displayInput.textContent += key;
                enteredKey += key;
            }
        }
    } 
    else if ("Enter" === key)
        enterKeyEventFunction();
}
/*
    CREATE a variable node (display) for display screen,
                            (operators) for operators node
                            (keys) for keys node
                            (executeKeys) for execute-keys code
    CREATE createAButton function that'll create a button with an event
    CREATE keyClickEventFunctin with event parameter for when a button is clicked
    CREATE executeKeysClickEventFunction with event parameter

    createAButton function
        CREATE a button element
        ASSIGN a variable (button) for that element
        ASSGIN the node with class name (key)
        ADD an action listener to the node

    keyClickEventFunction function
        ADD textContent to the display
        IF the content is an operator, add spaces

    clearKeyEventFunction function
        CLEAR textContent of display

    enterKeyEventFunction function
        DO sth
*/

/*
    CREATE calculate function that'll split the input string provided by the user

    calculate function
        CREATE variable (splittedInput) that will take splitted input string
        SPLICE first three elements
        CREATE variable elementsToBeCalculated to store three elements
        PERFORM calculation according to operator (Same as practiced before)
*/
/*
    Logic Change

        When a user enters a key, the key will be shown in both input and output
        When an operator is entered afterwards, only the input will change but the change will be remembered by output
        When ur enters another key and enters, the input will show the process while the output shows the result

*/