// Clase Pelicula
class Pelicula {
    constructor({
        id, titulo, descripcion, estreno, genero, horarios, precio, sala, img, alt, cantidadModal = 1, 
    }) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estreno = estreno;
        this.genero = genero;
        this.precio = precio;
        this.sala = sala;
        this.horarios = horarios;
        this.cantidad = 1; // Inicia en 1
        this.cantidadModal = cantidadModal;
        this.img = img;
        this.alt = alt;
    }
}

// Clase ControladorDePeliculas
class ControladorDePeliculas {
    constructor() {
        this.listaPeliculas = [];
        this.contenedorPeliculas = document.getElementById("products_container");
    }
    // Método para agregar una película a la lista y mostrarla en el DOM
    agregar(pelicula) {
        this.listaPeliculas.push(pelicula);
        this.mostrarPeliculaEnDom(pelicula);
    }
    // Método para mostrar una película en el DOM
    mostrarPeliculaEnDom(pelicula) {
        const peliculaContainer = document.createElement("div");
        peliculaContainer.className = "movie-card";
        peliculaContainer.dataset.id = pelicula.id;

        // Generamos el contenido HTML para mostrar la película
        peliculaContainer.innerHTML = `
            <div class="card-content">
                <img src="${pelicula.img}" alt="${pelicula.alt}">
                <h2>${pelicula.titulo}</h2>
                <p><strong>Estreno:</strong> ${pelicula.estreno}</p>
                <p><strong>Género:</strong> ${pelicula.genero}</p>
                <p><strong>Horarios:</strong> ${pelicula.horarios.join(' - ')}</p>
            </div>
        `;

        peliculaContainer.addEventListener("click", () => {
            this.abrirModal(pelicula);
        });

        this.contenedorPeliculas.appendChild(peliculaContainer);
    }
    // Método para abrir el modal de una película
    abrirModal(pelicula) {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";

        let modalContent = modal.querySelector(".modal-contenido");

        // Crea una copia de la película seleccionada
        const peliculaSeleccionada = { ...pelicula };

        // Crea el contenido del modal con los detalles de la película
        modalContent.innerHTML = `
    <div class="movie-card2">
        <div>
            <img src="${peliculaSeleccionada.img}" alt="${peliculaSeleccionada.alt}">
        </div>

        <div class="card-content">
            <h2>${peliculaSeleccionada.titulo}</h2>
            <p class="descripcion"><strong>Descripción:</strong> ${peliculaSeleccionada.descripcion}</p>
            <p><strong>Género:</strong> ${peliculaSeleccionada.genero}</p>
            <p><strong>Sala:</strong> ${peliculaSeleccionada.sala}</p>
            <div class="cantidad-container">
                <p><strong>Cantidad:</strong></p>
                <div class="cantidad-btn">
                    <button class="btn-cantidad" id="restar-cantidad">-</button>
                    <span class="cantidad" id="cantidad-modal">${peliculaSeleccionada.cantidad}</span>
                    <button class="btn-cantidad" id="sumar-cantidad">+</button>
                </div>
            </div>
            <p><strong>Horarios:</strong>
                <select id="horario-${peliculaSeleccionada.id}">
                    ${peliculaSeleccionada.horarios.map(horario => `<option value="${horario}">${horario}</option>`).join('')}
                </select>
            </p>
            <!-- Agrega un elemento para mostrar el precio total -->
            <p class="descripcion-precio"><strong>Precio Total:</strong> $<span id="precio-total">${peliculaSeleccionada.precio * peliculaSeleccionada.cantidad}</span></p>
            <button class="btn-comprar" id="agregar-pelicula-${peliculaSeleccionada.id}"> Añadir a Tickets </button>
        </div>
    </div>`;

        // Obtén los elementos del modal
        const horarioSelect = modalContent.querySelector(`#horario-${peliculaSeleccionada.id}`);
        const comprarButton = modalContent.querySelector(`#agregar-pelicula-${peliculaSeleccionada.id}`);
        const cantidadElement = modalContent.querySelector("#cantidad-modal");
        const restarCantidadButton = modalContent.querySelector("#restar-cantidad");
        const sumarCantidadButton = modalContent.querySelector("#sumar-cantidad");
        const precioTotalElement = modalContent.querySelector("#precio-total");

        // Variable para la cantidad en el modal
        let cantidadModal = peliculaSeleccionada.cantidad;

        // Función para actualizar el precio total
        const actualizarPrecioTotal = () => {
            const precioUnitario = peliculaSeleccionada.precio;
            const precioTotal = precioUnitario * cantidadModal;
            precioTotalElement.textContent = precioTotal;
        }

        // Listener para el botón "Restar Cantidad"
        restarCantidadButton.addEventListener("click", () => {
            if (cantidadModal > 1) {
                cantidadModal--;
                cantidadElement.textContent = cantidadModal;
                actualizarPrecioTotal();
            }
        });

        // Listener para el botón "Sumar Cantidad"
        sumarCantidadButton.addEventListener("click", () => {
            cantidadModal++;
            cantidadElement.textContent = cantidadModal;
            actualizarPrecioTotal();
        });

        // Listener para el botón "Añadir a Tickets"
        comprarButton.addEventListener("click", () => {
            const horarioSeleccionado = horarioSelect.value;
            // Llama al método agregar del carrito con la película copiada, horario y cantidad seleccionada
            carrito.agregar({ ...peliculaSeleccionada }, horarioSeleccionado, cantidadModal);
            carrito.mostrarEnDom();
            modal.style.display = "none";
        });

        // Inicializa el precio total
        actualizarPrecioTotal();
    }

