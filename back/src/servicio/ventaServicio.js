const { Venta, Producto, VentaProducto } = require('../modelo');

const crearVenta = async ({ nombreUsuario, productos }) => {
  let precioTotal = 0;
  let cantidadTotal = 0;

  for (const item of productos) {
    const producto = await Producto.findByPk(item.productoId);
    if (!producto) throw new Error(`Producto con id ${item.productoId} no encontrado`);

    const precioUnitario = parseFloat(producto.precio);
    const subtotal = precioUnitario * item.cantidad;
    precioTotal += subtotal;
    cantidadTotal += item.cantidad;

    item.precioUnitario = precioUnitario; // guardo para usar luego
  }

  const nuevaVenta = await Venta.create({
    nombreUsuario,
    cantidad_productos: cantidadTotal,
    precio_total: precioTotal,
    fecha: new Date()
  });

  for (const item of productos) {
    await VentaProducto.create({
      ventaId: nuevaVenta.id,
      productoId: item.productoId,
      cantidad: item.cantidad,
      talla: item.talla || null,
      precioUnitario: item.precioUnitario
    });
  }

  return nuevaVenta;
};

const obtenerVentaPorId = async (id) => {
  return await Venta.findByPk(id, {
    attributes: ['id', 'nombreUsuario', 'fecha', 'cantidad_productos', 'precio_total'],
    include: [{
      model: Producto,
      as: 'productos',
      attributes: ['id', 'nombre', 'precio', 'categoria'],
      through: {
        attributes: ['cantidad', 'talla'], // atributos extras en tabla intermedia
      }
    }]
  });
};

module.exports = {
  crearVenta, 
  obtenerVentaPorId
};
