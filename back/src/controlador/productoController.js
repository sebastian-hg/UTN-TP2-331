const productoServicio = require("../servicio/productoServicio");
const { Producto } = require("../modelo");

// Obtener todos los productos
const obtenerTodos = async (req, res) => {
  try {
    const productos = await productoServicio.obtenerTodos();
    console.log("Productos encontrados:", productos);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar productos" });
  }
};

const obtenerTodosDashboard = async () => {
  return await Producto.findAll();
};

// Obtener producto por ID
const obtenerPorId = async (req, res) => {
  try {
    console.log("Obteniendo producto con ID:", req.params.id);
    const producto = await productoServicio.obtenerPorId(req.params.id);
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener producto" });
  }
};

// Crear producto con imagen
const crearProducto = async (req, res) => {
  try {
    const { nombre, categoria, precio, tallas = [] } = req.body;
    const tallasArray = Array.isArray(tallas) ? tallas : [tallas];

    const nuevoProducto = {
      nombre,
      categoria,
      precio,
      tallas: tallasArray,
      imagen: "defecto.jpg",
    };
    console.log("Creando producto:", nuevoProducto);

    await productoServicio.crearProducto(nuevoProducto);

    // ✅ Ya no renderizamos formulario. Redirigimos al dashboard:
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).send("Error al crear producto");
  }
};

// Modificar producto con imagen
const modificarProducto = async (req, res) => {
  try {
    const { nombre, categoria, precio } = req.body;
    let tallas = req.body.tallas || [];

    if (!Array.isArray(tallas)) {
      tallas = [tallas];
    }

    const productoActualizado = await productoServicio.modificarProducto(
      req.params.id,
      {
        nombre,
        categoria,
        precio,
        tallas,
      }
    );

    if (!productoActualizado)
      return res.status(404).json({ error: "Producto no encontrado" });

    // Redirige al dashboard o página deseada
    res.redirect("/dashboard");
  } catch (error) {
    console.error("❌ Error al modificar producto:", error);
    res.status(500).json({ error: "Error al modificar producto" });
  }
};
// Cambiar estado activo/inactivo
const cambiarEstadoProducto = async (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;

  try {
    const actualizado = await productoServicio.cambiarEstadoProducto(
      id,
      activo
    );

    if (!actualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const estado = activo ? "activado" : "desactivado";
    res.json({ mensaje: `Producto ${estado} correctamente` });
  } catch (error) {
    console.error("❌ Error al cambiar estado del producto:", error);
    res.status(500).json({ error: "Error al actualizar estado del producto" });
  }
};

// Buscar productos por categoría
const buscarPorCategoria = async (req, res) => {
  try {
    const productos =
      await productoServicio.obtenerProductosPorCategoriaConTallas(
        req.params.categoria.toLowerCase()
      );
    console.log("Productos encontrados:", productos);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar productos por categoría" });
  }
};

const subirImagen = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No se subió ninguna imagen");

    const { id } = req.params;
    const imagen = req.file.filename;

    // Actualizar el producto con el nombre de la imagen
    const productoActualizado = await productoServicio.modificarProducto(id, {
      imagen,
    });

    if (!productoActualizado)
      return res.status(404).send("Producto no encontrado");

    res.redirect(`/productos/${id}`); // O renderizar donde quieras después de subir la imagen
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al subir imagen");
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crearProducto,
  modificarProducto,
  cambiarEstadoProducto,
  buscarPorCategoria,
  obtenerTodosDashboard,
  subirImagen,
};
