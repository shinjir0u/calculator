const display = document.querySelector(".display-screen");
const operators = document.querySelector(".operators");
const keys = document.querySelector(".keys");
const executeKeys = document.querySelector(".execute-keys");
const OPERATORS = "+-*/";
const KEYS = "1234567890";
const EXECUTE_KEYS = "=C";

createOperatorsButtons();
createKeyButtons();
createClearButton();
createExecuteButton();

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
    let button = createAButton("=", );
    executeKeys.appendChild(button);
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
    if (OPERATORS.includes(textToDisplay))
        display.textContent += ` ${textToDisplay} `;
    else 
        display.textContent += textToDisplay;

}

function clearKeyEventFunction(event) {
    display.textContent = "";
}

function enterKeyEventFunction(event) {

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