//------------------------------MOSTRAR LIBRO CUARDADO EN LA API-----------------------------------
//escuchador de eventos
document.addEventListener('DOMContentLoaded', obtnerLibrosApi);

// traer los datos que se encuentran en la api
function obtnerLibrosApi() {
    fetch('http://localhost:3000/books')
        .then(Response => Response.json())
        .then(data => mostrarLibros(data))
        .catch(
            function (error) {
                console.log(error);
            });
}

//ingresar datos en la tabla y mostrarlos en html
function mostrarLibros(listLibros) {
    let datosLibrosFila = document.getElementById("tableBody");
    let libros = "";
    for (var contador = 0; contador < listLibros.length; contador++) {
        let datosFila = `<tr>
                            <td> ${listLibros[contador].id} </td>
                            <td> ${listLibros[contador].title} </td>
                            <td> ${listLibros[contador].genre} </td>
                            <td> ${listLibros[contador].author} </td>
                            <td>
                                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#deleteModal" onclick="obtenerLibroEliminar('${listLibros[contador].id}', '${listLibros[contador].title}')">ELIMINAR</button>
                            </td>
                            <td>
                            <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#editModal" onclick="obtenerLibroAEditar('${listLibros[contador].id}'); datosActuales('${listLibros[contador].title}', '${listLibros[contador].genre}', '${listLibros[contador].author}');">EDITAR</button>
                            </td>
                        </tr>`;
        //insertar la tabla en archivo html de acuardo al id
        libros += datosFila;
    }
    datosLibrosFila.innerHTML =libros 
}

//----------------------------------------CREAR LIBRO----------------------------------------------------------------------------

const saveButton = document.getElementById('saveBookButton')
saveButton.addEventListener('click', crearLibros)

//funcion para capturar datos ingresados desde modal crear libro
function crearLibros() {
    let title = document.getElementById('name');
    let genre = document.getElementById('genre');
    let author = document.getElementById('author');

    fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            title : title.value, 
            genre : genre.value, 
            author : author.value
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        cerrarModal('createModal')
        obtnerLibrosApi()    
    })
    .catch(
        function (error) {
            console.log(error);
    });
}

//--------------------------------ELIMININAR LIBRO------------------------------------------------------------

let libroAEliminarId = "";
function obtenerLibroEliminar(id,titulo){
    libroAEliminarId = id;
    document.getElementById('eliminarLibroSpanId').innerHTML = id;
    document.getElementById('eliminarLibroSpanTitulo').innerHTML = titulo;
}

function eliminarLibro(){
   let id = libroAEliminarId;

    fetch('http://localhost:3000/books/'+ id, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        cerrarModal('deleteModal');
        obtnerLibrosApi();
        alert(' Libro eliminado correctamente')
    })
     .catch(
        function (error) {
            alert('error al tratar de borrar el libro')
            console.log(error);
    });

}

//--------------------------------EDITAR LIBRO----------------------------------------------------

//funcion para obtener libro a editar
let libroAEditarId = "";
function obtenerLibroAEditar(id){
    libroAEditarId = id;
    console.log(libroAEditarId)
}
//funcion actualizar libro
function actualizarLibro(){
   let id = libroAEditarId;
    let title = document.getElementById('titulo2').value
    let genre = document.getElementById('genre2').value
    let author = document.getElementById('author2').value
    console.log(id)

    fetch('http://localhost:3000/books/'+ id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            title : title, 
            genre : genre, 
            author : author  
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        cerrarModal('editModal');
        obtnerLibrosApi();
        alert('libro actualizado correctamente')
    })
    .catch(
        function (error) {
            console.log(error);
    });
}
















//---------------------------------funciones--------------------------------------------------------
//funcion cerrar modal
function cerrarModal(modalId) {
    const existingModal = document.getElementById(modalId);
    const modal = bootstrap.Modal.getInstance(existingModal);
    modal.hide();
}


//FUNCION RELLLENAR CAMPOS EDITAR CON DATOS ACTUALES
function datosActuales(title,genre,author){
    document.getElementById('titulo2').value = title;
    document.getElementById('genre2').value = genre;
    document.getElementById('author2').value = author;

}

//funcion campos crear libro en blanco
function CamposEnBlanco(){
    var title =  document.getElementById('name');
    var author = document.getElementById('author');
    var genre =  document.getElementById('genre');

    title.value = "";
    author.value = ""; 
    genre.value = "SELECCIONE OPCION";
}