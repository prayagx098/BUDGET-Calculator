// For Greeting
let email = sessionStorage.getItem('userName')


let userDetails = localStorage.getItem(email)

let user = JSON.parse(userDetails)


greetings.innerHTML = `Welcome ${user.username} ,`



// Function INCOME ADD

function addTransaction(email, transactionDetails, date, amount,type) {
  let userData = localStorage.getItem(email);
  
  if (userData) {
      let user = JSON.parse(userData);

      let counter = parseInt(localStorage.getItem('transactionNumber'), 10);
      let transactionNumber = counter + 1;
      localStorage.setItem('transactionNumber', transactionNumber); 

      user.transaction.push({
          number: transactionNumber,
          details: transactionDetails,
          date: date,
          type: type,
          amount: amount
      });

      localStorage.setItem(email, JSON.stringify(user));
      alert("Transaction added successfully");
      showChart();
  } else {
      alert("User not found");
  }
}

function addIncome(){
  let transaction = document.getElementById('depositeDetails').value;
  let date = document.getElementById('depositDate').value;
  let amount = document.getElementById('depositAmount').value;

  let email = sessionStorage.getItem('userName');

  let type = "credit";

  addTransaction(email, transaction, date, amount,type);

}

function removeIncome(){
  let transaction = document.getElementById('withdrawDetails').value;
  let date = document.getElementById('withdrawDate').value;
  let amount = document.getElementById('withdrawAmount').value;

  let email = sessionStorage.getItem('userName');

  let type = "debit";

  addTransaction(email, transaction, date, amount,type);

}



// PI Chart 

// Replace with actual user email
let Email = sessionStorage.getItem('userName');

function getTransactions(Email) {
  let userData = localStorage.getItem(Email);
  let debitTransactions = [];
  let totalCredit = 0;
  
  if (userData) {
      let user = JSON.parse(userData);

      // Filter and aggregate transactions
      user.transaction.forEach(trans => {
          if (trans.type === 'debit') {
              debitTransactions.push(trans);
          } else if (trans.type === 'credit') {
              totalCredit += trans.amount;
          }
      });
  } else {
      console.log("User not found.");
  }

  return { debitTransactions, totalCredit };
}

function prepareChartData(debitTransactions, totalCredit) {
  let labels = debitTransactions.map(trans => `${trans.details} - $${trans.amount}`);
  labels.push(`Total Credit - $${totalCredit}`);

  let data = debitTransactions.map(trans => trans.amount);
  data.push(totalCredit);

  let colors = debitTransactions.map((_, index) => `hsl(${(index * 360 / debitTransactions.length) % 360}, 70%, 70%)`);
  colors.push('#ffcc00');

  return { labels, data, colors };
}

function showChart(){
  let { debitTransactions, totalCredit } = getTransactions(email);
let chartData = prepareChartData(debitTransactions, totalCredit);

new Chart("myChart", {
  type: "pie",
  data: {
      labels: chartData.labels,
      datasets: [{
          backgroundColor: chartData.colors,
          data: chartData.data
      }]
  },
  options: {
      title: {
          display: true,
          text: "Debit Transactions and Total Credit"
      }
  }
});
}

showChart();









document.addEventListener('DOMContentLoaded', () => {
  let Email = sessionStorage.getItem('userName');

  function getTransactions(Email) {
      let userData = localStorage.getItem(Email);
      let transactions = [];

      if (userData) {
          let user = JSON.parse(userData);
          transactions = user.transaction || [];
      } else {
          console.log("User not found.");
      }

      console.log(transactions)
      return transactions;
  }

  function populateTable(transactions) {
    let tableBody = document.getElementById('transactionBody');
    tableBody.innerHTML = '';

    transactions.forEach((trans, index) => {
        let row = document.createElement('tr');
        
        row.style.backgroundColor = trans.type === 'credit' ? '#d4edda' : '#f8d7da'; 
        

        let siNoCell = document.createElement('td');
        siNoCell.textContent = trans.number;
        row.appendChild(siNoCell);

        let detailsCell = document.createElement('td');
        detailsCell.textContent = trans.details;
        row.appendChild(detailsCell);

        let typeCell = document.createElement('td');
        typeCell.textContent = trans.type;
        row.appendChild(typeCell);

        let amountCell = document.createElement('td');
        amountCell.textContent = `$${trans.amount}`;
        row.appendChild(amountCell);

        tableBody.appendChild(row);
    });
}


  let transactions = getTransactions(email);
  populateTable(transactions);
});


// logout


function logout(){
  window.location="./index.html"
}