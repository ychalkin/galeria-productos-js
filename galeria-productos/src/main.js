// 1. Arreglo de productos con sus propiedades (nombre, precio, categoría)
const productos = [
  { id: 1, nombre: "Laptop Gamer", precio: 1200, categoria: "Tecnología" },
  { id: 2, nombre: "Auriculares Bluetooth", precio: 80, categoria: "Tecnología" },
  { id: 3, nombre: "Camisa Casual", precio: 25, categoria: "Ropa" },
  { id: 4, nombre: "Pantalón Jeans", precio: 40, categoria: "Ropa" },
  { id: 5, nombre: "Cafetera Eléctrica", precio: 60, categoria: "Hogar" },
  { id: 6, nombre: "Licuadora", precio: 45, categoria: "Hogar" }
];

// Seleccionamos los elementos del DOM
const contenedorProductos = document.getElementById("contenedor-productos");
const botonesCategoria = document.querySelectorAll(".btn-categoria");
const inputPrecio = document.getElementById("input-precio");
const btnFiltrarPrecio = document.getElementById("btn-filtrar-precio");

// 2. Función para mostrar productos en pantalla usando map() y manipulación del DOM
function mostrarProductos(listaProductos) {
  // Verificamos si la lista está vacía
  if (listaProductos.length === 0) {
    contenedorProductos.innerHTML = `<p class="sin-resultados">No se encontraron productos.</p>`;
    return;
  }

  // Usamos .map() para transformar cada objeto del arreglo en una tarjeta HTML
  const tarjetasHTML = listaProductos.map(producto => {
    return `
      <div class="tarjeta-producto">
        <h3>${producto.nombre}</h3>
        <p class="categoria">Categoría: <span>${producto.categoria}</span></p>
        <p class="precio">$${producto.precio}</p>
      </div>
    `;
  });

  // Unimos todo el arreglo de strings en un solo string e insertamos en el DOM con innerHTML
  contenedorProductos.innerHTML = tarjetasHTML.join("");
}

// 3. Filtrar por Categoría usando filter()
botonesCategoria.forEach(boton => {
  boton.addEventListener("click", (e) => {
    const categoriaSeleccionada = e.target.getAttribute("data-categoria");

    if (categoriaSeleccionada === "Todas") {
      mostrarProductos(productos);
    } else {
      // Usamos .filter() para obtener solo los productos que coincidan con la categoría
      const productosFiltrados = productos.filter(
        producto => producto.categoria === categoriaSeleccionada
      );
      mostrarProductos(productosFiltrados);
    }
  });
});

// 4. Filtrar por Precio Máximo usando filter()
btnFiltrarPrecio.addEventListener("click", () => {
  const precioMaximo = parseFloat(inputPrecio.value);

  if (isNaN(precioMaximo) || precioMaximo < 0) {
    alert("Por favor, ingresa un precio máximo válido.");
    return;
  }

  // Usamos .filter() para obtener los productos cuyo precio sea menor o igual al ingresado
  const productosFiltrados = productos.filter(
    producto => producto.precio <= precioMaximo
  );

  mostrarProductos(productosFiltrados);
});

// Cargar todos los productos por defecto al abrir la página
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
});
