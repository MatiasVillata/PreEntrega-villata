function saludar (){
    let nombre = prompt("ingrese su nombre por favor");
    if (nombre != ""){
        alert("bienvenido" + " " + nombre + " " + "a continuacion podra elegir su producto");
    }
    else{
        alert("debe ingresar su nombre"), saludar();
    }
}

function compraZapatillas(){
    zapatillas = prompt("elija una opcion \n 1: zapatillas de basquet \n 2: zapatillas urbanas \n 3: finalizar compra") 
    
    if (zapatillas === "1" ){
        productoZapatillasBasquet();
       }
    
       else if (zapatillas === "2"){
        productoZapatillasUrbanas();
       }
       
       else if (accesorios === "3"){
        finalizarCompra();
       }
       
       else{
        alert("ingrese una opcion correcta"), compraZapatillas();
    }
}
    
function comprarAccesorios(){
    accesorios = prompt("elija una opcion \n 1: medias \n 2: mangas de compresion \n 3: finalizar compra") 
    
   if (accesorios === "1" ){
    productoMedias();
   }

   else if (accesorios === "2"){
    productoMangaCompresion();
   }

   else if (accesorios === "3"){
    finalizarCompra();
   }
   
   else{
    alert("ingrese una opcion correcta"), comprarAccesorios();
   }
}
    
    
   
function productoZapatillasBasquet(){
    alert("las zapatillas tienen un valor de $ " + ( zapatillaBasquet + iva))
}

function productoZapatillasUrbanas (){
    alert("las zapatillas urbanas tienen un valor de $ " + ( zapatillaUrbana + iva))
}

function productoMedias(){
    alert("las media tienen un valor de $ " + ( medias + iva))
}

function productoMangaCompresion(){
    alert("las mangas de compresion tienen un valor de $ " + (mangaCompresion + iva))
}

function finalizarCompra(){
    alert("gracias por su compra, vuelva pronto");
}

let producto;
let zapatillaBasquet = 250000
let zapatillaUrbana = 210000
let medias = 16000
let mangaCompresion = 23000
let iva = 1.15
let opcion;

saludar();

opcion = prompt("elija una opcion \n 1: comprar zapatillas \n 2:comprar accesorios \n 3:terminar")

while(opcion !=="3"){
    if(opcion ==="1"){
        compraZapatillas();
        opcion = "3"
    }
    if(opcion ==="2"){
        comprarAccesorios();
        opcion = "3";
    }
}
    
    






