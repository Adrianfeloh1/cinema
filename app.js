// Clase Pelicula
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
        this.cantidad = 1; // Inicia en 1
        this.img = img;
        this.alt = alt;
    }
}

// Clase ControladorDePeliculas
class ControladorDePeliculas {
    constructor() {
        this.listaPeliculas = [];
    }

    agregar(pelicula) {
        this.listaPeliculas.push(pelicula);
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
                            <span class="cantidad" id="cantidad">${pelicula.cantidad}</span>
                            <button class="btn-cantidad" id="sumar-cantidad">+</button>
                        </div>
                    </div>
                    <p><strong>Horarios:</strong>
                        <select id="horario-${pelicula.id}">
                            ${pelicula.horarios.map(horario => `<option value="${horario}">${horario}</option>`).join('')}
                        </select>
                    </p>
                    
                    <p class="descripcion-precio"><strong>Precio:</strong> $${pelicula.precio}</p>
                    
                    
                    <button class="btn-comprar" id="agregar-pelicula-${pelicula.id}"> Comprar </button>
                </div>
            </div>`;

        const horarioSelect = modalContent.querySelector(`#horario-${pelicula.id}`);
        const comprarButton = modalContent.querySelector(`#agregar-pelicula-${pelicula.id}`);
        const cantidadElement = modalContent.querySelector("#cantidad");
        const restarCantidadButton = modalContent.querySelector("#restar-cantidad");
        const sumarCantidadButton = modalContent.querySelector("#sumar-cantidad");

        let cantidadPelicula = pelicula.cantidad; // Variable para la cantidad original de la película
        let cantidadModal = pelicula.cantidad; // Variable para la cantidad en el modal

        restarCantidadButton.addEventListener("click", () => {
            if (cantidadModal > 1) {
                cantidadModal--;
                cantidadElement.textContent = cantidadModal;
            }
        });

        sumarCantidadButton.addEventListener("click", () => {
            cantidadModal++;
            cantidadElement.textContent = cantidadModal;
        });

        comprarButton.addEventListener("click", () => {
            const horarioSeleccionado = horarioSelect.value;
            carrito.agregar(pelicula, horarioSeleccionado, cantidadModal);
            carrito.mostrarEnDom();
            modal.style.display = "none";
        });
    }

    mostrarEnDom() {
        let contenedor_pelicula = document.getElementById("products_container");

        this.listaPeliculas.forEach(pelicula => {
            contenedor_pelicula.innerHTML += `
            <div class="movie-card" id="pelicula-${pelicula.id}">
                <div class="card-content">
                    <img src="${pelicula.img}" alt="${pelicula.alt}">
                    <h2>${pelicula.titulo}</h2>
                    <p><strong>Estreno:</strong> ${pelicula.estreno}</p>
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p><strong>Horarios:</strong> ${pelicula.horarios.join(', ')}</p>
                </div>
            </div>`;
        });

        this.listaPeliculas.forEach(pelicula => {
            const peliculaContainer = document.getElementById(`pelicula-${pelicula.id}`);
            peliculaContainer.addEventListener("click", () => {
                const controlador = new ControladorDePeliculas();
                controlador.abrirModal(pelicula);
            });
        });
    }
}

// Clase Carrito
class Carrito {
    constructor() {
        this.peliculaSeleccionada = null;
    }

