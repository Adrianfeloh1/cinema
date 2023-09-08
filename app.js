
// 1. Definimos la clase Pelicula para crear las peliculas
class Pelicula {
    constructor(id, titulo, descripcion, estreno, genero, horarios, precio, sala, cantidad, img, alt) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estreno = estreno;
        this.genero = genero;
        this.precio = precio;
        this.sala = sala;
        this.horarios = horarios;
        this.cantidad = cantidad;
        this.img = img;
        this.alt = alt;
    }
}

// 2. Definimos la clase ControladorDePeliculas para gestionar todos los productos
//Con un arreglo de productos el cual inicia vacio
class ControladorDePeliculas {
    constructor() {
        this.listaPeliculas = []
    }

    // 2.1 creamos el metodo para agregar las peliculas a la listaPeliculas
    // recibe una pelicula por parametro y se a enviamos por parametro con .push(pelicula)
    agregar(pelicula) {
        this.listaPeliculas.push(pelicula)
    }

    abrirModal(pelicula) {
        // Abre el carrito
        carrito.agregar(pelicula);
        carrito.mostrarEnDom();

        // Abre el modal
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
    }    

    // 3.mostramos listaPeliculas[p1,p2,p3...]
    mostrarEnDom() {
        let contenedor_pelicula = document.getElementById("products_container")

        this.listaPeliculas.forEach(pelicula => {
            // Ponemos el evento click al contenedor de la película
            contenedor_pelicula.innerHTML += `
            <div class="movie-card" id="pelicula-${pelicula.id}">
                <div class="card-content">
                    <img src="${pelicula.img}" alt="${pelicula.alt}">
                    <h2>${pelicula.titulo}</h2>
                    <p><strong>Estreno:</strong> ${pelicula.estreno}</p>
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p><strong>Horarios:</strong> ${pelicula.horarios}</p>                    
                </div>
            </div> `
        })

        this.listaPeliculas.forEach(pelicula => {
            const peliculaContainer = document.getElementById(`pelicula-${pelicula.id}`)

            // Agregamos el evento click al contenedor de la película
            peliculaContainer.addEventListener("click", () => {
                // Llamamos al método abrirModal para abrir el carrito y el modal al mismo tiempo
                const controlador = new ControladorDePeliculas();
                controlador.abrirModal(pelicula);
                
            })
        })
    }
}


// 4. creamos la clase Carrito
class Carrito {
    constructor() {
        this.peliculaSeleccionada = []; // Se almacenar la película seleccionada
        this.contenedorCarrito = document.getElementById("cart_container");
    }

    agregar(pelicula) {
        this.peliculaSeleccionada = pelicula; // Al seleccionar una película, actualiza la propiedad
        this.mostrarEnDom();
    }

    mostrarEnDom() {
        // Limpia el carrito para que solo se muestre la película seleccionada
        this.contenedorCarrito.innerHTML = "";

        if (this.peliculaSeleccionada) {
            const pelicula = this.peliculaSeleccionada;
            this.contenedorCarrito.innerHTML += `
            <div class="movie-card2">
                <div>
                    <img src="${pelicula.img}" alt="${pelicula.alt}">
                </div>
            
                <div class="card-content">
                    <h2>${pelicula.titulo}</h2>
                    <p class="descripcion"><strong>Descripción:</strong> ${pelicula.descripcion}</p>
                    <p><strong>Horarios:</strong> ${pelicula.horarios}</p>
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p><strong>Sala:</strong> ${pelicula.sala}</p>
                    <p class="descripcion-precio"><strong>Precio:</strong> $${pelicula.precio}</p>
                    <button class="btn-comprar" id="agregar-pelicula-${pelicula.id}"> Comprar </button>
                </div>
            </div>`;
        }
    }
}

// 2.2 creamos una instancia CP (CONTROLLADOR PELICULAS )
const CP = new ControladorDePeliculas()
// 4.1 creamos las instancia para el carrito
const carrito = new Carrito()

// 1.1 Creaamos las películas 4.1 lo pasamos a una lista

