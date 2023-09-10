// Obtener el modal
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("cerrar")[0];

// Abre el modal cuando se hace clic en el botón
btn.onclick = () => {
    modal.style.display = "block";
}

// Cierra el modal cuando se hace clic en el icono de cierre (X)
span.onclick = () => {
    modal.style.display = "none";
}

// Cierra el modal cuando se hace clic en cualquier lugar fuera del modal
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
