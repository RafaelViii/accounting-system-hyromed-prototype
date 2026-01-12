let data = {
  income: 0,
  expenses: 0,
  assets: 0,
  liabilities: 0
};

let chart;

function addTransaction() {
  const type = document.getElementById("type").value;
  const amount = Number(document.getElementById("amount").value);

  if (!amount) return alert("Enter amount");

  data[type] += amount;

  updateDashboard();
}

function updateDashboard() {
  const profit = data.income - data.expenses;
  const equity = data.assets - data.liabilities;

  document.getElementById("income").innerText = data.income;
  document.getElementById("expenses").innerText = data.expenses;
  document.getElementById("assets").innerText = data.assets;
  document.getElementById("profit").innerText = profit;

  updateChart(profit, equity);
  generateInsights(profit);
}

function updateChart(profit, equity) {
  const ctx = document.getElementById("chart");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Income", "Expenses", "Assets", "Liabilities", "Profit", "Equity"],
      datasets: [{
        data: [
          data.income,
          data.expenses,
          data.assets,
          data.liabilities,
          profit,
          equity
        ]
      }]
    }
  });
}

function generateInsights(profit) {
  const ul = document.getElementById("suggestions");
  ul.innerHTML = "";

  if (profit > 0) {
    ul.innerHTML += "<li>Business is profitable.</li>";
    ul.innerHTML += "<li>Consider reinvesting profits.</li>";
  } else {
    ul.innerHTML += "<li>Expenses exceed income.</li>";
    ul.innerHTML += "<li>Review cost structure.</li>";
  }
}