const listaDePeliculas = [
    new Pelicula(1, "Oppenheimer", "Escrita y dirigida por Christopher Nolan, Oppenheimer es un thriller épico que sumerge al público en la trepidante paradoja del enigmático hombre que debe arriesgarse a destruir el mundo para poder salvarlo.", "1 de septiembre de 2023", " Thriller, Acción", ["7:00 PM", " 9:00 PM"], 25800, "IMAX DINAMICS", 100, "./public/oppenhaimer.jpg", "Texto alternativo 1"),
    new Pelicula(3, "Sonido de Libertad", "Sonido De Libertad, basada en una increíble historia real, trae luz y esperanza al oscuro mundo del tráfico de menores. un agente federal descubre que la hermana del niño todavía está cautiva y decide embarcarse en una peligrosa misión para salvarla. Con el tiempo en su contra, renuncia a su trabajo y se adentra en lo profundo de la selva colombiana, poniendo su vida en riesgo para liberarla y traerla de vuelta a casa.", "5 de septiembre de 2023", "Drama, Acción", ["8:00 PM", " 10:00 PM"], 17500, "General", 100, "./public/sonido-de-libertad.jpg", "Texto alternativo 1"),
    new Pelicula(2, "Blue Beetle", "Jaime Reyes se encuentra en posesión de una antigua reliquia de biotecnología alienígena llamada Escarabajo. Cuando el Escarabajo elige a Jaime como huésped simbiótico, le otorga una armadura con poderes extraordinarios e impredecibles.", "8 de septiembre de 2023", "Fantasía, Ciencia Ficción", ["11:00 AM", " 3:00 PM"], 17500, "General", 120, "./public/blue-beetle.jpg", "Texto alternativo 2"),
    new Pelicula(4, "Gran Turismo", "Basada en la historia real de Jann Mardenborough, la película es la historia definitiva de deseos cumplidos de un jugador adolescente de “Gran Turismo”, cuyas habilidades de gaming le llevaron a ganar una serie de competencias de Nissan, hasta convertirse en un verdadero conductor de carros de carreras profesional.", "5 de septiembre de 2023", "Acción, Historia", ["5:00 PM", " 7:00 PM"], 17500, "General", 120, "./public/gran-turismo.jpg", "Texto alternativo 2"),
    new Pelicula(5, "El Rey de la Montaña", "Pedro era apenas un niño cuando presencia el terrible accidente de su padre que le puso fin a su carrera ciclística. Decidido a darle un futuro a su familia, Pedro continúa con el sueño de convertirse en el Rey de la Montaña, Ahora solo le queda enfrentarse a sí mismo, y sanar su corazón para lograr la victoria.", "10 de septiembre de 2023", "Historia", ["3:00 PM", " 6:00 PM"], 25800, "IMAX DINAMICS", 100, "./public/rey-montaña.jpg", "Texto alternativo 1"),
    new Pelicula(6, "Milagros", "Dicen que el perro es el mejor amigo del hombre, un Border Terrier ingenuo y optimista es abandonado en las calles de la ciudad por su humilde dueño, Reggie estaba seguro de que su amado dueño nunca lo dejaría a propósito. Reggie se da cuenta que estaba en una relación tóxica y empieza a ver a Doug como el canalla despiadado que es.", "10 de septiembre de 2023", "Comedia, aventura", ["11:00 AM", " 3:00 PM"], 25800, "IMAX DINAMICS", 120, "./public/milagros.png", "Texto alternativo 2"),
    new Pelicula(7, "Cacería en Venecia", "En la Venecia posterior a la Segunda Guerra Mundial, Poirot, ahora retirado y viviendo en su propio exilio, asiste a regañadientes a una sesión de espiritismo. Cuando uno de los invitados es asesinado, depende del ex detective descubrir una vez más al asesino.", "8 de septiembre de 2023", "Acción", ["2:00 PM", " 5:00 PM"], 17500, "General", 100, "./public/venice.png", "Texto alternativo 1"),
    new Pelicula(8, "Golda", "Un retrato íntimo de una mujer extraordinaria, una mirada cautivadora a la historia de Israel, una poderosa narrativa  con conmovedoras actuaciones. GOLDA captura la esencia de una líder inquebrantable y nos invita a reflexionar sobre el poder del compromiso y la determinación en la búsqueda de los ideales.", "5 de septiembre de 2023", "Drama", ["5:00 PM", " 7:30 PM"], 25800, "IMAX DINAMICS", 120, "./public/golda.png", "Texto alternativo 2")
];

// 4.2 recorremos las películas y la agregamos a la instancia de CP.agregar
listaDePeliculas.forEach((pelicula) => {
    CP.agregar(pelicula);
})

//4.3 lo agregamos al localStorage como string
let listaDePeliculasJSON = JSON.stringify(listaDePeliculas)
localStorage.setItem("listaCompra", listaDePeliculasJSON)

//4.4 para traer los datos, lo hacemos con getItem y lo PARSEAMOS

let listaDePeliculasObjetoJSON = localStorage.getItem("listaCompra")
let listaPeliculas = JSON.parse(listaDePeliculasJSON)
console.log(listaPeliculas)

// 4.5 para traer el objeto con sus metodos
let nuevaListaPeliculas = []
listaPeliculas.forEach((pelicula) => {

    let nuevaPelicula = new Pelicula(
        pelicula.id,
        pelicula.titulo,
        pelicula.estreno,
        pelicula.genero,
        pelicula.horarios,
        pelicula.precio,
        pelicula.sala,
        pelicula.cantidad,
        pelicula.img,
        pelicula.alt
    )
    nuevaListaPeliculas.push(nuevaPelicula)
})

console.log(nuevaListaPeliculas)

CP.mostrarEnDom();





/* ------------------------------------------------------------------------------------------------- */




