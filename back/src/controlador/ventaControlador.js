const { crearVenta, obtenerVentaPorId, imprimirFacturaPorId } = require('../servicio/ventaServicio');

const registrarVenta = async (req, res) => {
  try {
    const venta = await crearVenta(req.body);
    res.status(201).json({
      mensaje: 'Venta registrada exitosamente',
      venta
    });
  } catch (error) {
    console.error('Error al registrar venta:', error);
    res.status(500).json({ error: error.message });
  }
};

const ventaPorId = async (req, res) => {
  try {
    const id = req.params.id;
    const venta = await obtenerVentaPorId(id);

    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    res.json({ venta });
  } catch (error) {
    console.error('Error al obtener la venta:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para imprimir factura
const imprimirFactura = async (req, res) => {
  try {
    // Ejemplo: recibir id por params
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ mensaje: "Falta el id de la venta" });
    }

    const pdfBuffer = await imprimirFacturaPorId(id);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=factura_${id}.pdf`,
    });

    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Error en controlador imprimirFactura:", error);
    res.status(500).json({ mensaje: "Error generando factura PDF", error: error.message });
  }
};

module.exports = {
  registrarVenta,
  ventaPorId,
  imprimirFactura
};
