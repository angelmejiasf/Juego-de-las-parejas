let imagenes_animales = ["cabra.jpg", "cerdo.jpg", "conejo.png", "conejo2.jpg", "cordero.png", "elefante.jpg", "erizo.jpg", "gato.png", "jirafa.png", "leon.png", "mono.jpg", "oso.jpg", "osoblanco.png", "osopanda.png", "pato.png", "perro.png", "pollo.png", "pradera.jpg", "tigre.jpg", "vaca.png", "tucan.jpg", "loro.jpg", "cigueña.jpg", "foca.jpg", "koala.jpg", "cebra.jpg", "canguro.jpg", "pinguino.jpg", "zorro.jpg", "potro.jpg", "tortuga.jpg", "lobo.jpg"];

let imagenes_cartas = ["assets/images/cartas/atras1.jpg", "assets/images/cartas/atras2.jpg", "assets/images/cartas/atras3.jpg", "assets/images/cartas/atras4.jpg", "assets/images/cartas/atras5.jpg", "assets/images/cartas/atras6.jpg", "assets/images/cartas/atras7.jpg", "assets/images/cartas/atras8.jpg"];

let header_title = document.getElementById("header_title");
let configurador = document.getElementById("configurador");
let juego = document.getElementById("juego");
let tiempo = document.getElementById("tiempo");
let ayuda = document.getElementById("ayuda");
let botones = document.getElementById("botones");
let finjuego = document.getElementById("finjuego");

let configuracion_tama = document.getElementById("configuracion_tama");
let configuracion_cartas = document.getElementById("configuracion_cartas");
let configuracion_juego = document.getElementById("configuracion_juego");
let configuracion_ayuda = document.getElementById("configuracion_ayuda");

let config_card_body = document.getElementById("config_card_body");
let visor_imagenes_juego = document.getElementById("visor_imagenes_juego");
let visor_marcador = document.getElementById("visor_marcador");
let visor_tiempo = document.getElementById("visor_tiempo");
let visor_ayuda = document.getElementById("visor_ayuda");

let btn_comprobar = document.getElementById("btn_comprobar");
let btn_validar = document.getElementById("btn_validar");
let btn_nueva_partida = document.getElementById("btn_nueva_partida");
let juego__title = document.getElementsByClassName("juego__title")


let imagenes = document.getElementsByTagName("img");

//Hacer desaparecer los elementos que no interesan al abrir la pagina
function validador() {
    juego.style.display = "none";
    finjuego.style.display = "none";
    btn_comprobar.style.display = "none";
    btn_nueva_partida.style.display = "none";

    for (let i = 0; i < imagenes_cartas.length; i++) {
        const img = document.createElement("img");
        img.src = imagenes_cartas[i];
        config_card_body.appendChild(img);
        img.style.width = "100px";
        img.style.height = "140px";
        img.style.margin = "5px";
        img.style.display = "inline-block";
    }
}

document.addEventListener("DOMContentLoaded", validador)

//Seleccionar Carta
function seleccionar(event) {
    if (event.target.nodeName === "IMG") {
        //Elminar si hay alguna seleccionada
        let img = config_card_body.getElementsByTagName("img")
        for (i = 0; i < img.length; i++) {
            img[i].classList.remove("carta-seleccionada")
        }

        // Agregar clase a la seleccionada
        event.target.classList.add("carta-seleccionada");

    }
}
config_card_body.addEventListener("click", seleccionar)

