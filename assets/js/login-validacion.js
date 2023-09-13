const usuariosRegistrados = [
    { email: '7243@itescam.edu.mx', password: '12345' },
    { email: 'usuario2@example.com', password: 'contrasena2' },
    { email: 'usuario3@example.com', password: 'contrasena3' },
  ];

  document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const usuarioRegistrado = usuariosRegistrados.find(user => user.email === email && user.password === password);
    
    if (usuarioRegistrado) {
      // Inicio de sesión exitoso, redirige al usuario a la página deseada
      window.location.href = '../pages/admin-crud-productos.html';
    } else {
      alert('Credenciales incorrectas. Por favor, verifique sus datos.');
    }
  });
  

  document.getElementById('registro-link').addEventListener('click', function (event) {
    event.preventDefault();
    // Redirige al usuario a la página de registro (puedes definir esta página)
    window.location.href = 'registro-sesion.html';
  });