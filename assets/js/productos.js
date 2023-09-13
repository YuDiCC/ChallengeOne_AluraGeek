// Obtiene el identificador de fragmento de la URL (por ejemplo, #producto1)
const productId = window.location.hash.substring(1);

// Realiza una solicitud para cargar el archivo JSON
fetch('../../db.json')
  .then(response => response.json())
  .then(data => {
    // Busca el producto correspondiente en el JSON por su ID
    const producto = data.find(item => item.id === productId);

    if (producto) {
      // Rellena los elementos HTML con la información del producto
      document.getElementById("product-image").src = producto.imagen;
      document.getElementById("product-title").textContent = producto.nombre;
      document.getElementById("product-price").textContent = producto.precio;
      document.getElementById("product-description").textContent = producto.descripcion;
    } else {
      // Si el producto no se encuentra en el JSON, puedes mostrar un mensaje de error o redirigir a una página de error.
      console.error("Producto no encontrado");
      // Puedes redirigir al usuario a una página de error o mostrar un mensaje de error en la página actual.
      // window.location.href = "error.html"; // Redirigir a una página de error
      // document.getElementById("error-message").textContent = "Producto no encontrado"; // Mostrar mensaje de error en la página actual
    }
  })
  .catch(error => {
    console.error("Error al cargar los datos de productos:", error);
  });