//Validar configuracion
function validarconf() {
    //Validar el numero de cartas
    var radiobuttonsTama = configuracion_tama.querySelectorAll('input[type="radio"]');
    var tamaSeleccionado = false;

    for (var i = 0; i < radiobuttonsTama.length; i++) {
        if (radiobuttonsTama[i].checked) {
            tamaSeleccionado = true;
            configuracion_tama.classList.remove("borde-rojo");
            break;
        } else {
            tamaSeleccionado = false;
            configuracion_tama.classList.add("borde-rojo");
        }
    }


    //Validar si hay una imagen seleccionada
    var imagenesSeleccionadas = configuracion_cartas.querySelectorAll('img.carta-seleccionada');
    var cartasSeleccionado = false;
    if (imagenesSeleccionadas.length > 0) {
        cartasSeleccionado = true;
        configuracion_cartas.classList.remove("borde-rojo");
    } else {
        cartasSeleccionado = false;
        configuracion_cartas.classList.add("borde-rojo");
    }

    // Validar si hay tiempo seleccionado
    var radiobuttonstiempo = tiempo.querySelectorAll("input[type='radio']");
    var tiemposeleccionado = false;
    for (var i = 0; i < radiobuttonstiempo.length; i++) {
        if (radiobuttonstiempo[i].checked) {
            tiemposeleccionado = true;
            tiempo.classList.remove("borde-rojo");
            break;
        } else {
            tiemposeleccionado = false;
            tiempo.classList.add("borde-rojo");
        }
    }

    var radiobuttonsayuda = ayuda.querySelectorAll("input[type='radio']");
    var ayudaSeleccionado
    for (var i = 0; i < radiobuttonsayuda.length; i++) {
        if (radiobuttonsayuda[i].checked) {
            ayudaSeleccionado = true;
            ayuda.classList.remove("borde-rojo");
            break;
        } else {
            ayudaSeleccionado = false;
            ayuda.classList.add("borde-rojo");
        }
    }


    //Comprobar si hay algo seleccionado en cada seccion y empezar el juego
    if (tamaSeleccionado == true && cartasSeleccionado == true && tiemposeleccionado == true && ayudaSeleccionado == true) {
        configurador.style.display = "none";
        btn_validar.style.display = "none";

        juego.style.display = "block";
        btn_comprobar.style.display = "block";
        generarjuego();
    }


}

btn_validar.addEventListener("click", validarconf)


function generarjuego() {
    //Sacar el valor seleccionado del numero de cartas
    let radiobuttons = document.querySelectorAll('input[type="radio"][name="tama"]')

    let valorseleccionado = "";

    for (i = 0; i < radiobuttons.length; i++) {
        if (radiobuttons[i].checked) {
            valorseleccionado = radiobuttons[i].value;

        }


    }

    //Sacar la carta seleccionada en el menu
    let imagenseleccionada = document.querySelector("img.carta-seleccionada");
    let srcimagenseleccionada = imagenseleccionada.src;

    for (i = 0; i < valorseleccionado; i++) {
        let nuevaImagen = document.createElement("img");
        nuevaImagen.src = srcimagenseleccionada;
        visor_imagenes_juego.appendChild(nuevaImagen)
        nuevaImagen.style.width = "100px";
        nuevaImagen.style.height = "140px";
        nuevaImagen.style.margin = "5px";
        nuevaImagen.style.display = "inline-block";
        nuevaImagen.classList.add("carta_elegida")
    }





}

//Generar imagenes random
function juegocartas(event) {
    let random = Math.floor(Math.random() * imagenes_animales.length);
    let animales = imagenes_animales[random];

    if (event.target.nodeName == "IMG") {
        event.target.src = "assets/images/animales/" + animales

    }
}

visor_imagenes_juego.addEventListener("click", juegocartas)


//Comprobar repetidas
function repetidas(event) {
    const imagenes = document.querySelectorAll('.carta_elegida');
    const srcArray = [];

    let hayrepetidas = false;

    imagenes.forEach(imagen => {
        const src = imagen.src;

        if (srcArray.includes(src)) {
            hayrepetidas = true;
        } else {
            srcArray.push(src);

        }
    });

    if (hayrepetidas) {
        const nivelsin = visor_ayuda.querySelector('input[type="radio"][value="sin"]')
        const nivelmedio = visor_ayuda.querySelector('input[type="radio"][value="medio"]')
        const nivelalto = visor_ayuda.querySelector('input[type="radio"][value="alto"]')
        if (nivelmedio.checked) {
            btn_comprobar.style.backgroundColor = "red"

            setInterval(function () {
                btn_comprobar.style.backgroundColor = "transparent"
            }, 2000)
        }

        else if (nivelsin.checked) {
            btn_comprobar.style.backgroundColor = "transparent"
        }

        else if (nivelalto.checked) {
           
        }



    } else {
        finjuego.style.display = "block";
        juego.style.display = "none";
        btn_comprobar.style.display = "none"
        btn_nueva_partida.style.display = "block"
    }
}

btn_comprobar.addEventListener("click", repetidas)

//Recargar partida
function recargar() {
    location.reload()

}

btn_nueva_partida.addEventListener("click", recargar)