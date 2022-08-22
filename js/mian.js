// Mensaje de informacion
alert(
`Se ingresan en automaticamente 9 gastos en 3 categorias diferentes para facilitar pruebas y visualizacion.
 
Se agregan eventos:
- Los botones se encuentran manejados por eventos onclick declarados en .js
- Al hacer pasar el mouse por la tabla, se visualiza en canvas el valor correspondiente a la fila en la que se encuentra el mouse.

Interaccion con HTML:
- Se puede ingresar un nuevo gasto desde el Formularo
- La tabla Detalle gasto visualiza los gastos ingresados
- Boton 'Reset Gastos', elimina gastos ingresados y elimina contenido de la tabla
        
Sin interaccion con HTML:
-Boton 'Mostrar Calculos', muestra gasto maximo, minimo y promedio total.
-Boton 'Filtrar Categoria', solicita ingresar categoria a filtrar y muestra gastos.`);

//Def variables globales
let gasto_total = 0;
let promedio = 0;
let gasto_max = 0;
let gasto_min = 0;
let ID_GASTO_GLOBAL = 0;
let selectedFecha;
let selectedValue;

//Def array para almacenar objetos creados de clase Gasto
let arrayGastos = [];

// Def clase Gastos, para crear objetos de tipo clase de gastos.
class Gasto {
    constructor(fecha, categoria, valor,remito,pago) {
        this.fecha = fecha;
        this.categoria = categoria;
        this.valor = valor;
        this.remito = remito;
        this.pago = pago;
        this.ID = `ID_GASTO_${ID_GASTO_GLOBAL++}`;
    }
    //metodo retorna nodo de celda de tabal segun parametro atributo
    returnNodoCeldaTabla(atributo)
    {
        let nodo =document.createElement('td');
        nodo.innerText=`${this[atributo]}`;
        return nodo;
    }
    deleteCompleteRow()  
    {     
        let row = document.getElementById(this.ID);
        row.parentNode.removeChild(row);
    }
    //boolCategoria = (check_categoria) => (this.categoria == check_categoria) ? true : false; Metodo devuelve bool segun valor categoria || no utilizado
}

//Funcion mensaje estado variables globales
function alertStatus() {
    alert(`
    El promedio de los gastos ingresados es: ${promedio.toFixed(2)}
    El gasto maximo fue de: ${gasto_max.toFixed(2)}
    El gasto minimo fue de: ${gasto_min.toFixed(2)}
    El gasto total fue de: ${gasto_total.toFixed(2)}
    Cantidad de gastos ingresados: ${arrayGastos.length}`);
}

//Funcion resetea variables globales y elimina objetos del array de gastos
const resetGastos = (dias) => {
    arrayGastos.forEach(function(gasto) { gasto.deleteCompleteRow()});
    gasto_total = 0;
    promedio = 0;
    gasto_max =0;
    gasto_min = 0;

   while (arrayGastos.length) {
         arrayGastos.pop();
    }
    ID_GASTO_GLOBAL = 0;
    alertStatus();

}

//funcion que devuelve fecha actual - x dias pasados como parametro utilizada en dashboard.js para modificar eje x del grafico
const restarDias = (dias) => {
    fecha = new Date();
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
}

//crea un objeto gasto tomando los parametros ingresados en el form
const crearGasto = () => {
    
    fecha = new Date(document.getElementById("inputDate").value);    
    fecha = fecha.toLocaleDateString();
    categoria = document.getElementById("inputTypeExpense").value;
    valor = parseFloat(document.getElementById("inputValueExpense").value);
    remito = document.getElementById("inputTicketNumberExpense").value;
    pago = document.getElementById("inputPaymentMethod").value;

    let nuevoGasto = new Gasto(fecha, categoria, valor,remito,pago);
    arrayGastos.push(nuevoGasto);

    document.getElementById("inputExpenseForm").reset();
    addRowTable(nuevoGasto);
 }

//funcion agrega fila de tabla con nuevo gasto  
function addRowTable(objeto){
    
        // ubicacioon de elementos de tabla en html
        let tableElements = document.getElementById("tableElements");
        // creo nodo fila
        nodofila = document.createElement("tr");
        nodofila.id= objeto.ID; 

        // evento onmouseenter en cada fila
        let index = arrayGastos.length -1;
        nodofila.onmouseenter = () =>{
                //objeto.deleteCompleteRow();
                //arrayGastos.splice(index,1);
                updateCanvas(objeto);
        }
        tableElements.appendChild(nodofila);

        // creo nodo celda indicacion numero de fila visualizada (no tabla)
        let nodo_index =document.createElement('td');
        nodo_index.innerText=`${arrayGastos.length}`;
        nodofila.appendChild(nodo_index);

        // Utilizo metodo de clase para generar nodos para cada atributo y completar al tabla
        for( const atributo in objeto){
            if(atributo!="ID"){
                nodofila.appendChild(objeto.returnNodoCeldaTabla(atributo)); 
            }
        }
}
//Devuelve la posicion del gasto maximo
const maxGasto = () => {
    const valores = arrayGastos.map((object) => object.valor);
    max = Math.max.apply(null,valores);
    return valores.indexOf(max);
}

