const puppeteer = require('puppeteer');
const { Venta, Producto, VentaProducto } = require('../modelo');

// Función que ya tenés para crear venta
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

// ✅ Generador de HTML dinámico para el PDF
const generarFacturaPDF = async (venta) => {
  try {
    const productosHTML = venta.productos.map(p => `
      <div style="margin-bottom: 10px; padding: 10px; border-bottom: 1px solid #ccc;">
        <strong>${p.nombre}</strong><br/>
        Talla: ${p.ventaProducto.talla} - Cantidad: ${p.ventaProducto.cantidad}<br/>
        Precio Unitario: $${parseFloat(p.ventaProducto.precioUnitario).toFixed(2)}<br/>
        Subtotal: $${(p.ventaProducto.cantidad * parseFloat(p.ventaProducto.precioUnitario)).toFixed(2)}
      </div>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Factura #${venta.id}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #27ae60; }
        </style>
      </head>
      <body>
        <h1>Factura de Compra</h1>
        <p><strong>ID de Compra:</strong> ${venta.id}</p>
        <p><strong>Cliente:</strong> ${venta.nombreUsuario}</p>
        <p><strong>Fecha:</strong> ${new Date(venta.fecha).toLocaleString()}</p>
        <p><strong>Total productos:</strong> ${venta.cantidad_productos}</p>
        <p><strong>Total pagado:</strong> $${parseFloat(venta.precio_total).toFixed(2)}</p>
        <hr/>
        <h2>Detalle de Productos</h2>
        ${productosHTML}
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", right: "20px", bottom: "20px", left: "20px" },
    });

    await browser.close();
    return pdfBuffer;

  } catch (error) {
    console.error("Error generando PDF en servicio:", error);
    throw error;
  }
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
