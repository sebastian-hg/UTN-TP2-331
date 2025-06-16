const express = require("express");
const router = express.Router();

const productoController = require("../controlador/productoController");
const { verificarToken } = require("../servicio/authServicio");
const upload = require("../servicio/uploadServicio");
const productoServicio = require("../servicio/productoServicio");

// Rutas públicas
router.get("/todos", productoController.obtenerTodos);
router.get("/categoria/:categoria", productoController.buscarPorCategoria);

// Rutas para creación y edición (rutas específicas primero)
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

router.post("/", upload.single("imagen"), productoController.crearProducto);
router.post('/:id/subir-imagen', upload.single('imagen'), productoController.subirImagen);


module.exports = router;
