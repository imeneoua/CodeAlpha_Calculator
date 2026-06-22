const display = document.getElementById('display');

let currentInput = '';
let justCalculated = false;

function updateDisplay(value) {
  display.textContent = value;
}

function appendToDisplay(val){
    
    // DELETE LAST CHARE
    if (val == 'DEL'){
        currentInput=currentInput.slice(0,-1);
        updateDisplay(currentInput || '0');
        return;
    }

    //TYPING A NBR RIGT AFTER = ,START FRESH
    const isOperator = ['+','-','*','/','%'].includes(val);
    if (justCalculated && !isOperator){
        currentInput='';
    }
    justCalculated=false;

    //PREVENTS 2 OPERATORS IN A ROW
    const lastChar = currentInput.slice(-1);
    if(isOperator&&['+','-','*','/','%'].includes(lastChar)){
        currentInput=currentInput.slice(0,-1);
    }

    //PREVENT MULTI DOTS IN THE SAME NBR 

    if (val==='.'){
        const splits=currentInput.split(/[\+\-\*\/]/);//DIVIDES A STRING INTO PIECES
        const lastPart=splits[splits.length -1];//THE NBR THE USER IS TYPING 
        if(lastChar.includes('.')){
            return;
        }
    }
    
    currentInput+=val;
    updateDisplay(currentInput);

}

//CLEAR BTN
function clearDisplay(){
    currentInput='';
    updateDisplay('0');
}

// = BTN
function calculate(){
    if (currentInput===''){
        return;
    }

    try{
        const operation = currentInput.replace(/%/g,'/100');
        const result = eval(operation);//eval:Treat this string as actual JavaScript code
        updateDisplay(result);//screen shows
        currentInput=String(result);//Save the result so the operation don't get forgoten
        justCalculated=true;
    }catch{
        updateDisplay('ERROR');
        currentInput('');
    }

}