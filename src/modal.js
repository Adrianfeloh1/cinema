// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    // Obtener el modal
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("myBtn");
    let span = document.getElementsByClassName("cerrar")[0];

    // Verificar si el botón existe antes de asignar el evento
    if (btn) {
        btn.onclick = () => {
            modal.style.display = "block";
        }
    }

    // Cierra el modal cuando se hace clic en el icono de cierre (X)
    if (span) {
        span.onclick = () => {
            modal.style.display = "none";
        }
    }

    // Cierra el modal cuando se hace clic en cualquier lugar fuera del modal
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
