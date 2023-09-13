// Obtiene el identificador de fragmento de la URL (por ejemplo, #producto1)
const productId = window.location.hash.substring(1);

// Define un objeto con información sobre tus productos (puedes agregar más productos aquí)
const productos = {
  producto1: {
    nombre: "Boneco XYZ",
    precio: "R$ 60,00",
    descripcion: "Voluptas voluptatum quibusdam similique...",
    imagen: "../images/products/starwars-yoda.jpg"
  },
  producto2: {
    nombre: "Otro Producto",
    precio: "R$ 75,00",
    descripcion: "Descripción del otro producto...",
    imagen: "../images/products/otra-imagen.jpg"
  },
  // Agrega más productos según sea necesario
};

// Verifica si el producto seleccionado existe en la lista
if (productos.hasOwnProperty(productId)) {
  const producto = productos[productId];

  // Rellena los elementos HTML con la información del producto
  document.getElementById("product-image").src = producto.imagen;
  document.getElementById("product-title").textContent = producto.nombre;
  document.getElementById("product-price").textContent = producto.precio;
  document.getElementById("product-description").textContent = producto.descripcion;
} else {
  // Si el producto no se encuentra en la lista, puedes mostrar un mensaje de error o redirigir a una página de error.
  console.error("Producto no encontrado");
  // Puedes redirigir al usuario a una página de error o mostrar un mensaje de error en la página actual.
  // window.location.href = "error.html"; // Redirigir a una página de error
  // document.getElementById("error-message").textContent = "Producto no encontrado"; // Mostrar mensaje de error en la página actual
}