//Devuelve la posicion del gasto minimo
const minGasto = () => {
    const valores = arrayGastos.map((object) => object.valor);
    min = Math.min.apply(null,valores);
    return valores.indexOf(min);
}
//Devuelve el promedio de gastos ingresados
const promedioGastos = () => {
    let suma_valores = 0;
    arrayGastos.forEach(function(gasto) { suma_valores += gasto.valor });
    return suma_valores/arrayGastos.length;
}
//Muestra calculos realizados
const mostrarCalculos = () => {
    let mensajeCalculos = "";
    if (arrayGastos.length > 0) {
        let indexGastoMax = maxGasto();
        let indexGastoMin = minGasto();
        mensajeCalculos += `Gasto Maximo = Fecha: ${arrayGastos[indexGastoMax].fecha} | Categoria: ${arrayGastos[indexGastoMax].categoria} | Valor: ${arrayGastos[indexGastoMax].valor.toFixed(2)}\n`;
        mensajeCalculos += `Gasto Minimo = Fecha: ${arrayGastos[indexGastoMin].fecha} | Categoria: ${arrayGastos[indexGastoMin].categoria} | Valor: ${arrayGastos[indexGastoMin].valor.toFixed(2)}\n`;
        mensajeCalculos += `Promedio de gastos: ${promedioGastos().toFixed(2)}`;
        alert(mensajeCalculos)
    } else {
        mensajeCalculos += 'No es posible realizar calculos debido a que no se ingresaron gastos'
        alert(mensajeCalculos);
    }
}

// funcion que devuelve el Array de Gastos filtrado segun categoria

const filtrarCategoria = (categoriaFiltrada) => {
    let arrayFiltrado = arrayGastos.filter(function (gasto) {
        return gasto.categoria == categoriaFiltrada;
      });
      return arrayFiltrado;
}

// visualiza objetos filtrados, invoca funcion que devuelve array filtrado 
const filtrar = () => { 
    let mensajeCategoria = "";
    if (arrayGastos.length > 0) {
        let categoriaFiltrada = prompt("ingresar categoria a filtrar").toLocaleUpperCase();
        let arrayFiltrado = filtrarCategoria(categoriaFiltrada);
        if(arrayFiltrado.length!=0){
            arrayFiltrado.forEach(gasto => {
                mensajeCategoria += `Fecha:${gasto.fecha}|Cat.:${gasto.categoria}|Valor:${gasto.valor.toFixed(2)}|Remito:${gasto.remito}|Pago: ${gasto.pago}\n`;
            })
            alert(mensajeCategoria);
        }else{
            mensajeCategoria = "No hay gastos en la categoria ingresada";
            alert(mensajeCategoria);
        }
        }else {
        mensajeCategoria += 'No se ingresaron gastos'
        alert(mensajeCategoria);

    } 
}
//Muestra gastos realizados recorriendo el array
function mostrarGastos() {
    let mensajeGastos = "";
    if (arrayGastos.length > 0) {
        mensajeGastos = "Gastos realizados\n";
        arrayGastos.forEach(gasto => {
            mensajeGastos += `Fecha: ${gasto.fecha} | Categoria: ${gasto.categoria} | Valor: ${gasto.valor.toFixed(2)}\n`;
        });
        alert(mensajeGastos);
    } else {
        mensajeGastos += 'No se ingresaron gastos';
        alert(mensajeGastos);
    }
}
// se ingresan automaticamente 9 gastos para poder utilizar funciones de calculo
for(let i=0;i<3;i++)
{
    let valor = Math.floor(Math.random() * 500);
    let fecha = new Date();
    nuevoGasto = new Gasto(fecha.toLocaleDateString(), "A", valor,`RECIBO${i}`,"Efec.");
    arrayGastos.push(nuevoGasto);
    addRowTable(nuevoGasto);
}
for(let i=3;i<6;i++)
{
    let valor = Math.floor(Math.random() * 500);
    let fecha = new Date();
    nuevoGasto = new Gasto(fecha.toLocaleDateString(), "B", valor,`RECIBO${i}`,"Transf.");
    arrayGastos.push(nuevoGasto);
    addRowTable(nuevoGasto);
}
for(let i=6;i<9;i++)
{
    let valor = Math.floor(Math.random() * 500);
    let fecha = new Date();
    nuevoGasto = new Gasto(fecha.toLocaleDateString(), "C", valor,`RECIBO${i}`,"Efec.");
    arrayGastos.push(nuevoGasto);
    addRowTable(nuevoGasto);
}

//Declaracion de Eventos

let btmInputExpenseForm = document.getElementById("btmInputExpenseForm");
btmInputExpenseForm.onclick = () =>{crearGasto()};

let btmMostrarCalculos = document.getElementById("btmMostrarCalculos");
btmMostrarCalculos.onclick = () =>{mostrarCalculos()};

let btmFiltrar = document.getElementById("btmFiltrar");
btmFiltrar.onclick = () =>{filtrar()};

let btmReset= document.getElementById("btmReset");
btmReset.onclick = () =>{resetGastos()};

//funcion que actualiza canvas

function updateCanvas(objeto){
    let canvas = document.getElementById("textSelectedRow");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "40px Arial";
    context.fillText(`$ ${objeto.valor}`, 100, 50);
}


