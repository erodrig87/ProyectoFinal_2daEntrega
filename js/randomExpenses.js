// se ingresan automaticamente 9 gastos para poder utilizar funciones de calculo
function randomExpenses() {

    for (let i = 0; i < 3; i++) {
        let valor = Math.floor(Math.random() * 500);
        let fecha = new Date();
        nuevoGasto = new Gasto(fecha.toLocaleDateString(), "A", valor, `RECIBO${i}`, "Efec.");
        arrayGastos.push(nuevoGasto);
        nuevoGasto.storeExpense();
        addRowTable(nuevoGasto);
    }
    for (let i = 3; i < 6; i++) {
        let valor = Math.floor(Math.random() * 500);
        let fecha = new Date();
        nuevoGasto = new Gasto(fecha.toLocaleDateString(), "B", valor, `RECIBO${i}`, "Transf.");
        arrayGastos.push(nuevoGasto);
        nuevoGasto.storeExpense();
        addRowTable(nuevoGasto);
    }
    for (let i = 6; i < 9; i++) {
        let valor = Math.floor(Math.random() * 500);
        let fecha = new Date();
        nuevoGasto = new Gasto(fecha.toLocaleDateString(), "C", valor, `RECIBO${i}`, "Efec.");
        arrayGastos.push(nuevoGasto);
        nuevoGasto.storeExpense();
        addRowTable(nuevoGasto);
    }
}
