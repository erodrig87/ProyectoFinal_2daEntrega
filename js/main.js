// Mensaje de informacion
/*alert(
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
-Boton 'Filtrar Categoria', solicita ingresar categoria a filtrar y muestra gastos.`);*/

//Def variables globales
let gasto_total = 0;
let avgExpense = parseFloat(JSON.parse(localStorage.getItem("AVERAGE_EXPENSES")) || 0);
let maxExpense = parseFloat(JSON.parse(localStorage.getItem("MAX_EXPENSE")) || 0);
let gasto_min = parseFloat(JSON.parse(localStorage.getItem("MIN_EXPENSE")) || 0);
let ID_GASTO_GLOBAL = JSON.parse(localStorage.getItem("ID_GASTO_GLOBAL")) || 0;
let arrExpensesStored = JSON.parse(localStorage.getItem("arrExpensesStored")) || [];
let arrExpenses = [];
let selectedFecha;
let selectedValue;

arrExpensesStored.length>0 && updateArrayExpenseTable();


//randomExpenses();
