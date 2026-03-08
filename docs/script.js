const display = document.getElementById("display");

let currentOperand = "";
let previousOperand = "";
let operator = null;
let shouldResetScreen = false;

function appendNumber(number) {
  if (shouldResetScreen) {
    currentOperand = "";
    shouldResetScreen = false;
  }

  if (currentOperand === "0") currentOperand = "";
  if (currentOperand.includes(".") && number === ".") return;

  currentOperand += number;

  updateDisplay();
}

function chooseOperator(op) {
  if (currentOperand === "") return;

  if (previousOperand !== "") {
    calculate();
  }

  operator = op;
  previousOperand = currentOperand;
  currentOperand = "";
}

function calculate() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return;

  let result;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "×":
      result = prev * current;
      break;
    case "÷":
      result = prev / current;
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  previousOperand = "";
  shouldResetScreen = true;

  updateDisplay();
}

function percent() {
  if (currentOperand === "") return;
  currentOperand = (parseFloat(currentOperand) / 100).toString();
  updateDisplay();
}

function updateDisplay() {
  display.innerText = currentOperand || "0";
}

function clear() {
  currentOperand = "";
  previousOperand = "";
  operator = null;
  updateDisplay();
}

function backspace() {
  currentOperand = currentOperand.slice(0, -1);
  updateDisplay();
}

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerText;

    if (!isNaN(value) || value === ".") {
      appendNumber(value);
    } else if (value === "AC") {
      clear();
    } else if (value === "=") {
      calculate();
    } else if (value === "+/-") {
      currentOperand = (parseFloat(currentOperand) * -1).toString();
      updateDisplay();
    } else if (value === "%") {
      percent();
    } else {
      chooseOperator(value);
    }
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ("0123456789".includes(key)) {
    appendNumber(key);
  } else if (key === ".") {
    appendNumber(".");
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperator(key === "*" ? "×" : key === "/" ? "÷" : key);
  } else if (key === "Enter" || key === "=") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "c" || key === "C") {
    clear();
  } else if (key === "%") {
    percent();
  }
});