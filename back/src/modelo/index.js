const Usuario = require('./usuario');
const Producto = require('./producto');
const Talla = require('./talla');
const Venta = require('./venta');
const DetalleVenta = require('./detalleVenta');

// Relacion Producto/Talla (Muchos a Muchos)
Producto.belongsToMany(Talla, {
  through: 'producto_talla', 
  as: 'tallas',         
  foreignKey: 'productoId'
});

Talla.belongsToMany(Producto, {
  through: 'producto_talla',
  as: 'productos',             
  foreignKey: 'tallaId'
});

// relacion Usuario/Venta (Uno a Muchos)
Producto.belongsToMany(Venta, {
  through: DetalleVenta,
  as: 'ventas',
  foreignKey: 'productoId',
});
Venta.belongsToMany(Producto, {
  through: DetalleVenta,
  as: 'productos',
  foreignKey: 'ventaId',
});

module.exports = {
  Usuario,
  Producto,
  Talla,
  Venta,
  DetalleVenta,
};
