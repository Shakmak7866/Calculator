let x = document.getElementById("display"); // To control the display
let buff = '0'; // To get the previous factor
let total = 0; // To get the total
let prev_oper = null; // To get what the previous operator was
let symbol_pressed = true; // This variable is to make sure the second factor is not appended to the previous factor

/**
 * This function will determine what type of input the user has done and then do the rest accordingly
 * 
 * @param {event} event - What the user input is
 */
function handleEvent (event) {

    // conditional to check if the user clicked a button or entered a key
    // if e is a button click 
    // else e is a key press
    let e;
    if (event.target.matches('button')) {
        e = event.target.innerHTML;
    } else {
        e = event.key;
    }

    // This conditional will check if the input is an element of a number ( numeric value or decimal )
    if (e == '.' || !isNaN(e) && x.textContent.length < 10) { 
        if (x.textContent[0] == '0' || symbol_pressed) {
            x.textContent = e;
            symbol_pressed = false;
        } else {
            x.textContent += e;
        }
    }
    else{ // if not, then it will be a symbol
        handleSymbol(e);

        // Changes back to true that way the display shows a new number and doesn't append it
        symbol_pressed = true; 
    }
}

// Takes care of a symbol
function handleSymbol(e) {

    // Gets the factor
    buff = x.textContent;

    // Conditional to check which it is
    switch(e) {
        case 'C':
        case 'c':
            // Resets it
            buff = 0;
            total = 0;
            x.textContent = 0;
            break;
        case 'del':
        case 'Backspace':
            // Gets rid of last character
            if (x.textContent.length === 1) {
                x.textContent = 0;
            } else {
                x.textContent = x.textContent.substring(0, x.textContent.length-1);
            }
            break;
        case '=':
        case 'Enter':
            // Prints out the total so far
            if (prev_oper == null) {
                return buff;
            }
            doMath(prev_oper);
            x.textContent = total;
            prev_oper = null;
            buff = total;
            total = 0;
            break;
        case '+/-':
            // Toggles negative sign
            if (x.textContent == '0') {
                return;
            }
            if (x.textContent[0] == '-') {
                x.textContent = x.textContent.substring(1, x.textContent.length);
            }
            else {
                x.textContent = '-' + x.textContent;
            }
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            // Takes care of the math part
            doMath(e);
            x.textContent = total;

            // Shortens if it too long
            x.textContent = x.textContent.substring(0, 9);
            break;
    }
}

function doMath(symbol) {

    // Turns the string to a number to do arithmetic with
    let num_buff = parseFloat(buff);

    if (total === 0) {
        total = num_buff;
    }
    else{
        switch (prev_oper) {
            case '+':
                total += num_buff;
                break;
            case '-':
                total -= num_buff;
                break;
            case '*':
                total *= num_buff;
                break;
            case '/':
                if (num_buff == 0) {
                    alert("Can't Divide by Zero!");
                }else{
                    total /= num_buff;
                }
                break;
        }
    }

    // Since the switch uses the previous operator, we have to store the current symbol after doing the math
    prev_oper = symbol;
}


// Gets the buttons and listens for events
document.querySelector('#calc');
addEventListener('click', handleEvent);
addEventListener('keypress', handleEvent);