    // Método para mostrar todas las películas en el DOM
    mostrarEnDom() {
        this.listaPeliculas.forEach(pelicula => {
            this.mostrarPeliculaEnDom(pelicula);
        });
    }
}
// Clase Carrito
class Carrito {
    constructor() {
        this.peliculaSeleccionada = null;
        this.cantidadTotal = 0;
    }
    // Método para mostrar un mensaje Toastify
    mostrarToastify() {
        Toastify({
            text: "Añadido a Tickets",
            duration: 2000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`        
            style: {
                background: "#0065A8",
            }
        }).showToast();
    }
    // Método para agregar películas al carrito
    agregar(pelicula, horarioSeleccionado, cantidadSeleccionada) {
        this.peliculaSeleccionada = {
            pelicula,
            horario: horarioSeleccionado,
            cantidad: cantidadSeleccionada,
        };
        this.guardarEnStorage();
        this.mostrarEnDom();
        this.mostrarToastify();
    }
    // Método para guardar el estado del carrito en el almacenamiento local
    guardarEnStorage() {
        let peliculaSeleccionadaJSON = JSON.stringify(this.peliculaSeleccionada);
        localStorage.setItem("peliculaCarrito", peliculaSeleccionadaJSON);
    }
    // Método para recuperar el estado del carrito desde el almacenamiento local
    recuperarStorage() {
        let peliculaSeleccionadaJSON = localStorage.getItem("peliculaCarrito");

        if (peliculaSeleccionadaJSON) {
            let peliculaEnCarrito = JSON.parse(peliculaSeleccionadaJSON);
            this.peliculaSeleccionada = peliculaEnCarrito;
            this.mostrarEnDom();
        }
    }
    // Método para mostrar el contenido del carrito en el DOM
    mostrarEnDom() {
        let modal = document.getElementById("myModal");
        let modalContent = modal.querySelector(".modal-contenido");
        let cartContainer = document.getElementById("cart_container"); // Elemento donde muestras el contenido del carrito
        let cantidadTotalTickets = document.getElementById("cantidad-total-tickets"); // Elemento para mostrar la cantidad total en "Tickets"

        modalContent.innerHTML = "";

        if (this.peliculaSeleccionada) {
            const { pelicula, horario, cantidad } = this.peliculaSeleccionada;
            modalContent.innerHTML += `
            <div class="movie-card2">
                <div>
                    <img src="${pelicula.img}" alt="${pelicula.alt}">
                </div>
            
                <div class="card-content">
                    <h2>${pelicula.titulo}</h2>
                    <p class="descripcion"><strong>Descripción:</strong> ${pelicula.descripcion}</p>
                    <p><strong>Horario:</strong> ${horario}</p>
                    <p><strong>Cantidad:</strong> ${cantidad}</p>
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p><strong>Sala:</strong> ${pelicula.sala}</p>
                    <p class="descripcion-precio"><strong>Precio:</strong> $${pelicula.precio}</p>
                    <button class="btn-comprar" id="agregar-pelicula-${pelicula.id}"> Pagar </button>
                </div>
            </div>`;

            this.cantidadTotal = cantidad;
            cantidadTotalTickets.textContent = this.cantidadTotal;
        } else {
            modalContent.innerHTML = `
            <div class="conteiner-img">
                <img class="img-cart" src="./public/Logo-cinecolombia.webp" alt="Logo-cinecolombia">                           
            </div>
            <p class="cerrar">Selecciona una película para iniciar</p>
            `;

            cantidadTotalTickets.textContent = 0;
        }
    }
}
//Creación de una lista de películas y objetos ControladorDePeliculas y Carrito
const listaDePeliculas = [
    new Pelicula({
        id: 1,
        titulo: "Oppenheimer",
        descripcion: "Escrita y dirigida por Christopher Nolan, Oppenheimer es un thriller épico que sumerge al público en la trepidante paradoja del enigmático hombre que debe arriesgarse a destruir el mundo para poder salvarlo.",
        estreno: "1 de septiembre de 2023",
        genero: "Thriller, Acción",
        horarios: ["7:00 PM", " 9:00 PM"],
        precio: 25800,
        sala: "IMAX DINAMICS",
        img: "./public/oppenhaimer.jpg",
        alt: "Texto alternativo 1"
    }),
    new Pelicula({
        id: 2,
        titulo: "Blue Beetle",
        descripcion: "Jaime Reyes se encuentra en posesión de una antigua reliquia de biotecnología alienígena llamada Escarabajo. Cuando el Escarabajo elige a Jaime como huésped simbiótico, le otorga una armadura con poderes extraordinarios e impredecibles.",
        estreno: "8 de septiembre de 2023",
        genero: "Fantasía, Ciencia Ficción",
        horarios: ["11:00 AM", " 3:00 PM"],
        precio: 17500,
        sala: "General",
        img: "./public/blue-beetle.jpg",
        alt: "Texto alternativo 2"
    }),
    new Pelicula({
        id: 3,
        titulo: "Sonido de Libertad",
        descripcion: "Basada en una increíble historia real, trae luz y esperanza al oscuro mundo del tráfico de menores. un agente federal descubre que la hermana del niño todavía está cautiva y decide embarcarse en una peligrosa misión para salvarla. Se adentra en lo profundo de la selva colombiana, poniendo su vida en riesgo para liberarla y traerla de vuelta a casa.",
        estreno: "5 de septiembre de 2023",
        genero: "Drama, Acción",
        horarios: ["8:00 PM", " 10:00 PM"],
        precio: 17500,
        sala: "General",
        img: "./public/sonido-de-libertad.jpg",
        alt: "Texto alternativo 1"
    }),
    new Pelicula({
        id: 4,
        titulo: "Gran Turismo",
        descripcion: "Basada en la historia real de Jann Mardenborough, la película es la historia definitiva de deseos cumplidos de un jugador adolescente de “Gran Turismo”, cuyas habilidades de gaming le llevaron a ganar una serie de competencias de Nissan, hasta convertirse en un verdadero conductor de carros de carreras profesional.",
        estreno: "5 de septiembre de 2023",
        genero: "Acción, Historia",
        horarios: ["5:00 PM", " 7:00 PM"],
        precio: 17500,
        sala: "General",
        img: "./public/gran-turismo.jpg",
        alt: "Texto alternativo 2"
    }),
    new Pelicula({
        id: 5,
        titulo: "El Rey de la Montaña",
        descripcion: "Pedro era apenas un niño cuando presencia el terrible accidente de su padre que le puso fin a su carrera ciclística. Decidido a darle un futuro a su familia, Pedro continúa con el sueño de convertirse en el Rey de la Montaña, Ahora solo le queda enfrentarse a sí mismo, y sanar su corazón para lograr la victoria.",
        estreno: "10 de septiembre de 2023",
        genero: "Historia",
        horarios: ["3:00 PM", " 6:00 PM"],
        precio: 25800,
        sala: "IMAX DINAMICS",
        img: "./public/rey-montaña.jpg",
        alt: "Texto alternativo 1"
    }),
    new Pelicula({
        id: 6,
        titulo: "Milagros",
        descripcion: "Dicen que el perro es el mejor amigo del hombre, un Border Terrier ingenuo y optimista es abandonado en las calles de la ciudad por su humilde dueño, Reggie estaba seguro de que su amado dueño nunca lo dejaría a propósito. Reggie se da cuenta que estaba en una relación tóxica y empieza a ver a Doug como el canalla despiadado que es.",
        estreno: "10 de septiembre de 2023",
        genero: "Comedia, aventura",
        horarios: ["11:00 AM", " 3:00 PM"],
        precio: 25800,
        sala: "IMAX DINAMICS",
        img: "./public/milagros.png",
        alt: "Texto alternativo 2"
    }),
    new Pelicula({
        id: 7,
        titulo: "Cacería en Venecia",
        descripcion: "En la Venecia posterior a la Segunda Guerra Mundial, Poirot, ahora retirado y viviendo en su propio exilio, asiste a regañadientes a una sesión de espiritismo. Cuando uno de los invitados es asesinado, depende del ex detective descubrir una vez más al asesino.",
        estreno: "8 de septiembre de 2023",
        genero: "Acción",
        horarios: ["2:00 PM", " 5:00 PM"],
        precio: 17500,
        sala: "General",
        img: "./public/venice.png",
        alt: "Texto alternativo 1"
    }),
    new Pelicula({
        id: 8,
        titulo: "Golda",
        descripcion: "Un retrato íntimo de una mujer extraordinaria, una mirada cautivadora a la historia de Israel, una poderosa narrativa con conmovedoras actuaciones. GOLDA captura la esencia de una líder inquebrantable y nos invita a reflexionar sobre el poder del compromiso y la determinación en la búsqueda de los ideales.",
        estreno: "5 de septiembre de 2023",
        genero: "Drama",
        horarios: ["5:00 PM", " 7:30 PM"],
        precio: 25800,
        sala: "IMAX DINAMICS",
        img: "./public/golda.png",
        alt: "Texto alternativo 2"
    })
];

const CP = new ControladorDePeliculas();
const carrito = new Carrito();

// Agregamos cada película a ControladorDePeliculas y mostramos en el DOM
listaDePeliculas.forEach(pelicula => {
    CP.agregar(pelicula);
});
// Mostramos todas las películas en el DOM
CP.mostrarEnDom();

// Recuperamos la información del carrito del almacenamiento local y mostramos en el modal
carrito.recuperarStorage();
carrito.mostrarEnDom();
