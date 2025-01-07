
let expenses = [];

function addExpense(description, amount, date) {
  try {
    if (!description || description.trim() === "") {
      throw new Error("Expense description cannot be empty.");
    }
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Amount must be a positive number.");
    }
    const expenseDate = new Date(date);
    if (isNaN(expenseDate.getTime())) {
      throw new Error("Invalid date.");
    }

    const newExpense = { description, amount, date: expenseDate };
    expenses.push(newExpense);
    displayExpenses();
    updateTotalExpenses();
  } catch (error) {
    alert(error.message);
  }
}

function updateTotalExpenses() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  document.getElementById("totalExpenses").textContent = total.toFixed(2);
}

function displayExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  expenses.forEach(expense => {
    const listItem = document.createElement("li");
    listItem.textContent = `${expense.description} - $${expense.amount.toFixed(2)} on ${expense.date.toLocaleDateString()}`;
    expenseList.appendChild(listItem);
  });
}

function filterExpensesByDate(startDate, endDate) {
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
  });
  
  return filteredExpenses;
}

function asyncFetchExpenseReport() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomSuccess = Math.random() > 0.2; 
      if (randomSuccess) {
        resolve(expenses);
      } else {
        reject(new Error("Failed to fetch expense report."));
      }
    }, 2000); 
  });
}

document.getElementById("expenseForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const date = document.getElementById("date").value;
  
  addExpense(description, amount, date);
  event.target.reset(); 
});

document.getElementById("filterButton").addEventListener("click", function() {
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  
  const filteredExpenses = filterExpensesByDate(startDate, endDate);
  
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  filteredExpenses.forEach(expense => {
    const listItem = document.createElement("li");
    listItem.textContent = `${expense.description} - $${expense.amount.toFixed(2)} on ${expense.date.toLocaleDateString()}`;
    expenseList.appendChild(listItem);
  });
});

document.getElementById("fetchReportButton").addEventListener("click", function() {
  asyncFetchExpenseReport()
    .then(report => {
      console.log("Expense Report:", report);
      alert("Expense report fetched successfully!");
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to fetch expense report.");
    });
});

updateTotalExpenses();
displayExpenses();
