// Función para cargar los productos desde un archivo JSON externo
function cargarProductosDesdeJSON() {
    fetch('../../db.json') // Ruta al archivo JSON
        .then(response => response.json()) // Convertir la respuesta a JSON
        .then(data => {
            // Almacena los datos en la variable "productos"
            productos = data;
            mostrarProductos(); // Muestra los productos después de cargarlos
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
}

// Llama a la función para cargar los productos al cargar la página
cargarProductosDesdeJSON();

/// Función para mostrar la lista de productos
function mostrarProductos() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    productos.forEach((producto, index) => {
        const card = crearTarjetaProducto(producto, index); // Pasa el índice como argumento
        productList.appendChild(card);

        // Agregar un salto de línea después de cada sexto elemento para crear filas
        if ((index + 1) % 6 === 0) {
            productList.appendChild(document.createElement('br'));
        }
    });
}

// Función para crear una tarjeta de producto
function crearTarjetaProducto(producto, index) { // Agrega el índice como parámetro
    const card = document.createElement('div');
    card.classList.add('products__card');

    const imagenElement = document.createElement('img');
    imagenElement.classList.add('products__image');
    imagenElement.src = producto.imagen;
    imagenElement.alt = `Imagen de ${producto.nombre}`;
    card.appendChild(imagenElement);

    const nombreElement = document.createElement('h3');
    nombreElement.classList.add('products__name');
    nombreElement.textContent = producto.nombre;
    card.appendChild(nombreElement);

    const precioElement = document.createElement('p');
    precioElement.classList.add('products__price');
    precioElement.textContent = `Precio: ${producto.precio}`;
    card.appendChild(precioElement);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('products__buttons');

    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => editarProducto(index)); // Pasa el índice como argumento
    buttonsContainer.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => eliminarProducto(index)); // Pasa el índice como argumento
    buttonsContainer.appendChild(deleteButton);

    card.appendChild(buttonsContainer);

    return card;
}

// Función para crear un nuevo producto
function crearProducto() {
    // Abre una nueva ventana o pestaña con el formulario de creación
    const newWindow = window.open('crear-producto.html');

    newWindow.cancelarCreacion = function () {
        newWindow.close();
    };

    // Agregar un evento para manejar la creación del producto en la nueva ventana
    newWindow.onload = function () {
        newWindow.document.getElementById('crear-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Evitar que el formulario se envíe

            // Obtener los valores ingresados por el usuario en la nueva ventana
            const nuevoNombre = newWindow.document.getElementById('nombre').value;
            const nuevoPrecio = newWindow.document.getElementById('precio').value;
            const nuevaDescripcion = newWindow.document.getElementById('descripcion').value;
            const nuevaImagen = newWindow.document.getElementById('imagen').value;

            // Crear un nuevo producto con todos los valores ingresados
            const nuevoProducto = {
                id: `producto${productos.length + 1}`,
                nombre: nuevoNombre,
                precio: nuevoPrecio,
                descripcion: nuevaDescripcion,
                imagen: nuevaImagen,
            };

            // Agregar el nuevo producto a la lista
            productos.push(nuevoProducto);

            // Cerrar la nueva ventana o pestaña después de guardar los cambios
            newWindow.close();

            // Mostrar la lista de productos actualizada en la ventana principal
            mostrarProductos();
        });

        // Agregar una función para cancelar la creación del producto
        newWindow.cancelarCreacion = function () {
            newWindow.close();
        };
    };
}

// Función para abrir una nueva ventana o pestaña con el formulario de edición
function editarProducto(index) {
    const producto = productos[index];

    // Abre una nueva ventana o pestaña con el formulario de edición
    const newWindow = window.open('editar-producto.html');

    newWindow.cancelarEdicion = function () {
        newWindow.close();
    };

    // Luego, pasas los datos del producto que deseas editar a la nueva ventana
    newWindow.onload = function () {
        newWindow.document.getElementById('nombre').value = producto.nombre;
        newWindow.document.getElementById('precio').value = producto.precio;
        newWindow.document.getElementById('descripcion').value = producto.descripcion;
        newWindow.document.getElementById('imagen').value = producto.imagen;

        // Agregar un evento para manejar la edición del formulario en la nueva ventana
        newWindow.document.getElementById('edit-form').addEventListener('submit', function (event) {
            event.preventDefault(); // Evitar que el formulario se envíe

            // Obtener los valores ingresados por el usuario en la nueva ventana
            const nuevoNombre = newWindow.document.getElementById('nombre').value;
            const nuevoPrecio = newWindow.document.getElementById('precio').value;
            const nuevaDescripcion = newWindow.document.getElementById('descripcion').value;
            const nuevaImagen = newWindow.document.getElementById('imagen').value;

            // Actualizar los valores del producto en la ventana principal
            producto.nombre = nuevoNombre;
            producto.precio = nuevoPrecio;
            producto.descripcion = nuevaDescripcion;
            producto.imagen = nuevaImagen;

            // Cerrar la nueva ventana o pestaña después de guardar los cambios
            newWindow.close();

            // Mostrar la lista de productos actualizada en la ventana principal
            mostrarProductos();
        });
    };
}

// Función para eliminar un producto
function eliminarProducto(index) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (confirmacion) {
        productos.splice(index, 1);
        mostrarProductos();
    }
}

// Función para crear un elemento HTML que muestre todos los detalles del producto
function crearElementoProducto(producto) {
    const listItem = document.createElement('li');

    // Crear elementos para mostrar la información del producto
    const nombreElement = document.createElement('h3');
    nombreElement.textContent = `Nombre: ${producto.nombre}`;

    const precioElement = document.createElement('p');
    precioElement.textContent = `Precio: ${producto.precio}`;

    const imagenElement = document.createElement('img');
    imagenElement.src = producto.imagen;
    imagenElement.alt = `Imagen de ${producto.nombre}`;

    // Agregar todos los elementos al listItem
    listItem.appendChild(nombreElement);
    listItem.appendChild(precioElement);
    listItem.appendChild(imagenElement);

    return listItem;
}

// Mostrar la lista de productos al cargar la página
mostrarProductos();
