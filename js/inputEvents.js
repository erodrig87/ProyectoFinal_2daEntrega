//Declaracion de Eventos
let btmInputExpenseForm = document.getElementById("btmInputExpenseForm");
btmInputExpenseForm.onclick = () => { readFormInput();};//crearGasto(); };
//let btmMostrarCalculos = document.getElementById("btmMostrarCalculos");
//btmMostrarCalculos.onclick = () => { mostrarCalculos(); };
//let btmFiltrar = document.getElementById("btmFiltrar");
//btmFiltrar.onclick = () => { getUniqueCategory(arrExpenses) };
let btmReset = document.getElementById("btmReset");
btmReset.onclick = () => { resetExpense(); };

function updateCanvas(objeto){
    let canvas = document.getElementById("textSelectedRow");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "40px Arial";
    context.fillText(`$ ${objeto.valor}`, 30, 50);
}
