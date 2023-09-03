
// 1. Definimos la clase Pelicula para crear las peliculas
class Pelicula {
    constructor(id, titulo, estreno, genero, horarios, precio, sala, cantidad, img, alt) {
        this.id = id;
        this.titulo = titulo;
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
    //recibe una pelicula por parametro y se a enviamos por parametro con .push(pelicula)
    agregar(pelicula) {
        this.listaPeliculas.push(pelicula)
    }

    // 3.mostramos listaPeliculas[p1,p2,p3...]
    mostrarEnDom() {
        let contenedor_pelicula = document.getElementById("products_container")
        this.listaPeliculas.forEach(pelicula => {
            contenedor_pelicula.innerHTML += `
            <div class="movie-card">
                <div class="card-content">
                    <img src="${pelicula.img}" alt="${pelicula.alt}">
                    <h2>${pelicula.titulo}</h2>
                    <p><strong>Estreno:</strong> ${pelicula.estreno}</p>
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p><strong>Horarios:</strong> ${pelicula.horarios}</p>
                    <button> Comprar </button>
                </div>
        </div> `
        })
    }
}

// 2.2 creamos una instancia CP (CONTROLLADOR PELICULAS )
const CP = new ControladorDePeliculas()

// 1.1 Creaamos las películas 
const p1 = new Pelicula(1, "Película 1", "15 de septiembre de 2023", "Acción", ["10:00 AM", " 2:00 PM"], 25800, "IMAX DINAMICS", 100, "./public/oppenhaimer.jpg", "Texto alternativo 1")
const p2 = new Pelicula(3, "Película 2", "15 de septiembre de 2023", "Acción", ["10:00 AM", " 2:00 PM"], 17500, "General", 100, "./public/sonido-de-libertad.jpg", "Texto alternativo 1")
const p3 = new Pelicula(2, "Película 3", "20 de septiembre de 2023", "Drama", ["11:00 AM", " 3:00 PM"], 17500, "General", 120, "./public/blue-beetle.jpg", "Texto alternativo 2")
const p4 = new Pelicula(4, "Película 4", "20 de septiembre de 2023", "Comedia", ["11:00 AM", " 3:00 PM"], 17500, "General", 120, "./public/gran-turismo.jpg", "Texto alternativo 2")
const p5 = new Pelicula(5, "Película 5", "15 de septiembre de 2023", "Acción", ["10:00 AM", " 2:00 PM"], 25800, "IMAX DINAMICS", 100, "./public/rey-montaña.jpg", "Texto alternativo 1")
const p6 = new Pelicula(6, "Película 6", "20 de septiembre de 2023", "Comedia", ["11:00 AM", " 3:00 PM"], 25800, "IMAX DINAMICS", 120, "./public/milagros.png", "Texto alternativo 2")
const p7 = new Pelicula(7, "Película 7", "15 de septiembre de 2023", "Acción", ["10:00 AM", " 2:00 PM"], 17500, "General", 100, "./public/venice.png", "Texto alternativo 1")
const p8 = new Pelicula(8, "Película 8", "20 de septiembre de 2023", "Ciencia Ficción", ["11:00 AM", " 3:00 PM"], 25800, "IMAX DINAMICS", 120, "./public/golda.png", "Texto alternativo 2")


// 2.3 ahora podemos agregar las peliculas a la listaPeliculas del controlador
CP.agregar(p1)
CP.agregar(p2)
CP.agregar(p3)
CP.agregar(p4)
CP.agregar(p5)
CP.agregar(p6)
CP.agregar(p7)
CP.agregar(p8)

//3.1 mostramos en DOM
CP.mostrarEnDom()


/* ------------------------------------------------------------------------------------------------- */




