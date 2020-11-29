
// Variables

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody"); 
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

// Funciones

cargarEventListeners()

function cargarEventListeners() {
    //Cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);

    //Eliina cursos del carrito
    carrito.addEventListener("click", eliminarCurso);

    //variar el carrito
    vaciarCarritoBtn.addEventListener("click", () => {
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML(); // eliminamos todo el html
    })
}

function agregarCurso(e) {
    e.preventDefault();
    
    if(e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;

        leerDatosCurso(cursoSeleccionado);
    }
    
}


//eliminar un curso del carrito

function eliminarCurso(e) {
    
    if(e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute("data-id");

        //eliminar curso por el data id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML(); //iterar sobre el carrito y mostrar su html
    }
}

//Lee el contenido del html al que le dimos click y extra la info del curso

function leerDatosCurso(curso){
    console.log(curso);

    //Crea un objeto con el contenido del curso actual

    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1

    }


    //revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else{
                return curso; //retorna los objetos que no son los duplicados
            }
        })

        articulosCarrito = [...cursos];

    } else{
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    

    console.log(articulosCarrito)

    carritoHTML();
}

//Muestra el carrito de compras en el html

function carritoHTML(){

    //limpiar el html
    limpiarHTML();


    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>  
        <td>${titulo}</td>  
        <td>${precio}</td>  
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        //Agrega el html del carrito al tbody

        contenedorCarrito.appendChild(row);
    });
}


//elimina los cursos del tbody
function limpiarHTML(){

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
   /*  contenedorCarrito.innerHTML = ""; */
}