let lastNumber = 0;
let restart = true;

var arrayNumbers = document.querySelectorAll('button[class^=number]');
var arrayOperations = document.querySelectorAll('button[class^=operation]');
var arrayFunctions = document.querySelectorAll('button[class^=button]');

console.log("Found", arrayNumbers.length, "buttons which class starts with 'number'.");
console.log("Found", arrayOperations.length, "buttons which class starts with 'operations'.");
console.log("Found", arrayFunctions.length, "buttons which class starts with 'button'.");

for (let i = 0; i < arrayNumbers.length; i++) {
    arrayNumbers[i].addEventListener('click', function () {
        if(restart == true){
            display.innerHTML = 0;
        }
        restart = false;
        let op = this.innerHTML;
        if (document.getElementById('display').innerText.includes(".") && op.includes(".")) {
            op = '';
        }

        if (document.getElementById('display').innerText == 0) {
            document.getElementById('display').innerText = '';
        }
        console.clear();
        console.log("You clicked", op)

        
        
        if(display.innerHTML.length < 15){
            document.getElementById('display').innerText += op;
        }

        sizing();

        
    });
}



for (let i = 0; i < arrayOperations.length; i++) {
    
    arrayOperations[i].addEventListener('click', function () {
        let op = this.innerHTML;

        if (lastNumber == 0) {
            if (op != '=') {
                document.getElementById('last').innerText = display.innerHTML + op;
            } else {
                document.getElementById('last').innerText = display.innerHTML;
            }
            lastNumber = display.innerHTML;
            display.innerHTML = 0;
        } else {
            operacion(op);
            if (op == '=') {
                display.innerHTML = last.innerHTML;
                last.innerHTML = 0;
                lastNumber = last.innerHTML;
                last.innerHTML = '‎ ';
            } else {
                lastNumber = last.innerHTML;
                last.innerHTML += op;
            }
        }
        sizing();
    });
}

for (let i = 0; i < arrayFunctions.length; i++) {
    arrayFunctions[i].addEventListener('click', function () {
        switch(this.innerHTML){
            case 'CE':
                display.innerHTML = 0;
            break;
            case 'C':
                restart = true;   
                display.innerHTML = 0;
                last.innerHTML = '‎ ';
                lastNumber = 0;
            break;
            case '%':
                display.innerHTML = (lastNumber / 100) * display.innerHTML;
            break;
            case '+/-':
                if(!display.innerHTML.includes('-') && restart == false){
                    display.innerHTML = '-' + display.innerHTML;
                }
            break;
        }
        sizing();
    });
}

// Function with a possible recursivity that does the operations given just the operator (op)
function operacion(op) {
    switch (op) {
        case 'x':
            last.innerHTML = lastNumber * display.innerHTML;
            display.innerHTML = 0;
            break;
        case '/':
            last.innerHTML = lastNumber / display.innerHTML;
            display.innerHTML = 0;
            break;
        case '+':
            last.innerHTML = parseFloat(lastNumber) + parseFloat(display.innerHTML);
            display.innerHTML = 0;
            break;
        case '-':
            last.innerHTML = lastNumber - display.innerHTML;
            display.innerHTML = 0;
            break;
        case '=':
            // When the "equal" sign is clicked takes the last character of the "last" id and gets the operator, this way it is able to call itself again with the correct operation
            console.log(last.innerHTML.slice(-1));
            display.innerHTML = operacion(last.innerHTML.slice(-1));
            restart = true;
            
            break;
        default:
            break;
    }
}

function sizing(){
    if(display.innerHTML.length > 12){
        document.getElementById('display').style.fontSize="0.8em";
        document.getElementById('display').style.transitionDuration="0.5s";
    }else if(display.innerHTML.length > 8){
        document.getElementById('display').style.fontSize="0.9em";
        document.getElementById('display').style.transitionDuration="0.5s";
    }else{
        document.getElementById('display').style.fontSize="1em";
        document.getElementById('display').style.transitionDuration="0.5s";
    }
}