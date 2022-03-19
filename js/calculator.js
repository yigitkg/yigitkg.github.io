let runningTotal = 0;
let buffer = "0";
let previousOperator = "";

const screen = document.querySelector('.screen');

function buttonClick(value) {
    // console.log(value)
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    console.log("handleSymbol", symbol);
    console.log("buffer", buffer); 
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = '0';
            break;
        case '=':
            if(previousOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            console.log("buffer", buffer);
            break;
        case 'Log': 
            buffer = Math.log(buffer);
            break; 
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === "0") {
      // do nothing
      return;
    }
  
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        console.log('if');
        runningTotal = intBuffer;
    } else {
        console.log('else');
        flushOperation(intBuffer);
    }
  
    previousOperator = symbol;
  
    buffer = "0";
  }

function flushOperation(intBuffer) {
    if(previousOperator === '+') {
        runningTotal += intBuffer;
    }else if(previousOperator === '−') {
        runningTotal -= intBuffer;
    }else if(previousOperator === '×') {
        runningTotal *= intBuffer;
    }else{
        runningTotal /= intBuffer;
    }
    console.log('running total', runningTotal);
}

function handleNumber(numberString) {
    if (buffer === "0") { 
      buffer = numberString;
    } else {
      buffer += numberString;
    }
}

function init() {
    document
      .querySelector(".calc-buttons")
      .addEventListener("click", function(event) {
        // console.log(event);
        // console.log(event.screenX);
        buttonClick(event.target.innerText);
      });
}

init();
