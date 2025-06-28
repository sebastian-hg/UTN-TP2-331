const Usuario = require('./usuario');
const Producto = require('./producto');
const Talla = require('./talla');
const Venta = require('./venta');
const VentaProducto = require('./ventaProducto'); 


// Relación Producto/Talla (Muchos a Muchos)
Producto.belongsToMany(Talla, {
  through: 'producto_talla',
  as: 'tallas',
  foreignKey: 'productoId',
});
Talla.belongsToMany(Producto, {
  through: 'producto_talla',
  as: 'productos',
  foreignKey: 'tallaId',
});

// Relación Producto/Venta (Muchos a Muchos) a través de DetalleVenta
Producto.belongsToMany(Venta, {
  through: VentaProducto,
  as: 'ventas',
  foreignKey: 'productoId',
});
Venta.belongsToMany(Producto, {
  through: VentaProducto,
  as: 'productos',
  foreignKey: 'ventaId',
});

module.exports = {
  Usuario,
  Producto,
  Talla,
  Venta,
  VentaProducto
};
