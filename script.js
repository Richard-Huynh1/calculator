let result = 0;



const performOperation = (num1, num2, operation) => {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
  if (operation === "add") {
    result = num1 + num2;
  } else if (operation === "subtract") {
    result = num1 - num2;
  } else if (operation === "multiply") {
    result = num1 * num2;
  } else if (operation === "divide") {
    result = num1 / num2;
  }
}



const operationForm = document.getElementById("operation-form");
let needOperation = false;
let prevNum = "";
let currNum = "";
let operation = "";

operationForm.addEventListener("submit", (e) => {
  needOperation = false;
  e.preventDefault();
  if (prevNum === "") {
    prevNum = currNum;
    currNum = "";
  } else if (currNum === "" && operation !== "") {
    const display = document.querySelector("div > p");
    display.textContent = "ERROR: An operation was pressed twice in \
    succession. Calculator result reset.";
      prevNum = "";
      currNum = "";
      operation = "";
  } else {
    performOperation(prevNum, currNum, operation);
    prevNum = result.toString(10);
    currNum = "";
  }

  const validOperations = new Set(["add", "subtract", "multiply", "divide",
    "equal", "clear"]);
  const currOperation = document.getElementById(
    "operation-input").value.trim().toLowerCase();
  if (validOperations.has(currOperation)) {
    operation = currOperation;
  } else {
    const display = document.querySelector("div > p");
    display.textContent = "ERROR: An invalid operation was inputted. \
    Calculator results cleared.";
    prevNum = "";
    currNum = "";
    operation = "";
  }
  if (operation === "equal") {
    const display = document.querySelector("div > p");
    display.textContent = result;
    prevNum = result;
    currNum = "";
    operation = "";
    needOperation = true;
  } else if (operation === "clear") {
    const display = document.querySelector("div > p");
    display.textContent = "";
    prevNum = "";
    currNum = "";
    operation = "";
    result = 0;
  }
});



const calcNums = document.getElementsByClassName("calc-num");
for (let i = 0; i < calcNums.length; i++) {
  calcNums[i].addEventListener("click", () => {
    if (!needOperation) {
      const display = document.querySelector("div > p");
      currNum += (i + 1 === 10) ? 0 : i + 1;
      display.textContent = currNum;
    }
  });
}

const toggleOptions = () => {
  const options = document.getElementById("options");
  if (options.style.display === "none") {
    options.style.display = "block";
  } else {
    options.style.display = "none";
  }
}
