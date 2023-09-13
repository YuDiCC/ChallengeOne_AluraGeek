//GET

const listaProductos = () =>{
fetch('../productos.json')
.then(respuesta => respuesta.json())

.catch(error = console.log(error))
}

export const productosServicios ={
    listaProductos
}