const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Importar rutas
const authRuta = require("./src/rutas/auth");
const productoRoutes = require("./src/rutas/producto");
const dashboardRoutes = require("./src/rutas/dashboard");
const uploadRoutes = require("./src/rutas/uploadRuta");
const ventaRuta = require('./src/rutas/ventaRuta');
const app = express();

app.use(cors()); // Para permitir todas las solicitudes cross-origin

// Configuración de EJS para vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "vistas"));

// Middleware para parsear datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser());


// Servir archivos estáticos para poder acceder a las imágenes
app.use('/uploads', express.static('uploads'));

// rutas
app.use('/upload', uploadRoutes);

app.use("/productos", productoRoutes);
app.use("/auth", authRuta);
app.use('/api', ventaRuta);
app.use("/", dashboardRoutes); // Rutas protegidas y dashboard


// Ruta raíz redirige a login . momentaneamente
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

// Iniciar servidor
app.listen(3000, '0.0.0.0', () => {
  console.log('Servidor corriendo en puerto 3000');
});

// Configuración base de datos y carga inicial
const conexion = require("./src/config/database");
const { cargarDatosIniciales } = require("./script");

conexion
  .sync({ alter: true })
  .then(async () => {
    console.log("Tablas sincronizadas");
    await cargarDatosIniciales();
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });


