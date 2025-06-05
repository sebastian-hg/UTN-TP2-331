const productoServicio = require('../servicio/productoServicio');
const { Producto } = require('../modelo');

const obtenerTodos = async (req, res) => {
  try {
    const productos = await productoServicio.obtenerTodos();
    console.log('Productos encontrados:', productos);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar productos por categoría' });
  }
};

// Obtener producto por ID
const obtenerPorId = async (req, res) => {
  try {
    const producto = await productoServicio.obtenerPorId(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

// Crear producto
const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await productoServicio.crearProducto(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Modificar producto
const modificarProducto = async (req, res) => {
  try {
    const productoActualizado = await productoServicio.modificarProducto(req.params.id, req.body);
    if (!productoActualizado) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(productoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar producto' });
  }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await productoServicio.eliminarProducto(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

// Buscar por categoría
const buscarPorCategoria = async (req, res) => {
  try {
    const productos = await productoServicio.obtenerProductosPorCategoriaConTallas(req.params.categoria.toLowerCase());
    console.log('Productos encontrados:', productos);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar productos por categoría' });
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crearProducto,
  modificarProducto,
  eliminarProducto,
  buscarPorCategoria,
};
