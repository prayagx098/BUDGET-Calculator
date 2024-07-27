
window.onload = function() {
    updateMeter();
};


// PI Chart 

var xValues = ["TOTAL", "France", "Spain", "USA", "Argentina"];

var yValues = [788278, 863288, 48648, 378787, 1344400];

var barColors = [

  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"

];

new Chart("myChart", {

  type: "pie",
  data: {

    labels: xValues,
    datasets: [{

      backgroundColor: barColors,
      data: yValues

    }]

  },
  options: {

    title: {

      display: true,
      text: "PROFIT EXPENSE CHART"

    }

  }

});




// logout


function logout(){
  window.location="./index.html"
}