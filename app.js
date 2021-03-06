/**
 * The code to fetch the payments data has already been written
 * for you below. To complete this group project, your group
 * will need to write code to make this app do the following:
 *
 * 1. Show the current balance based on the initial balance and
 *    any completed payments. Each completed payment will add to
 *    the balance.
 * 2. Add the payments to the table. Each payment should show
 *    the date of the payment, its status (whether is pending or
 *    complete), the description, the amount, and the balance
 *    after that payment was completed.
 *
 *    Pending payments should appear with a pink background.
 *    This can be applied by adding the `pending` class to the
 *    table row (`<tr>`) for each pending payment.
 * 3. Show what the balance will be after pending payments are
 *    completed.
 * 4. Show the total income of all payments that were received
 *    this month (May, 2019), including pending payments.
 * 5. Show the amount of the most valuable payment that was
 *    received this month (May 2019).
 * 6. For each PENDING payment, add a button that says "cancel"
 *    to the end of that payment's row. When the button is
 *    clicked, the payment should be removed from the account
 *    and the render function should be called again to update
 *    the page.
 */

/**
 *
 * This is the account details that you will use with this
 * exercise.
 *
 * Do not edit this code.
 */
var account = {
  number: 100402153,
  initialBalance: 100,
  paymentsUrl: "/data/payments.json",
  payments: []
};
var balanceAmount = document.querySelector("#balanceAmount");

/**
 * The code below has been written for you. When the "Load"
 * button is clicked, it will get the payments details, assign
 * them to the account variable, and call the render function
 * to update details in the DOM.
 *
 * You may edit this code.
 */
document.querySelector("#loadButton").addEventListener("click", function() {
  fetch(account.paymentsUrl)
    .then(response => response.json())
    .then(payments => {
      account.payments = payments;
      var valuableAmount = mostValuablePayment(payments);
      // balance-total-income

      render(
        account,
        calculateBalanceAfterPending(account),
        calculateTotalIncomeInMay(account),
        valuableAmount
      );
      document.getElementById("mostValuablePayment").innerText = valuableAmount;
    });
});
console.log(account.payments);
render(account, calculateCurrentBalance());
//     });
// });

function calculateCurrentBalance() {
  var completedPayments = account.payments.filter(function(payment) {
    return payment.completed === true;
  });
  var totalAmounts = completedPayments.reduce(function(accumulator, payment) {
    return accumulator + payment.amount;
  }, 0);
  return totalAmounts + account.initialBalance;
}

//task 3
function calculateBalanceAfterPending(account) {
  var allPayments = account.payments
    .map(function(payment) {
      return payment.amount;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  return account.initialBalance + allPayments;
}

//task 4
function calculateTotalIncomeInMay(account) {
  var allIncomeRecieved = account.payments
    .filter(function(payment) {
      return payment.date.includes("2019-05");
    })
    .map(payment => payment.amount)
    .reduce(function(accumulator, payment) {
      return accumulator + payment;
    });
  return allIncomeRecieved;
}

/**S
 * Write a render function below that updates the DOM with the
 * account details.
 *
 * EVERY update to the DOM should be contained in this
 * function so that you can call it over and over again
 * whenever there is an update to the account details.
 *
 * We have completed one of the DOM updates already by
 * entering the account number on the page.
 *
 * @param {Object} account The account details
 */
//  balance-total-income
function render(account, balanceAfterPending, allIncomeRecieved) {
  // Display the account number
  document.querySelector("#accountNumber").innerText = account.number;
  document.querySelector("#pendingBalance").innerText =
    "£" + balanceAfterPending.toFixed(2);
  document.querySelector("#totalIncome").innerText =
    "£" + allIncomeRecieved.toFixed(2);
}

//display the account details.

function render(account, currentBalance) {
  // Display the account number
  document.querySelector("#accountNumber").innerText = account.number;
  document.querySelector("#balanceAmount").innerText = "£" + currentBalance;
  account.payments.forEach(element => {
    newRowCol(
      element.date,
      element.description,
      element.amount,
      element.completed
    );
  });
}

function newRowCol(date, description, amount, status) {
  var paymentsList = document.querySelector("#paymentsList");
  var newRow = document.createElement("tr");
  var newColumn = document.createElement("td");
  paymentsList.appendChild(newRow);
  if (!status) {
    newRow.setAttribute("class", "pending");
    renderNewColumn(date, newRow);
    renderNewColumn(status ? "Completed" : "Pending", newRow);
    renderNewColumn(description, newRow);
    renderNewColumn("£" + amount, newRow);

    //  Task 6
    var cancelButton = document.createElement("button");
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("class", "remove");
    cancelButton.innerText = "cancel";

    newColumn.appendChild(cancelButton);
    newRow.appendChild(newColumn);
    newRow.addEventListener("click", function(event) {
      if (event.target.className == "remove") {
        paymentsList.removeChild(newRow);
      }
    });
  } else {
    renderNewColumn(date, newRow);
    renderNewColumn(status ? "Completed" : "Pending", newRow);
    renderNewColumn(description, newRow);
    renderNewColumn("£" + amount, newRow);
  }
}

function renderNewColumn(element, row) {
  var newCol = document.createElement("td");
  row.appendChild(newCol);
  newCol.innerText = element;
}
// Task 5
function mostValuablePayment(payments) {
  var listOfPayments = payments
    .filter(function(payment) {
      var paymentDate = "2019-05";
      var isComplete = payment.completed === true;
      return payment.date.includes(paymentDate) && isComplete;
    })
    .map(function(payment) {
      return payment.amount;
    });
  return Math.max.apply(null, listOfPayments);
}

/**
 * Write any additional functions that you need to complete
 * the group project in the space below.
 *
 * For example, you might want to have functions that
 * calculate balances, find completed or pending payments,
 * add up payments, and more.
 */
