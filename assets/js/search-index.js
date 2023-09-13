// Realiza una solicitud para cargar el archivo JSON
fetch('../db.json')
  .then(response => response.json())
  .then(data => {
    // Obtén referencias a elementos HTML relevantes
    const searchInput = document.getElementById("search");
    const suggestionsList = document.getElementById("suggestions");

    // Función para mostrar sugerencias basadas en la entrada del usuario
    function showSuggestions(inputText) {
      // Limpia la lista de sugerencias
      suggestionsList.innerHTML = "";

      if (inputText.trim() === "") {
        // Si el campo de búsqueda está vacío, no se muestran sugerencias
        return;
      }

      // Filtra productos que coincidan con la entrada del usuario
      const matchingProducts = data.filter(product => product.nombre.toLowerCase().includes(inputText.toLowerCase()));

      // Agrega sugerencias a la lista
      matchingProducts.forEach(product => {
        const suggestionItem = document.createElement("li");
        suggestionItem.textContent = product.nombre;
        suggestionItem.addEventListener("click", () => {
          // Cuando el usuario selecciona una sugerencia, llena el campo de búsqueda y realiza la búsqueda
          searchInput.value = product.nombre;
          suggestionsList.innerHTML = "";
          searchProducts();
        });
        suggestionsList.appendChild(suggestionItem);
      });
    }

    // Función de búsqueda
    function searchProducts() {
      // Obtiene el texto ingresado en el campo de búsqueda
      const searchText = searchInput.value.toLowerCase();

      // Realiza una búsqueda en el archivo JSON
      const matchingProduct = data.find(product => product.nombre.toLowerCase() === searchText);

      if (matchingProduct) {
        // Si se encuentra un producto coincidente, redirige a la página de producto correspondiente
        window.location.href = `assets/pages/product.html#${matchingProduct.id}`;
      } else {
        // Si no se encuentra ningún producto coincidente, puedes mostrar un mensaje de error o realizar otra acción.
        console.error("Producto no encontrado");
        // Puedes mostrar un mensaje de error en la página actual.
        // document.getElementById("error-message").textContent = "Producto no encontrado";
      }
    }

    // Agrega un evento de entrada para mostrar sugerencias mientras el usuario escribe
    searchInput.addEventListener("input", () => {
      const inputText = searchInput.value.trim();
      showSuggestions(inputText);
    });

    // Agrega un evento al botón de búsqueda
    const searchButton = document.getElementById("search-button");
    searchButton.addEventListener("click", searchProducts);
  })
  .catch(error => {
    console.error("Error al cargar los datos de productos:", error);
  });