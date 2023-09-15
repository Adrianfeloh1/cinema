// Clase Pelicula
class Pelicula {
    constructor({
        id, titulo, descripcion, estreno, genero, horarios, precio, sala, img, alt
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

    agregar(pelicula) {
        this.listaPeliculas.push(pelicula);
        this.mostrarPeliculaEnDom(pelicula);
    }

    mostrarPeliculaEnDom(pelicula) {
        const peliculaContainer = document.createElement("div");
        peliculaContainer.className = "movie-card";
        peliculaContainer.dataset.id = pelicula.id;

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

    abrirModal(pelicula) {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";
    
        let modalContent = modal.querySelector(".modal-contenido");
    
        modalContent.innerHTML = `
            <div class="movie-card2">
                <div>
                    <img src="${pelicula.img}" alt="${pelicula.alt}">
                </div>
            
                <div class="card-content">
                    <h2>${pelicula.titulo}</h2>
                    <p class="descripcion"><strong>Descripción:</strong> ${pelicula.descripcion}</p>                    
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p><strong>Sala:</strong> ${pelicula.sala}</p>
                    <div class="cantidad-container">
                        <p><strong>Cantidad:</strong></p>
                        <div class="cantidad-btn">
                            <button class="btn-cantidad" id="restar-cantidad">-</button>
                            <span class="cantidad" id="cantidad-modal">${pelicula.cantidad}</span>
                            <button class="btn-cantidad" id="sumar-cantidad">+</button>
                        </div>
                    </div>
                    <p><strong>Horarios:</strong>
                        <select id="horario-${pelicula.id}">
                            ${pelicula.horarios.map(horario => `<option value="${horario}">${horario}</option>`).join('')}
                        </select>
                    </p>    
                    <p class="descripcion-precio"><strong>Precio:</strong> $<span id="precio-total">${pelicula.precio}</span></p>    
                    <button class="btn-comprar" id="agregar-pelicula-${pelicula.id}"> Añadir a Tickets </button>
                </div>
            </div>`;
    
        const horarioSelect = modalContent.querySelector(`#horario-${pelicula.id}`);
        const comprarButton = modalContent.querySelector(`#agregar-pelicula-${pelicula.id}`);
        const cantidadElement = modalContent.querySelector("#cantidad-modal");
        const restarCantidadButton = modalContent.querySelector("#restar-cantidad");
        const sumarCantidadButton = modalContent.querySelector("#sumar-cantidad");
        const precioTotalElement = modalContent.querySelector("#precio-total");
        
        let cantidadModal = pelicula.cantidad; // Variable para la cantidad en el modal
    
        const actualizarPrecioTotal = () => {
            const precioUnitario = pelicula.precio;
            const precioTotal = precioUnitario * cantidadModal;
            precioTotalElement.textContent = precioTotal;
        }
    
        restarCantidadButton.addEventListener("click", () => {
            if (cantidadModal > 1) {
                cantidadModal--;
                cantidadElement.textContent = cantidadModal;
                actualizarPrecioTotal();
            }
        });
    
        sumarCantidadButton.addEventListener("click", () => {
            cantidadModal++;
            cantidadElement.textContent = cantidadModal;
            actualizarPrecioTotal();
        });
    
        comprarButton.addEventListener("click", () => {
            const horarioSeleccionado = horarioSelect.value;
            carrito.agregar(pelicula, horarioSeleccionado, cantidadModal);
            carrito.mostrarEnDom();
            modal.style.display = "none";
        });
    
        actualizarPrecioTotal();
    }
    

    mostrarEnDom() {
        this.listaPeliculas.forEach(pelicula => {
            this.mostrarPeliculaEnDom(pelicula);
        });
    }
}

class Carrito {
    constructor() {
        this.peliculaSeleccionada = null;
        this.cantidadTotal = 0;
    }

    mostrarToastify() {
        Toastify({
            text: "Añadido a Tickets",
            duration: 3000,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`        
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    }

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

    guardarEnStorage() {
        let peliculaSeleccionadaJSON = JSON.stringify(this.peliculaSeleccionada);
        localStorage.setItem("peliculaCarrito", peliculaSeleccionadaJSON);
    }

    recuperarStorage() {
        let peliculaSeleccionadaJSON = localStorage.getItem("peliculaCarrito");

        if (peliculaSeleccionadaJSON) {
            let peliculaEnCarrito = JSON.parse(peliculaSeleccionadaJSON);
            this.peliculaSeleccionada = peliculaEnCarrito;
            this.mostrarEnDom();
        }
    }

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

listaDePeliculas.forEach(pelicula => {
    CP.agregar(pelicula);
});

CP.mostrarEnDom();

carrito.recuperarStorage();
carrito.mostrarEnDom();
