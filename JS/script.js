// Variables
const carrito = document.getElementById('lista-carrito').getElementsByTagName('tbody')[0];
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const productContent = document.querySelector('.product-content');
let articulosCarrito = [];
let productos = [];

cargarEventListeners();

function cargarEventListeners() {
    // Cargar productos desde el JSON
    fetch('productos.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            productos = data;
            generarProductos();
        })
        .catch(error => console.error('Error al cargar productos:', error));

    // Agregar producto 
    productContent.addEventListener('click', agregarProducto);

    // Elimina productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Resetea el arreglo
        limpiarHTML(); // Eliminamos todo el HTML
        localStorage.removeItem('carrito'); // Limpiar localStorage
        Swal.fire({
            title: 'Carrito vaciado',
            text: 'Todos los productos han sido eliminados del carrito.',
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    });
}

// Función para generar productos
function generarProductos() {
    productos.forEach(({ id, imagen, titulo, descripcion, precio }) => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('product');
        divProducto.innerHTML = `
            <img src="${imagen}" alt="${titulo}">
            <div class="product-txt">
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
                <p class="precio">${precio}</p>
                <a href="#" class="agregar-carrito btn-2" data-id="${id}">Agregar al carrito</a>
            </div>
        `;
        productContent.appendChild(divProducto);
    });
}

function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoId = e.target.getAttribute('data-id');
        const productoSeleccionado = productos.find(producto => producto.id == productoId);
        leerDatosProducto(productoSeleccionado);
        
        Swal.fire({
            title: 'Producto agregado',
            text: `${productoSeleccionado.titulo} ha sido añadido al carrito.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    }
}

function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
        const productoId = e.target.getAttribute('data-id');

        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
        guardarCarritoEnLocalStorage(); // Actualiza el carrito en localStorage

        Swal.fire({
            title: 'Producto eliminado',
            text: 'El producto ha sido eliminado del carrito.',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
        });
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.imagen,
        titulo: producto.titulo,
        precio: producto.precio,
        id: producto.id,
        cantidad: 1
    }

    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        // Actualizamos la cantidad
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto; // retorna el objeto actualizado
            } else {
                return producto; // retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...productos];
    } else {
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    carritoHTML();
    guardarCarritoEnLocalStorage(); 
}

function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    articulosCarrito.forEach(producto => {
        const { imagen, titulo, precio, cantidad, id } = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}">X</a>
            </td>
        `;

        carrito.appendChild(row);
    });
}

function limpiarHTML() {
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
}

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        articulosCarrito = carritoGuardado;
        carritoHTML();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage();
});
