// Def clase Gastos, para crear objetos de tipo clase de gastos.
class Gasto {
    constructor(fecha, categoria, valor, remito, pago,ID) {
        this.fecha = fecha;
        this.categoria = categoria;
        this.valor = valor;
        this.remito = remito;
        this.pago = pago;
        this.ID = `ID_GASTO_${ID}`;
    }
    //metodo retorna nodo de celda de tabal segun parametro atributo
    returnNodoCeldaTabla(atributo) {
        let nodo = document.createElement('td');
        nodo.innerText = `${this[atributo]}`;
        return nodo;
    }
    deleteCompleteRow() {
        let row = document.getElementById(this.ID);
        row.parentNode.removeChild(row);
    }
    storeExpense() {
        // Parse any JSON previously stored in allEntries
        let arrExpensesStored = JSON.parse(localStorage.getItem("arrExpensesStored"));
        if(arrExpensesStored == null) arrExpensesStored = [];
       //localStorage.setItem(this.ID, JSON.stringify(this));
        // Save allEntries back to local storage
        arrExpensesStored.push(this);
        localStorage.setItem("arrExpensesStored", JSON.stringify(arrExpensesStored));
        localStorage.setItem("ID_GASTO_GLOBAL", JSON.stringify(ID_GASTO_GLOBAL));
    };
}
