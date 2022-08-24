//Devuelve la posicion del gasto maximo
const maxGasto = () => {
    const valores = arrExpenses.map((object) => object.valor);
    max = Math.max.apply(null,valores);
    localStorage.setItem("MAX_EXPENSE", JSON.stringify(max));
    return valores.indexOf(max);
}

//Devuelve la posicion del gasto minimo
const minGasto = () => {
    const valores = arrExpenses.map((object) => object.valor);
    min = Math.min.apply(null,valores);
    localStorage.setItem("MIN_EXPENSE", JSON.stringify(min));
    return valores.indexOf(min);
}
//Devuelve el avgExpense de gastos ingresados
const avgExpenses = () => {
    let suma_valores = 0;
    let prom = 0;
    arrExpenses.forEach(function(gasto) { suma_valores += gasto.valor });
    prom = (suma_valores/arrExpenses.length);
    localStorage.setItem("AVERAGE_EXPENSES", JSON.stringify(prom));
    return prom;
}


//Muestra calculos realizados
/*const mostrarCalculos = () => {
    let mensajeCalculos = "";
    if (arrExpenses.length > 0) {
        let indexGastoMax = maxGasto();
        let indexGastoMin = minGasto();
        mensajeCalculos += `Gasto Maximo = Fecha: ${arrExpenses[indexGastoMax].fecha} | Categoria: ${arrExpenses[indexGastoMax].categoria} | Valor: ${arrExpenses[indexGastoMax].valor.toFixed(2)}\n`;
        mensajeCalculos += `Gasto Minimo = Fecha: ${arrExpenses[indexGastoMin].fecha} | Categoria: ${arrExpenses[indexGastoMin].categoria} | Valor: ${arrExpenses[indexGastoMin].valor.toFixed(2)}\n`;
        mensajeCalculos += `Promedio de gastos: ${avgExpenses().toFixed(2)}`;
        alert(mensajeCalculos)
    } else {
        mensajeCalculos += 'No es posible realizar calculos debido a que no se ingresaron gastos'
        alert(mensajeCalculos);


    }
}*/