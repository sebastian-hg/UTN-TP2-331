const { crearVenta, obtenerVentaPorId } = require('../servicio/ventaServicio');

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

module.exports = {
  registrarVenta,
  ventaPorId
};
