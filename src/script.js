
document.getElementById('lang-toggle').addEventListener('click', function() {
    const elements = document.querySelectorAll('[data-en]'); // Selecciona todos los elementos que tienen atributo 'data-en'
    for (let elem of elements) {
        if (elem.textContent === elem.getAttribute('data-en')) {
            elem.textContent = elem.getAttribute('data-es'); // Cambia el texto a español
            this.textContent = "English Version"; // Cambia el texto del botón a "English"
        } else {
            elem.textContent = elem.getAttribute('data-en'); // Cambia el texto a inglés
            this.textContent = "Version en Español"; // Cambia el texto del botón a "Español"
        }
    }
});
