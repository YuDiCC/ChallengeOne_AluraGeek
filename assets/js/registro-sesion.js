document.getElementById('registro-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Aquí debes agregar la lógica para registrar al usuario.
    // Puedes almacenar el correo electrónico y la contraseña en una base de datos o en una lista de usuarios válidos.

    // Después de registrar al usuario, puedes redirigirlo a la página de inicio de sesión.
    window.location.href = 'admin-crud-productos.html';
  });