// Get form submit event
document.querySelector("form").addEventListener("submit", function(e) {
  // Hide results
  document.getElementById("results").style.display = "none";

  // Show Spinner
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateLoan, 1000);
  e.preventDefault();
});

// Loan calculate
function calculateLoan() {
  // get input values
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // take input from DOM
  const principal = amount.value;
  const calculatedInterest = interest.value / 100 / 12;
  const calculatedPayment = years.value * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayment).toFixed(2);
    totalInterest.value = (monthly * calculatedPayment - principal).toFixed(2);

    // Hide results
    document.getElementById("results").style.display = "block";

    // Show Spinner
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please enter correct values");
    // Hide results
    document.getElementById("results").style.display = "none";

    // hide Spinner
    document.getElementById("loading").style.display = "none";
  }
}

function showError(msg) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";

  // get element
  const card = document.querySelector(".card");
  const header = document.querySelector(".heading");

  // add text node
  errorDiv.appendChild(document.createTextNode(msg));

  card.insertBefore(errorDiv, header);

  setTimeout(clearError, 3000);
}

// Clear Error

const clearError = () => {
  document.querySelector(".alert").remove();
};
