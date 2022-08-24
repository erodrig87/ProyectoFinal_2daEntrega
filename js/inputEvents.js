//Declaracion de Eventos
let btmInputExpenseForm = document.getElementById("btmInputExpenseForm");
btmInputExpenseForm.onclick = () => { readFormInput();};//crearGasto(); };
//let btmMostrarCalculos = document.getElementById("btmMostrarCalculos");
//btmMostrarCalculos.onclick = () => { sumExpenses(filterDate(arrExpenses,"30/8/2022"));};// mostrarCalculos(); };
//let btmFiltrar = document.getElementById("btmFiltrar");
//btmFiltrar.onclick = () => { getUniqueCategory(arrExpenses) };
let btmReset = document.getElementById("btmReset");
btmReset.onclick = () => { resetExpense(); };



