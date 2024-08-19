function saludar() {
    let nombre;
    do {
        nombre = prompt("Ingrese su nombre, por favor:");
    } while (nombre === "");
    
    alert("Bienvenido " + nombre + ", a continuación podrá elegir su producto.");
}

function calcularPrecioConIVA(precioBase) {
    return precioBase * iva;
}

function calcularDescuento(precioBase, descuento) {
    return precioBase * (1 - descuento);
}

function compraZapatillas() {
    let zapatillas = prompt("Elija una opción: \n 1: Zapatillas de basquet \n 2: Zapatillas urbanas \n 3: Zapatillas de running \n 4: Zapatillas de fútbol \n 5: Finalizar compra");
    
    let precioTotal;
    
    switch (zapatillas) {
        case "1":
            precioTotal = zapatillaBasquet + calcularPrecioConIVA(zapatillaBasquet);
            alert("Las zapatillas de basquet tienen un valor total de $ " + precioTotal);
            break;
        case "2":
            precioTotal = zapatillaUrbana + calcularPrecioConIVA(zapatillaUrbana);
            alert("Las zapatillas urbanas tienen un valor total de $ " + precioTotal);
            break;
        case "3":
            precioTotal = zapatillaRunning + calcularPrecioConIVA(zapatillaRunning);
            alert("Las zapatillas de running tienen un valor total de $ " + precioTotal);
            break;
        case "4":
            precioTotal = zapatillaFutbol + calcularPrecioConIVA(zapatillaFutbol);
            alert("Las zapatillas de fútbol tienen un valor total de $ " + precioTotal);
            break;
        case "5":
            finalizarCompra();
            return;
        default:
            alert("Ingrese una opción correcta.");
            compraZapatillas();
            return;
    }
    
    realizarPago(precioTotal);
}

function comprarAccesorios() {
    let accesorios = prompt("Elija una opción: \n 1: Medias \n 2: Mangas de compresión \n 3: Muñequeras \n 4: Gorras \n 5: Finalizar compra");
    
    let precioTotal;
    
    switch (accesorios) {
        case "1":
            precioTotal = medias + calcularPrecioConIVA(medias);
            alert("Las medias tienen un valor total de $ " + precioTotal);
            break;
        case "2":
            precioTotal = mangaCompresion + calcularPrecioConIVA(mangaCompresion);
            alert("Las mangas de compresión tienen un valor total de $ " + precioTotal);
            break;
        case "3":
            precioTotal = muneca + calcularPrecioConIVA(muneca);
            alert("Las muñequeras tienen un valor total de $ " + precioTotal);
            break;
        case "4":
            precioTotal = gorra + calcularPrecioConIVA(gorra);
            alert("Las gorras tienen un valor total de $ " + precioTotal);
            break;
        case "5":
            finalizarCompra();
            return;
        default:
            alert("Ingrese una opción correcta.");
            comprarAccesorios();
            return;
    }
    
    realizarPago(precioTotal);
}

function realizarPago(precioTotal) {
    let metodoPago = prompt("Elija su método de pago: \n 1: Tarjeta de crédito/débito \n 2: Transferencia bancaria (10% de descuento)");
    
    if (metodoPago === "2") {
        precioTotal = calcularDescuento(precioTotal, 0.10);
        alert("Al pagar por transferencia bancaria, obtiene un 10% de descuento. El total a pagar es: $ " + precioTotal);
    } else {
        alert("El total a pagar es: $ " + precioTotal);
    }
    
    finalizarCompra();
}

function finalizarCompra() {
    alert("Gracias por su compra, ¡vuelva pronto!");
}

let zapatillaBasquet = 250000;
let zapatillaUrbana = 210000;
let zapatillaRunning = 200000;
let zapatillaFutbol = 220000;
let medias = 16000;
let mangaCompresion = 50000;
let muneca = 12000;
let gorra = 18000;
let iva = 1.15; // Tasa de IVA (ej. 1.15 para el 15%)

saludar();

let opcion = prompt("Elija una opción: \n 1: Comprar zapatillas \n 2: Comprar accesorios \n 3: Terminar");

while (opcion !== "3") {
    if (opcion === "1") {
        compraZapatillas();
        opcion = "3"; // Para finalizar después de una compra
    }
    if (opcion === "2") {
        comprarAccesorios();
        opcion = "3"; // Para finalizar después de una compra
    }
}

    






