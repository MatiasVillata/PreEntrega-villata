let productosZapatillas = [
    { id: 1, nombre: "Zapatillas de basquet", precio: 250000 },
    { id: 2, nombre: "Zapatillas urbanas", precio: 210000 },
    { id: 3, nombre: "Zapatillas de running", precio: 200000 },
    { id: 4, nombre: "Zapatillas de fútbol", precio: 220000 }
];

let productosAccesorios = [
    { id: 1, nombre: "Medias", precio: 16000 },
    { id: 2, nombre: "Mangas de compresión", precio: 50000 },
    { id: 3, nombre: "Muñequeras", precio: 12000 },
    { id: 4, nombre: "Gorras", precio: 18000 }
];

let iva = 1.15; // Tasa de IVA

function saludar() {
    let nombre;
    
    do {
        nombre = prompt("Ingrese su nombre, por favor:");
    } while (nombre === "");
   
    alert("Bienvenido " + nombre + ", a continuación podrá elegir su producto.");
}

function mostrarOpciones(items) {
    let opciones = "";
    for (let i = 0; i < items.length; i++) {
        opciones += `${items[i].id}: ${items[i].nombre}\n`;
    }
    opciones += "5: Finalizar compra";
    return opciones;
}

function calcularPrecioConIVA(precioBase) {
    return precioBase * iva; 
}

function aplicarDescuento(precioBase, descuento) {
    return precioBase * (1 - descuento);  
}

function compraZapatillas() {
    let opciones = mostrarOpciones(productosZapatillas);
    let opcion = prompt("Elija una opción:\n" + opciones);

    let productoSeleccionado = null;
    for (let i = 0; i < productosZapatillas.length; i++) {
        if (opcion == productosZapatillas[i].id) {
            productoSeleccionado = productosZapatillas[i];
            break;  
        }
    }

    if (productoSeleccionado) {
        let precioTotal = calcularPrecioConIVA(productoSeleccionado.precio);
        alert(`Las ${productoSeleccionado.nombre} tienen un valor total de $${precioTotal}`);
        realizarPago(precioTotal);
    } else if (opcion === "5") {
        finalizarCompra();
    } else {
        alert("Ingrese una opción correcta.");
        compraZapatillas();  
    }
}

function comprarAccesorios() {
    let opciones = mostrarOpciones(productosAccesorios);
    let opcion = prompt("Elija una opción:\n" + opciones);

    let productoSeleccionado = null;
    for (let i = 0; i < productosAccesorios.length; i++) {
        if (opcion == productosAccesorios[i].id) {
            productoSeleccionado = productosAccesorios[i];
            break;  
        }
    }

    if (productoSeleccionado) {
        let precioTotal = calcularPrecioConIVA(productoSeleccionado.precio);
        alert(`Las ${productoSeleccionado.nombre} tienen un valor total de $${precioTotal}`);
        realizarPago(precioTotal);
    } else if (opcion === "5") {
        finalizarCompra();
    } else {
        alert("Ingrese una opción correcta.");
        comprarAccesorios();  
    }
}

function realizarPago(precioTotal) {
    let metodoPago = prompt("Elija su método de pago:\n 1: Tarjeta de crédito/débito\n 2: Transferencia bancaria (10% de descuento)");

    if (metodoPago === "2") {
        precioTotal = aplicarDescuento(precioTotal, 0.10);
        alert("Al pagar por transferencia bancaria, obtiene un 10% de descuento. El total a pagar es: $ " + precioTotal);
    } else {
        alert("El total a pagar es: $ " + precioTotal);
    }

    finalizarCompra();
}

function finalizarCompra() {
    alert("Gracias por su compra, ¡vuelva pronto!");
}

// Inicio del programa
debugger
saludar();

let opcion;

do {
    opcion = prompt("Elija una opción:\n 1: Comprar zapatillas\n 2: Comprar accesorios\n 3: Terminar");

    if (opcion !== "1" && opcion !== "2" && opcion !== "3") {
        alert("Por favor, ingrese una opción válida (1, 2, o 3).");
    }
} while (opcion !== "1" && opcion !== "2" && opcion !== "3");

while (opcion !== "3") {
    if (opcion === "1") {
        compraZapatillas();
        opcion = "3";  
    }
    if (opcion === "2") {
        comprarAccesorios();
        opcion = "3"; 
    }
}
