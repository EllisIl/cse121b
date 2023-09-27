/* LESSON 3 - Programming Tasks */

/* FUNCTIONS */
/* Function Definition - Add Numbers */
function add(number1, number2){
    return number1 + number2;
}

function addNumbers(){
    let addNumber1 = Number(document.querySelector('#add1').value);
    let addNumber2 = Number(document.querySelector('#add2').value);

    document.querySelector('#sum').value = add(addNumber1, addNumber2);
}

document.querySelector('#addNumbers').addEventListener('click', addNumbers);

/* Function Expression - Subtract Numbers */
var subtract = function(subtract1, subtract2){
    return subtract1 - subtract2
}

var subtractNumbers = function(){
    let subNum1 = Number(document.querySelector('#subtract1').value);
    let subNum2 = Number(document.querySelector('#subtract2').value);

    document.querySelector('#difference').value = subtract(subNum1, subNum2);
}

document.querySelector('#subtractNumbers').addEventListener('click', function(){
    subtractNumbers()
});

/* Arrow Function - Multiply Numbers */
var multiply = (factor1, factor2) => factor1 * factor2;

var multiplyNumbers = () => {
    let factor1 = Number(document.querySelector('#factor1').value);
    let factor2 = Number(document.querySelector('#factor2').value);

    document.querySelector('#product').value = multiply(factor1, factor2);
}

document.querySelector('#multiplyNumbers').addEventListener('click', () => multiplyNumbers());

/* Open Function Use - Divide Numbers */
function divide(dividend, divisor){
    return dividend / divisor
}

function divideNumbers(){
    let dividend = Number(document.querySelector('#dividend').value);
    let divisor = Number(document.querySelector('#divisor').value);

    document.querySelector('#quotient').value = divide(dividend, divisor);
}
document.querySelector('#divideNumbers').addEventListener('click', divideNumbers)

/* Decision Structure */
var currentDate = new Date();
let currentYear = currentDate.getFullYear();
document.querySelector('#year').value = currentYear;

/* ARRAY METHODS - Functional Programming */
/* Output Source Array */
var numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
document.querySelector('#array').textContent = numArr;

/* Output Odds Only Array */
document.querySelector('#odds').textContent = numArr.filter(number => number % 2 === 1);

/* Output Evens Only Array */
document.querySelector('#evens').textContent = numArr.filter(number => number % 2 === 0);

/* Output Sum of Org. Array */
document.querySelector('#sumOfArray').textContent = numArr.reduce((sum, number) => sum + number);

/* Output Multiplied by 2 Array */
document.querySelector('#multiplied').textContent = numArr.map(number => number * 2);

/* Output Sum of Multiplied by 2 Array */
document.querySelector('#sumOfMultiplied').textContent = numArr.map(number => number * 2).reduce((sum, number) => sum + number);