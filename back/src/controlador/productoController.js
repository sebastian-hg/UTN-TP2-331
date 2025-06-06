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

const obtenerTodosDashboard = async () => {
  return await Producto.findAll(); // esta sí devuelve productos
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
const cambiarEstadoProducto = async (req, res) => {
  const { id } = req.params;
  const { activo } = req.body; // se espera que venga true o false

  try {
    const actualizado = await productoServicio.cambiarEstadoProducto(id, activo);

    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const estado = activo ? 'activado' : 'desactivado';
    res.json({ mensaje: `Producto ${estado} correctamente` });
  } catch (error) {
    console.error('Error al cambiar estado del producto:', error);
    res.status(500).json({ error: 'Error al actualizar estado del producto' });
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
  cambiarEstadoProducto,
  buscarPorCategoria,
  obtenerTodosDashboard
};