    agregar(pelicula, horarioSeleccionado, cantidadSeleccionada) {
        this.peliculaSeleccionada = {
            pelicula,
            horario: horarioSeleccionado,
            cantidad: cantidadSeleccionada,
        };
        this.guardarEnStorage();
        this.mostrarEnDom();
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
                <button class="btn-comprar" id="agregar-pelicula-${pelicula.id}"> Comprar </button>
            </div>
        </div>`;
        } else {
            modalContent.innerHTML = `
            <div class="conteiner-img">
                <img class="img-cart" src="./public/Logo-cinecolombia.webp" alt="Logo-cinecolombia">                           
            </div>
            <p class="cerrar">Selecciona una película para iniciar</p>
            `;
        }
    }
}

const listaDePeliculas = [
    new Pelicula(1, "Oppenheimer", "Escrita y dirigida por Christopher Nolan, Oppenheimer es un thriller épico que sumerge al público en la trepidante paradoja del enigmático hombre que debe arriesgarse a destruir el mundo para poder salvarlo.", "1 de septiembre de 2023", "Thriller, Acción", ["7:00 PM", " 9:00 PM"], 25800, "IMAX DINAMICS", 100, "./public/oppenhaimer.jpg", "Texto alternativo 1"),
    new Pelicula(2, "Blue Beetle", "Jaime Reyes se encuentra en posesión de una antigua reliquia de biotecnología alienígena llamada Escarabajo. Cuando el Escarabajo elige a Jaime como huésped simbiótico, le otorga una armadura con poderes extraordinarios e impredecibles.", "8 de septiembre de 2023", "Fantasía, Ciencia Ficción", ["11:00 AM", " 3:00 PM"], 17500, "General", 120, "./public/blue-beetle.jpg", "Texto alternativo 2"),
    new Pelicula(3, "Sonido de Libertad", "Basada en una increíble historia real, trae luz y esperanza al oscuro mundo del tráfico de menores. un agente federal descubre que la hermana del niño todavía está cautiva y decide embarcarse en una peligrosa misión para salvarla. Se adentra en lo profundo de la selva colombiana, poniendo su vida en riesgo para liberarla y traerla de vuelta a casa.", "5 de septiembre de 2023", "Drama, Acción", ["8:00 PM", " 10:00 PM"], 17500, "General", 100, "./public/sonido-de-libertad.jpg", "Texto alternativo 1"),
    new Pelicula(4, "Gran Turismo", "Basada en la historia real de Jann Mardenborough, la película es la historia definitiva de deseos cumplidos de un jugador adolescente de “Gran Turismo”, cuyas habilidades de gaming le llevaron a ganar una serie de competencias de Nissan, hasta convertirse en un verdadero conductor de carros de carreras profesional.", "5 de septiembre de 2023", "Acción, Historia", ["5:00 PM", " 7:00 PM"], 17500, "General", 120, "./public/gran-turismo.jpg", "Texto alternativo 2"),
    new Pelicula(5, "El Rey de la Montaña", "Pedro era apenas un niño cuando presencia el terrible accidente de su padre que le puso fin a su carrera ciclística. Decidido a darle un futuro a su familia, Pedro continúa con el sueño de convertirse en el Rey de la Montaña, Ahora solo le queda enfrentarse a sí mismo, y sanar su corazón para lograr la victoria.", "10 de septiembre de 2023", "Historia", ["3:00 PM", " 6:00 PM"], 25800, "IMAX DINAMICS", 100, "./public/rey-montaña.jpg", "Texto alternativo 1"),
    new Pelicula(6, "Milagros", "Dicen que el perro es el mejor amigo del hombre, un Border Terrier ingenuo y optimista es abandonado en las calles de la ciudad por su humilde dueño, Reggie estaba seguro de que su amado dueño nunca lo dejaría a propósito. Reggie se da cuenta que estaba en una relación tóxica y empieza a ver a Doug como el canalla despiadado que es.", "10 de septiembre de 2023", "Comedia, aventura", ["11:00 AM", " 3:00 PM"], 25800, "IMAX DINAMICS", 120, "./public/milagros.png", "Texto alternativo 2"),
    new Pelicula(7, "Cacería en Venecia", "En la Venecia posterior a la Segunda Guerra Mundial, Poirot, ahora retirado y viviendo en su propio exilio, asiste a regañadientes a una sesión de espiritismo. Cuando uno de los invitados es asesinado, depende del ex detective descubrir una vez más al asesino.", "8 de septiembre de 2023", "Acción", ["2:00 PM", " 5:00 PM"], 17500, "General", 100, "./public/venice.png", "Texto alternativo 1"),
    new Pelicula(8, "Golda", "Un retrato íntimo de una mujer extraordinaria, una mirada cautivadora a la historia de Israel, una poderosa narrativa con conmovedoras actuaciones. GOLDA captura la esencia de una líder inquebrantable y nos invita a reflexionar sobre el poder del compromiso y la determinación en la búsqueda de los ideales.", "5 de septiembre de 2023", "Drama", ["5:00 PM", " 7:30 PM"], 25800, "IMAX DINAMICS", 120, "./public/golda.png", "Texto alternativo 2")
];

const CP = new ControladorDePeliculas()
const carrito = new Carrito()

listaDePeliculas.forEach((pelicula) => {
    CP.agregar(pelicula);
})
CP.mostrarEnDom();

carrito.recuperarStorage()
carrito.mostrarEnDom()

