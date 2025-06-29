const { Venta, Producto, VentaProducto } = require('../modelo');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

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

    item.precioUnitario = precioUnitario;
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
        attributes: ['cantidad', 'talla', 'precioUnitario']
      }
    }]
  });
};

const generarFacturaPDF = async (venta) => {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); 

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 12;
  let y = 800;

  const drawText = (text, x, yPos) => {
    page.drawText(text, { x, y: yPos, size: fontSize, font, color: rgb(0, 0, 0) });
  };

  drawText(`Factura de Compra`, 50, y);
  y -= 25;
  drawText(`ID de Compra: ${venta.id}`, 50, y);
  y -= 20;
  drawText(`Cliente: ${venta.nombreUsuario}`, 50, y);
  y -= 20;
  drawText(`Fecha: ${new Date(venta.fecha).toLocaleString()}`, 50, y);
  y -= 20;
  drawText(`Total productos: ${venta.cantidad_productos}`, 50, y);
  y -= 20;
  drawText(`Total pagado: $${parseFloat(venta.precio_total).toFixed(2)}`, 50, y);
  y -= 30;
  drawText(`Detalle de Productos:`, 50, y);
  y -= 20;

  for (const p of venta.productos) {
    const talla = p.ventaProducto.talla || 'N/A';
    const cantidad = p.ventaProducto.cantidad;
    const precioUnitario = parseFloat(p.ventaProducto.precioUnitario).toFixed(2);
    const subtotal = (cantidad * parseFloat(p.ventaProducto.precioUnitario)).toFixed(2);

    const texto = `${p.nombre} - Talla: ${talla} - Cantidad: ${cantidad} - Precio Unitario: $${precioUnitario} - Subtotal: $${subtotal}`;
    drawText(texto, 50, y);
    y -= 20;

    if (y < 50) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
    }
  }

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
};

const imprimirFacturaPorId = async (id) => {
  const venta = await obtenerVentaPorId(id);
  if (!venta) {
    throw new Error("Venta no encontrada");
  }
  return await generarFacturaPDF(venta);
};

module.exports = {
  crearVenta,
  obtenerVentaPorId,
  imprimirFacturaPorId
};
