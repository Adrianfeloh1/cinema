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
        this.img = img;
        this.alt = alt;
        this.cantidad = 1;
    }
}

class ControladorDePeliculas {
    constructor() {
        this.listaPeliculas = [];
        this.contenedorPeliculas = document.getElementById("products_container");
    }

    agregar(pelicula) {
        this.listaPeliculas.push(pelicula);
    }

    async prepararContenedorPeliculas() {
        try {
            let listaDePeliculasJSON = await fetch("peliculas.json");
            let listaDePeliculasJS = await listaDePeliculasJSON.json();

            listaDePeliculasJS.forEach(pelicula => {
                let nuevaPelicula = new Pelicula({
                    id: pelicula.id,
                    titulo: pelicula.titulo,
                    descripcion: pelicula.descripcion,
                    estreno: pelicula.estreno,
                    genero: pelicula.genero,
                    precio: pelicula.precio,
                    sala: pelicula.sala,
                    horarios: pelicula.horarios,
                    img: pelicula.img,
                    alt: pelicula.alt,
                });
                this.agregar(nuevaPelicula);
            });

            this.mostrarEnDom();
        } catch (error) {
            console.error("Error fetching and displaying movies:", error);
        }
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

        const peliculaSeleccionada = { ...pelicula };

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
                    <p class="descripcion-precio"><strong>Precio Total:</strong> $<span id="precio-total">${peliculaSeleccionada.precio * peliculaSeleccionada.cantidad}</span></p>
                    <button class="btn-comprar" id="agregar-pelicula-${peliculaSeleccionada.id}"> Añadir a Tickets </button>
                </div>
            </div>`;

        const horarioSelect = modalContent.querySelector(`#horario-${peliculaSeleccionada.id}`);
        const comprarButton = modalContent.querySelector(`#agregar-pelicula-${peliculaSeleccionada.id}`);
        const cantidadElement = modalContent.querySelector("#cantidad-modal");
        const restarCantidadButton = modalContent.querySelector("#restar-cantidad");
        const sumarCantidadButton = modalContent.querySelector("#sumar-cantidad");
        const precioTotalElement = modalContent.querySelector("#precio-total");

        let cantidadModal = peliculaSeleccionada.cantidad;

        const actualizarPrecioTotal = () => {
            const precioUnitario = peliculaSeleccionada.precio;
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
            // Call the agregar method of the carrito with the copied movie, selected time, and quantity
            carrito.agregarYLimpiar(peliculaSeleccionada, horarioSeleccionado, cantidadModal);
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
            text: "La película ha sido añadida a Tickets",
            duration: 2000,
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center`, or `right`        
            style: {
                background: "#0065A8",
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

    agregarYLimpiar(pelicula, horarioSeleccionado, cantidadSeleccionada) {
        this.agregar(pelicula, horarioSeleccionado, cantidadSeleccionada);
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

    limpiarLocalStorage() {
        localStorage.removeItem("peliculaCarrito");
    }

    eventoFinalizarCompra() {
        const pagar = document.getElementById("pagar");

        if (pagar) {
            pagar.addEventListener("click", () => {
                this.limpiarLocalStorage();

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tu pago se ha registrado con Éxito. ¡Disfruta la película!',
                    showConfirmButton: false,
                    timer: 3500
                });
            });
        }
    }

    mostrarEnDom() {
        let modal = document.getElementById("myModal");
        let modalContent = modal.querySelector(".modal-contenido");
        let cantidadTotalTickets = document.getElementById("cantidad-total-tickets");

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
                        <button class="btn-comprar" id="pagar"> Pagar </button>
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
        this.eventoFinalizarCompra();
    }
}

const CP = new ControladorDePeliculas();
const carrito = new Carrito();

CP.prepararContenedorPeliculas();

carrito.recuperarStorage();
carrito.mostrarEnDom();