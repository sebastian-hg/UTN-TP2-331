const express = require("express");
const router = express.Router();

const productoController = require("../controlador/productoController");
const { verificarToken } = require("../servicio/authServicio");
const upload = require("../servicio/uploadServicio");
const productoServicio = require("../servicio/productoServicio");
const { Producto } = require("../modelo");

// Rutas públicas
router.get("/todos", productoController.obtenerTodos);
router.get("/categoria/:categoria", productoController.buscarPorCategoria);

router.post("/actualizar-foto", upload.single("imagen"), async (req, res) => {
  console.log("ID del producto para actualizar foto:", req.body ?? []);
  const productoId = req.body.productoId;
  console.log("ID del producto:", productoId);

  if (!req.file) {
    return res.status(400).json({ error: "No se subió ninguna imagen" });
  }

  try {
    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    producto.imagen = req.file.filename;
    await producto.save();

    return res.json({
      mensaje: "Imagen actualizada correctamente",
      productoId,
      filename: req.file.filename,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar imagen" });
  }
});

// Rutas para crear y modificar productos
router.get("/nuevo", (req, res) => {
  res.render("formularioProducto", { producto: null });
});

router.get("/editar/:id", async (req, res) => {
  const { id } = req.params;

  console.log("ID del producto a editar:", id);

  try {
    const producto = await productoServicio.obtenerPorId(id);
    console.log("Producto encontrado:", producto);

    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }

    res.render("formularioProducto", { producto });
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Rutas con parámetro dinámico más general al final
router.get("/:id", productoController.obtenerPorId);

// Rutas protegidas (POST, PUT, etc)
router.post("/", productoController.crearProducto);
router.post("/:id", productoController.modificarProducto);
router.post("/estado/:id", productoController.cambiarEstadoProducto);

module.exports = router;
