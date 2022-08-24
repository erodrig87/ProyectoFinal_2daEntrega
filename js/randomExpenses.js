// se ingresan automaticamente 9 gastos para poder utilizar funciones de calculo
function randomExpenses() {

    for (let i = 6; i < 9; i++) {
        let valor = Math.floor(Math.random() * 2000);
        let fecha = new Date();
        fecha.setDate(fecha.getDate() - i);
        nuevoGasto = new Gasto(fecha.toLocaleDateString(), "C", valor, `RECIBO${i}`, "Efec.",ID_GASTO_GLOBAL++);
        arrExpenses.push(nuevoGasto);
        nuevoGasto.storeExpense();
        addRowTable(nuevoGasto);
    }
    for (let i = 3; i < 6; i++) {
        let valor = Math.floor(Math.random() * 2000);
        let fecha = new Date();
        fecha.setDate(fecha.getDate() - i);
        nuevoGasto = new Gasto(fecha.toLocaleDateString(), "B", valor, `RECIBO${i}`, "Transf.",ID_GASTO_GLOBAL++);
        arrExpenses.push(nuevoGasto);
        nuevoGasto.storeExpense();
        addRowTable(nuevoGasto);
    }
    for (let i = 0; i < 3; i++) {
        let valor = Math.floor(Math.random() * 2000);
        let fecha = new Date();
        fecha.setDate(fecha.getDate() - i);
        nuevoGasto = new Gasto(fecha.toLocaleDateString(), "A", valor, `RECIBO${i}`, "Efec.",ID_GASTO_GLOBAL++);
        arrExpenses.push(nuevoGasto);
        nuevoGasto.storeExpense();
        addRowTable(nuevoGasto);
    }
    makeFilterCategory(arrExpenses);
    localStorage.setItem("RANDOM_EXPENSES","false");
}
