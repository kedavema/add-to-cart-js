// Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


loadEventListeners();
function loadEventListeners() {
    // Agrega articulo al carrito
    listaCursos.addEventListener( 'click', agregarCurso );

    // Eliminar articulo del carrito
    carrito.addEventListener( 'click', eliminarCurso );

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener( 'click', () => {
        articulosCarrito = [];
        limpiarHTML();
    });
}

// Funciones
function agregarCurso(e) {
    e.preventDefault();
    if ( e.target.classList.contains('agregar-carrito') ) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatoCurso( cursoSeleccionado );
    }
}

function eliminarCurso(e) {
    if ( e.target.classList.contains('borrar-curso') ) {
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );
        carritoHTML();
    }
}


// Extrae la informacion del curso.
function leerDatoCurso( curso ) {

    //Crear objeto con el contenido del curso
    const infoCurso = {
        id: curso.querySelector('a').getAttribute('data-id'),
        imagenSrc: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        cantidad: 1
    };
    // Verificar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if ( existe ) {
        const cursos = articulosCarrito.map( curso => {
            if ( curso.id === infoCurso.id ){
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    } else {
        // Agregar elementos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();

}

// Muestra el carrito en el HTML
function carritoHTML() {

    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagenSrc}" width="100">
            </td>
            <td>
                ${curso.titulo}
            </td>
            <td>
                ${curso.precio}
            </td>
            <td>
                ${curso.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
            </td>
        `;
        contenedorCarrito.appendChild(row);
    })
}

// Limpiar html
function limpiarHTML() {
    while( contenedorCarrito.firstChild ) {
        contenedorCarrito.removeChild( contenedorCarrito.firstChild );
    }
}
