let x = document.getElementById("display");
let buff = '0';
let total = 0;
let prev_oper = null;
let symbol_pressed = true;

function handleEvent (event) {
    // if e is a button click 
    // else e is a key press

    let e;
    if (event.target.matches('button')) {
        e = event.target.innerHTML;
    } else {
        e = event.key;
    }

    if (e == '.' || !isNaN(e) && x.textContent.length < 10) { 
        if (x.textContent[0] == '0' || symbol_pressed) {
            x.textContent = e;
            symbol_pressed = false;
        } else {
            x.textContent += e;
        }
    }
    else{
        handleSymbol(e);
        symbol_pressed = true;
    }
    x.textContent - buff;
    
}

function handleSymbol(e) {
    buff = x.textContent;
    switch(e) {
        case 'C':
        case 'c':
            buff = 0;
            total = 0;
            x.textContent = 0;
            break;
        case 'del':
        case 'Backspace':
            if (x.textContent.length === 1) {
                x.textContent = 0;
            } else {
                x.textContent = x.textContent.substring(0, x.textContent.length-1);
            }
            break;
        case '=':
        case 'Enter':
            if (prev_oper == null) {
                return buff;
            }
            doMath(prev_oper);
            x.textContent = total;
            prev_oper = null;
            buff = total;
            total = 0;
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            buff = x.textContent;
            doMath(e);
            break;
    }
}

function doMath(symbol) {

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

    prev_oper = symbol;
}



document.querySelector('#calc');
addEventListener('click', handleEvent);
addEventListener('keypress', handleEvent);

