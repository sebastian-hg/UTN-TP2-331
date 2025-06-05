const { Producto, Talla } = require('../modelo');

const obtenerTodos = async () => {
  return await Producto.findAll({
  
    include: [
      {
        model: Talla,
        as: 'tallas', // este alias debe coincidir con el definido en la asociación
        through: { attributes: [] } // omite la tabla intermedia
      }
    ]
  });
};

const obtenerPorId = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  return producto;
};

const crearProducto = async ({ nombre, categoria, precio, imagen }) => {
  return await Producto.create({ nombre, categoria, precio, imagen });
};

const modificarProducto = async (id, { nombre, categoria, precio, imagen }) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  await producto.update({ nombre, categoria, precio, imagen });
  return producto;
};

const eliminarProducto = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  await producto.destroy();
  return { mensaje: 'Producto eliminado correctamente' };
};

const obtenerProductosPorCategoriaConTallas = async (categoria) => {
  return await Producto.findAll({
    where: { categoria },
    include: [
      {
        model: Talla,
        as: 'tallas', // este alias debe coincidir con el definido en la asociación
        through: { attributes: [] } // omite la tabla intermedia
      }
    ]
  });
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crearProducto,
  modificarProducto,
  eliminarProducto,
  obtenerProductosPorCategoriaConTallas
};

