const display = document.querySelector(".input");
const interfaceDiv = document.querySelector('.interface');
const buttons = document.querySelectorAll('button');

let a = '0', b = '0',
    isActioned = false,
    operator = '';

const operatorMap = {
    '÷': 'divide',
    '✖': 'multiply',
    '+': 'sum',
    '-': 'subtract'
};

const MAX_DISPLAY_LENGTH = 9, MAX_RESULT = 10000000;

function sum(a, b) {
    return (parseFloat(a) + parseFloat(b)).toString();
}

function subtract(a, b) {
    return (parseFloat(a) - parseFloat(b)).toString();
}

function multiply(a, b) {
    return (parseFloat(a) * parseFloat(b)).toString();
}

function divide(a, b) {
    return (parseFloat(a) / parseFloat(b)).toString();
}

function operate(a, operator, b) {
    switch (operator) {
        case 'divide': return divide(a, b);
        case 'multiply': return multiply(a, b);
        case 'subtract': return subtract(a, b);
        case 'sum': return sum(a, b);
        default: return '0';
    }
}

function clearDisplay() {
    display.textContent = '0';
}

function handleOperand(input) {
    console.log('Operand:', input);
    if (display.textContent === '0') display.textContent = '';
    if (display.textContent.length <= MAX_DISPLAY_LENGTH) display.textContent += input;
}

function executeOperation(op) {
    console.log('Operation:', op);
    if (!isActioned) {
        a = parseFloat(display.textContent);
        isActioned = true;
        operator = op;
        clearDisplay();
    }
}

function handleAction(input) {
    console.log('Action:', input);
    switch (input) {
        case '.':
            if ((display.textContent.match(/[0-9]/g)) && !(display.textContent.includes('.')))
                display.textContent += '.';
            break;

        case 'C/AC':
            clearDisplay();
            isActioned = false;
            break;

        case '⌫':
            display.textContent = display.textContent.slice(0, -1) || '0';
            break;

        case '=':
            if (isActioned) {
                b = parseFloat(display.textContent);
                console.log(b);
                if (b === 0) return;
                a = operate(a, operator, b);
                if (parseFloat(a) > MAX_RESULT) a = '99999999';
                display.textContent = parseFloat(a).toFixed(2);
                isActioned = false;
            }
            break;

        default:
            executeOperation(operatorMap[input]);
            break;
    }
}

function executioner(e) {
    console.log('Event:', e);
    if (e.target.tagName === 'BUTTON') {
        let input = e.target.textContent;

        if (e.target.classList.contains('numbers')) {
            handleOperand(input);
        } else if (e.target.classList.contains('action')) {
            handleAction(input);
        }
    }

    if (e.key !== null && e.key !== undefined) {
        switch (e.key) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                handleOperand(e.key);
                break;

            case '.':
            case 'C':
            case 'c':
                handleAction(e.key === 'c' ? 'C/AC' : e.key);
                break;

            case 'Backspace':
                handleAction('⌫');
                break;

            case '*':
                executeOperation('multiply');
                break;

            case '/':
            case '÷':
                executeOperation('divide');
                break;

            case '+':
                executeOperation('sum');
                break;

            case '-':
                executeOperation('subtract');
                break;

            case '=':
            case 'Enter':
                handleAction('=');
                break;

            default:
                break;
        }
    }
}

interfaceDiv.addEventListener('click', (e) => {
    e.stopPropagation();
    executioner(e);
});

document.addEventListener('keydown', (e) => {
    e.stopPropagation();
    executioner(e);
});
