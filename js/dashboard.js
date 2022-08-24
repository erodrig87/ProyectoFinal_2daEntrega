
//funcion que devuelve fecha actual - x dias pasados como parametro utilizada en dashboard.js para modificar eje x del grafico
function restarDias(dias) {
  fecha = new Date();
  fecha.setDate(fecha.getDate() - dias);
  return fecha;
}

function randomColor() {

    let arrColors =[];
    let uniqueCategories = parseInt(localStorage.getItem("uniqueCategories"));
    for( let i = 0; i<uniqueCategories;i++)arrColors.push("#" + ((1<<10)*Math.random() | 0).toString(16));
    return arrColors;
}



/* globals Chart:false, feather:false */

(() => {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })
  
  // Grafico que visualiza gastos por dia en ultima semana
  const ctx = document.getElementById('myChart')
  
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      //eje x
      labels: [
        restarDias(6).toLocaleDateString(), //funcion que devuelve fecha actual - x dias pasados com parametro
        restarDias(5).toLocaleDateString(),
        restarDias(4).toLocaleDateString(),
        restarDias(3).toLocaleDateString(),
        restarDias(2).toLocaleDateString(),
        restarDias(1).toLocaleDateString(),
        restarDias(0).toLocaleDateString(),
      ],
      // eje y
      datasets: [{
        // data ejemplo -> futuro se remplazara con sumatoria de gastos por dia 
        data: [
          sumExpenses(filterDate(arrExpenses,restarDias(6).toLocaleDateString())),
          sumExpenses(filterDate(arrExpenses,restarDias(5).toLocaleDateString())),
          sumExpenses(filterDate(arrExpenses,restarDias(4).toLocaleDateString())),
          sumExpenses(filterDate(arrExpenses,restarDias(3).toLocaleDateString())),
          sumExpenses(filterDate(arrExpenses,restarDias(2).toLocaleDateString())),
          sumExpenses(filterDate(arrExpenses,restarDias(1).toLocaleDateString())),
          sumExpenses(filterDate(arrExpenses,restarDias(0).toLocaleDateString())),
        ],
        lineTension: 0,
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
/*
  const ctx2 = document.getElementById('myChart2')
  const myChart2 = new Chart(ctx2, {
    type: 'pie',
    data: {
      //eje x
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      // eje y
      datasets: [{
        // data ejemplo -> futuro se remplazara con sumatoria de gastos por dia 
        data: [300, 50, 100],
      //  lineTension: 0,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      }],
      hoverOffset: 4
    },
    options: {
      scales: {
      /*  yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })*/


  const ctx3 = document.getElementById('myChart3')
  const myChart3 = new Chart(ctx3, {
    type: 'pie',
    data: {
      //eje x
      labels: makeFilterCategory(arrExpenses), //funcion que retorna array de categorias
      // eje y
      datasets: [{
        
        data: sumExpensesByCategory(),//funcion que retorna array de suma x categoria
      //  lineTension: 0,
      backgroundColor: randomColor(),
      }],
      hoverOffset: 4
    },
    options: {
      scales: {
      /*  yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]*/
      },
      legend: {
        display: false
      }
    }
  })

})()

