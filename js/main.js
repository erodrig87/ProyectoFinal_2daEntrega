// Mensaje de informacion
/*alert(
`Si no se encuentran datos almacenados se ingresan automaticamente 9 gastos en 3 categorias y fechas diferentes para facilitar pruebas y visualizacion.

- se almacenan gastos ingresados
- al refrescar la pagina los graficos se actualizan con los datos almacenados
- la tabla de gastos se puede filtrar seleccionando la categoria deseada
- se validan datos de ingreso de forumlario. 
`);*/

//Def variables globales
let createRandomExpenses = localStorage.getItem("RANDOM_EXPENSES") || "true";

let gasto_total = 0;
let avgExpense = parseFloat(JSON.parse(localStorage.getItem("AVERAGE_EXPENSES")) || 0);
let maxExpense = parseFloat(JSON.parse(localStorage.getItem("MAX_EXPENSE")) || 0);
let gasto_min = parseFloat(JSON.parse(localStorage.getItem("MIN_EXPENSE")) || 0);
let ID_GASTO_GLOBAL = JSON.parse(localStorage.getItem("ID_GASTO_GLOBAL")) || 0;
let arrExpensesStored = JSON.parse(localStorage.getItem("arrExpensesStored")) || [];
let arrExpenses = [];
let selectedFecha;
let selectedValue;

arrExpensesStored.length>0 && updateArrayExpenseTable(); // actuliza con gastos almacenados

(createRandomExpenses == "true") ? randomExpenses():false; // si no hay gastos ingresados, genera 9 aleatorios.
