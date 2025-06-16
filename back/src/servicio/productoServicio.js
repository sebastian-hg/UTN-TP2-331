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
  return await Producto.findByPk(id, {
    include: [
      {
        model: Talla,
        as: 'tallas',
        attributes: ['id', 'valor'],
        through: { attributes: [] }
      }
    ]
  });
};

// const modificarProducto = async (id, { nombre, categoria, precio, imagen, tallas = [] }) => {
//   const producto = await Producto.findByPk(id);
//   if (!producto) throw new Error('Producto no encontrado');

//   await producto.update({ nombre, categoria, precio, imagen });

//   if (tallas.length > 0) {
//     const tallasBD = await Talla.findAll({
//       where: { nombre: tallas }
//     });

//     await producto.setTallas(tallasBD); // reemplaza las tallas actuales
//   }

//   return producto;
// };

const modificarProducto = async (id, { nombre, categoria, precio, tallas = [] }) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');

  await producto.update({ nombre, categoria, precio });

  if (tallas.length > 0) {
    const tallasBD = await Talla.findAll({ where: { valor: tallas } });
    await producto.setTallas(tallasBD);
  } else {
    await producto.setTallas([]);
  }

  return producto;
};


const cambiarEstadoProducto = async (id, activo) => {
  const [actualizados] = await Producto.update(
    { activo },
    { where: { id } }
  );
  return actualizados > 0;
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

const crearProducto = async ({ nombre, categoria, precio, tallas, imagen }) => {
  const producto = await Producto.create({ nombre, categoria, precio, imagen });

  if (tallas && tallas.length > 0) {
    const tallasDB = await Talla.findAll({ where: { valor: tallas } });
    await producto.setTallas(tallasDB);
  }

  return producto;
};


module.exports = {
  obtenerTodos,
  obtenerPorId,
  crearProducto,
  modificarProducto,
  cambiarEstadoProducto,
  obtenerProductosPorCategoriaConTallas
};

