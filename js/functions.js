
//crea un objeto gasto tomando los parametros ingresados en el form
const readFormInput = () => {
    
    let validado = true;
    let fecha = new Date(document.getElementById("inputDate").value);    
    fecha = fecha.toLocaleDateString();
    if(fecha=="Invalid Date") validado = false;
    let categoria = (document.getElementById("inputTypeExpense").value).toUpperCase();
    if(categoria=="") validado = false;
    let valor = parseFloat(document.getElementById("inputValueExpense").value);
    if(valor=="NaN") validado = false;
    let remito = document.getElementById("inputTicketNumberExpense").value;
    let pago = document.getElementById("inputPaymentMethod").value;

    if(validado){
        nuevoGasto = new Gasto(fecha, categoria, valor,remito,pago,ID_GASTO_GLOBAL++);
        arrayGastos.push(nuevoGasto);
        document.getElementById("inputExpenseForm").reset();
        nuevoGasto.storeExpense();
        addRowTable(nuevoGasto);
    } else { 
        alert("ingresar datos validos");
    }
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
    /*
    let enJSON = JSON.stringify(objeto);
    localStorage.setItem(objeto.ID,enJSON);*/
}