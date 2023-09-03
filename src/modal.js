// Obtener el modal
let modal = document.getElementById("myModal");

// Obtener el botón que abre el modal
let btn = document.getElementById("myBtn");

// Obtener el elemento <span> que cierra el modal
let span = document.getElementsByClassName("cerrar")[0];

// Cuando el usuario hace clic en el botón, abrir el modal 
btn.onclick = () => {
    modal.style.display = "block";
}

// Cuando el usuario hace clic en <span> (X), cerrar el modal
span.onclick = () => {
    modal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier lugar fuera del modal, cerrarlo
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
