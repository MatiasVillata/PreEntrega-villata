// Variables
const carrito = document.getElementById('lista-carrito').getElementsByTagName('tbody')[0];
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const productContent = document.querySelector('.product-content');
let articulosCarrito = [];
let productos = [];

// Listeners
cargarEventListeners();
function cargarEventListeners() {
    // Cargar productos desde el archivo JSON
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            generarProductos();
        })
        .catch(error => console.error('Error al cargar productos:', error));

    // Agregar producto cuando se presiona "Agregar al Carrito"
    productContent.addEventListener('click', agregarProducto);

    // Elimina productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // Resetea el arreglo
        limpiarHTML(); // Eliminamos todo el HTML
        localStorage.removeItem('carrito'); // Limpiar localStorage
    });
}

// Función para generar productos en el HTML
function generarProductos() {
    productos.forEach(producto => {
        const { id, imagen, titulo, descripcion, precio } = producto;
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

// Función para agregar producto al carrito
function agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoId = e.target.getAttribute('data-id');
        const productoSeleccionado = productos.find(producto => producto.id == productoId);
        leerDatosProducto(productoSeleccionado);
    }
}

// Función para eliminar producto del carrito
function eliminarProducto(e) {
    if (e.target.classList.contains('borrar-producto')) {
        e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
        const productoId = e.target.getAttribute('data-id');
        
        // Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);
        
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
        guardarCarritoEnLocalStorage(); // Actualiza el carrito en localStorage
    }
}

// Lee el contenido del producto seleccionado y extrae la información
function leerDatosProducto(producto) {
    // Crear un objeto con la información del producto actual
    const infoProducto = {
        imagen: producto.imagen,
        titulo: producto.titulo,
        precio: producto.precio,
        id: producto.id,
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
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
        // Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    carritoHTML();
    guardarCarritoEnLocalStorage(); // Actualiza el carrito en localStorage
}

// Muestra el carrito de compras en el HTML
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML
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

        // Agrega el HTML del carrito en el tbody
        carrito.appendChild(row);
    });
}

// Elimina los productos del tbody
function limpiarHTML() {
    // Forma rápida de limpiar (recomendada)
    while (carrito.firstChild) {
        carrito.removeChild(carrito.firstChild);
    }
}

// Guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Cargar el carrito desde localStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        articulosCarrito = carritoGuardado;
        carritoHTML();
    }
}

// Inicializa el carrito desde localStorage cuando la página se carga
document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage();
    // Asegúrate de cargar los productos después de inicializar el carrito
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            generarProductos();
        })
        .catch(error => console.error('Error al cargar productos:', error));
});
