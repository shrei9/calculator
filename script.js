let a = '0', b = '0', isActioned = false, operator = '';
const display = document.querySelector(".input");
const interfaceDiv = document.querySelector('.interface');
const buttons = document.querySelectorAll('button');

function sum(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return '' + (a + b);
}

function subtract(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return '' + (a - b);
}

function multiply(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return '' + (a * b);
}

function divide(a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    return '' + (a / b);
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

function executioner(e) {
    console.log(e.key);

    //NUMBERS:

    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('numbers')) {
        switch (e.target.textContent) {
            case '0':
            case `1`:
            case `2`:
            case `3`:
            case `4`:
            case `5`:
            case `6`:
            case `7`:
            case `8`:
            case `9`: {
                if (display.textContent === '0') display.textContent = '';
                if (display.textContent.length <= 9)
                    display.textContent += e.target.textContent;
                break;
            }
        }
    }

    //ACTION:

    if (e.target.tagName === 'BUTTON' && e.target.classList.contains('action')) {

        switch (e.target.textContent) {
            case `.`:
                if ((display.textContent.match(/[0-9]/g)) && !(display.textContent.includes('.')))
                    display.textContent += '.';
                break;

            case 'C/AC':
                clearDisplay();
                isActioned = false;
                break;

            case `⌫`:
                display.textContent = display.textContent.slice(0, -1);
                if (display.textContent === '') display.textContent = '0';
                break;

            case '÷':
                if (!isActioned) {
                    a = parseFloat(display.textContent);
                    isActioned = true; //dupa prima operatie punem flag ca sa luam b
                    clearDisplay();
                    operator = 'divide';
                }
                break;

            case '✖':
                if (!isActioned) {
                    a = parseFloat(display.textContent);
                    isActioned = true; //dupa prima operatie punem flag ca sa luam b
                    clearDisplay();
                    operator = 'multiply';
                }
                break;

            case '+':
                if (!isActioned) {
                    a = parseFloat(display.textContent);
                    isActioned = true; //dupa prima operatie punem flag ca sa luam b
                    clearDisplay();
                    operator = 'sum';
                }
                break;

            case '-':
                if (!isActioned) {
                    a = parseFloat(display.textContent);
                    isActioned = true; //dupa prima operatie punem flag ca sa luam b
                    clearDisplay();
                    operator = 'subtract';
                }
                break;

            case "=":
                if (isActioned) {
                    b = parseFloat(display.textContent);
                    if (b === 0) return;
                    a = operate(a, operator, b);
                    if (parseFloat(a) > 10000000) a = '99999999';
                    display.textContent = '' + parseFloat(a).toFixed(2);
                    isActioned = false;
                    break;
                }
        }
    }

    // KB SUPPORT
    if (e.key !== null && e.key !== undefined) {
        switch (e.key) {
            case '0':
            case `1`:
            case `2`:
            case `3`:
            case `4`:
            case `5`:
            case `6`:
            case `7`:
            case `8`:
            case `9`: {
                if (display.textContent === '0') display.textContent = '';
                if (display.textContent.length <= 9)
                    display.textContent += e.key;
                break;
            }

            case `.`:
                if ((display.textContent.match(/[0-9]/g)) && !(display.textContent.includes('.')))
                    display.textContent += '.';
                break;

            case 'C/AC':
                clearDisplay();
                isActioned = false;
                break;

            case `⌫`:
                display.textContent = display.textContent.slice(0, -1);
                if (display.textContent === '') display.textContent = '0';
                break;

            case '÷':
                if (!isActioned) {
                    a = parseFloat(display.textContent);
                    isActioned = true; //dupa prima operatie punem flag ca sa luam b
                    clearDisplay();
                    operator = 'divide';
                }
                break;

            case '*':
                if (!isActioned) {
                    a = parseFloat(display.textContent);
                    isActioned = true; //dupa prima operatie punem flag ca sa luam b
                    clearDisplay();
                    operator = 'multiply';
                }
                break;

            case '+':
                if (!isActioned) {
                    a = parseFloat(display.textContent);
                    isActioned = true; //dupa prima operatie punem flag ca sa luam b
                    clearDisplay();
                    operator = 'sum';
                }
                break;

            case '-':
                if (!isActioned) {
                    a = parseFloat(display.textContent);
                    isActioned = true; //dupa prima operatie punem flag ca sa luam b
                    clearDisplay();
                    operator = 'subtract';
                }
                break;

            case "=":
                if (isActioned) {
                    b = parseFloat(display.textContent);
                    if (b === 0) return;
                    a = operate(a, operator, b);
                    if (parseFloat(a) > 10000000) a = '99999999';
                    display.textContent = '' + parseFloat(a).toFixed(2);
                    isActioned = false;
                    break;
                }

            case 'Enter':
                if (isActioned) {
                    b = parseFloat(display.textContent);
                    if (b === 0) return;
                    a = operate(a, operator, b);
                    if (parseFloat(a) > 10000000) a = '99999999';
                    display.textContent = '' + parseFloat(a).toFixed(2);
                    isActioned = false;
                    break;
                }
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


function clearDisplay() {
    display.textContent = '0';
}