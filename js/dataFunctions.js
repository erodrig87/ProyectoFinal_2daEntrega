
//crea un objeto gasto tomando los parametros ingresados en el form
const readFormInput = () => {
    
    let validado = true;
    let fecha = new Date(`${document.getElementById("inputDate").value}T00:00`);//.value);    
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
        arrExpenses.push(nuevoGasto);
        document.getElementById("inputExpenseForm").reset();
        nuevoGasto.storeExpense();
        addRowTable(nuevoGasto);
        makeFilterCategory(arrExpenses);
        if(document.getElementById("alertMsg"))document.getElementById("alertMsg").remove();

    } else { 
        nodoform = document.getElementById("inputExpenseForm");
        nodo = document.createElement("div");
        nodo.id = "alertMsg";
        nodo.classList = "alert alert-warning"; nodo.style.visibility = "visible";
        nodo.innerHTML = "Los datos ingresados no son validos";
        nodoform.appendChild(nodo);
    }
}

//funcion agrega fila de tabla con gasto
function addRowTable(objeto){
    
    // ubicacioon de elementos de tabla en html
    let tableElements = document.getElementById("tableElements");
    // creo nodo fila
    nodofila = document.createElement("tr");
    nodofila.id= objeto.ID; 

    // evento onmouseenter en cada fila
    nodofila.onmouseenter = () =>{
            //objeto.deleteCompleteRow();
            //arrExpenses.splice(index,1);
            updateCanvas(objeto);
    }
    tableElements.appendChild(nodofila);

    // creo nodo celda indicacion numero de fila visualizada (no tabla)
    let nodo_index =document.createElement('td');
    nodo_index.innerText=`${arrExpenses.length}`;
    nodofila.appendChild(nodo_index);

    // Utilizo metodo de clase para generar nodos para cada atributo y completar al tabla
    for( const atributo in objeto){
        if(atributo!="ID"){
            nodofila.appendChild(objeto.returnNodoCeldaTabla(atributo)); 
        }
    }
}
//funcion lee gastos almacenados y actualiza tabla y array de gastos
function updateArrayExpenseTable(){

    arrExpensesStored.forEach(function(expenseStored) {
        let nuevoGasto = new Gasto(expenseStored.fecha, expenseStored.categoria, expenseStored.valor,expenseStored.remito,expenseStored.pago,expenseStored.ID.replace(/\D/g,''));
        arrExpenses.push(nuevoGasto);
        addRowTable(nuevoGasto);
     })
     makeFilterCategory(arrExpenses);    
}
// funcion que devuelve el Array de Gastos filtrado segun categoria

/*const filtrarCategoria = (categoriaFiltrada) => {
    let arrayFiltrado = arrExpenses.filter(function (gasto) {
        return gasto.categoria == categoriaFiltrada;
      });
      return arrayFiltrado;
}*/
//funcion inicializa app
const resetExpense = (dias) => {
    
    arrExpenses.forEach(function(gasto) { gasto.deleteCompleteRow()});
    gasto_total = 0;
    avgExpense = 0;
    maxExpense =0;
    gasto_min = 0;

   while (arrExpenses.length) {
         arrExpenses.pop();
    }
    localStorage.clear();
}

// identifica categorias y crea filtro en tabla con checkbox seleccionable
function makeFilterCategory(_array){

    categorias = _array.map((object) => object.categoria);

    let newArray = categorias.filter((element, index, array) => array.indexOf(element) === index);
    
    let categoryDropDownFilter = document.getElementById("categoryFilter");
    categoryDropDownFilter.innerHTML="";
      // creo nodo linea
    
    newArray.forEach((element) => {
        
        checkbox = document.createElement("div");
        checkbox.classList = "form-check"; 
        input = document.createElement("input");
        input.classList = "form-check-input";
        input.type = "checkbox"; input.value= ""; input.id = `categoryFilter_${element}`; input.name = `categoryFilter_${element}`;
        input.checked = true;
        document.querySelector(`input[name=categoryFilter_${element}]`);
        input.addEventListener('change', function() {
            if (this.checked) {
              console.log(`Checkbox ${element}] is checked..`);
              categoryFilterChecked(element);
            } else {
              console.log(`Checkbox ${element}] is not checked..`);
              categoryFilterNotChecked(element);
            }
          })
        label = document.createElement("label");
        label.classList = "form-check-label"; label.htmlFor= "flexCheckDefault";
        label.innerHTML = `${element}`;
        checkbox.appendChild(input);
        checkbox.appendChild(label);
        categoryDropDownFilter.appendChild(checkbox);

      })
      localStorage.setItem("uniqueCategories",newArray.length); 
      return newArray;

}



function filterDate(_array,filterDate){

    let filteredArray = _array.filter((element, index, array) => array[index].fecha == filterDate);

    return filteredArray;  
}

function filterCategory(_array,filterCategory){

    let filteredArray = _array.filter((element, index, array) => array[index].categoria == filterCategory);

    return filteredArray;  
}


//actualiza valor en canvas segun posicion de mouse
function updateCanvas(objeto){
    let canvas = document.getElementById("textSelectedRow");
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "40px Arial";
    context.fillText(`$ ${objeto.valor}`, 30, 50);
}

//habilita visibilidad de fila segun filtro categoria
function categoryFilterChecked(filterSelected){
    arrExpenses.forEach((objeto) =>{
        if(objeto.categoria==filterSelected){
            document.getElementById(objeto.ID).style.visibility = "visible";
        }
    })   
   
}

//habilita visibilidad de fila segun filtro categoria
function categoryFilterNotChecked(filterSelected){
    arrExpenses.forEach((objeto) =>{
        if(objeto.categoria==filterSelected){
            document.getElementById(objeto.ID).style.visibility = "collapse";
        }
    })    
}