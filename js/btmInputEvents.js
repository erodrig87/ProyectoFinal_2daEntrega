//Declaracion de Eventos
let btmInputExpenseForm = document.getElementById("btmInputExpenseForm");
btmInputExpenseForm.onclick = () => { readFormInput();};//crearGasto(); };
let btmMostrarCalculos = document.getElementById("btmMostrarCalculos");
btmMostrarCalculos.onclick = () => { mostrarCalculos(); };
let btmFiltrar = document.getElementById("btmFiltrar");
btmFiltrar.onclick = () => { filtrar(); };
let btmReset = document.getElementById("btmReset");
btmReset.onclick = () => { resetGastos(); };
