// capturamos los elementos del htmal usando el DOM
const mensajeError = document.getElementById ("mensajeError");
const btnAgregar = document.getElementById ("btnAgregar");
const inputActividad = document.getElementById ("actividadInput");
const listaActividades = document.getElementById ("listaActividades");
const mensajeVacio = document.getElementById ("mensajeVacio")

const listaTotalActividades = document.getElementById ("listaTotalActividades");
const listaTotalActividadesRealizadas = document.getElementById ("listaTotalActividadesRealizadas");
const listaTotalActividadesPendientes = document.getElementById ("listaTotalActividadesPendientes");
//evento para agregar actividad al hacer clik en el boton
btnAgregar.addEventListener("click", agregarActividad);

inputActividad.addEventListener ("keypress", function(evento) {
    if (event.key === "Enter") {
        agregarActividad(); 
    }
});

//Funcion Principal Para Agregar Una Actividad
function agregarActividad(){
    const textoActividad = inputActividad.value.trim ();
    
    //Validacion de Campo Vacio
    if(textoActividad === ""){
        mensajeError.textContent = "Por favor, escribe una actividad antes de agregar";
        return;
    }
    //limpiamos el mensaje de error
    mensajeError.textContent = "";
    const nuevaActividad = document.createElement ("li");

    //Creamos un span para el texto de la actividad
    const texto = document.createElement ("span");
    texto.textContent = textoActividad; 

    //Creamos el contenedor de los botones
    const contenedorBotones = document.createElement ("div");
    contenedorBotones.classList.add ("botones");

    //Boton para marcar como Realizado
    const btnRealizado = document.createElement ("button");
    btnRealizado.textContent = "Realizado";
    btnRealizado.classList.add ("btn-realizada");

    //Boton para marcar como Eliminar
    const btnEliminar = document.createElement ("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add ("btn-Elimminar");

    //Evento para marcar o desenmarcar como realizado
    btnRealizado.addEventListener ("click", function(){ 
        nuevaActividad.classList.toggle ("realizada");

        if(nuevaActividad.classList.contains ("realizada")){
            btnRealizado.textContent = "Realizado";
        }else{
            btnRealizado.textContent = "Pendiente";
        }
         actualizarContadores();
        
        });

        btnEliminar.addEventListener ("click", function(){
            listaActividades.removeChild (nuevaActividad);
            actualizarContadores();
        })

        //Agregamos los botones al contador
        contenedorBotones.appendChild(btnRealizado);
        contenedorBotones.appendChild(btnEliminar);

        //Agregamos el Texto a los botones al li

        nuevaActividad.appendChild(texto);
        listaActividades.appendChild(nuevaActividad);
        nuevaActividad.appendChild(contenedorBotones);

        actualizarContadores();
}


//funcion para actualizar total, realizadas y pendientes
function actualizarContadores(){
    const Actividades = listaActividades.querySelectorAll ("li");
    const realizadas = listaActividades.querySelectorAll (".realizada");

    const total = Actividades.length;
    const listaTotalRealizadas = realizadas.length;
    const pendientes = total - listaTotalRealizadas;

    listaTotalActividades.textContent = total;
    listaTotalActividadesRealizadas.textContent = listaTotalRealizadas;
    listaTotalActividadesPendientes.textContent= pendientes;

    //Mostrar 

    if(total === 0){
        mensajeVacio.style.display ="block";
    }else{
        mensajeVacio.style.display = "none";
    
    }
}