// const express = require("express");
// const app = express();

// const authRuta = require("../back/src/rutas/auth");
// const productoRoutes = require("./src/rutas/producto")
// //base de datod
// const conexion = require("./src/config/database");

// const { cargarDatosIniciales } = require("./script");

// app.use(express.json());

// // Rutas públicas de auth (login, registro)
// app.use("/auth", authRuta);

// // // Rutas de productos
// app.use("/productos", productoRoutes);

// app.listen(3000, () => {
//   console.log("Servidor corriendo en http://localhost:3000");
// });

// app.use(express.json());

// conexion
//   .sync({ force: true })
//   .then(async () => {
//     console.log("Tablas sincronizadas");

//     await cargarDatosIniciales();
//   })
//   .catch((error) => {
//     console.error("Error al sincronizar la base de datos:", error);
//   });

const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// 👇 CORS para permitir acceso global (si quieres restringir, configura origin)
app.use(cors()); // Para permitir todas las solicitudes cross-origin

// Configuración de EJS para vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "vistas"));

// Middleware para parsear datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware para parsear cookies
app.use(cookieParser());

// Importar rutas
const authRuta = require("./src/rutas/auth");
const productoRoutes = require("./src/rutas/producto");
const dashboardRoutes = require("./src/rutas/dashboard");

// Usar rutas
app.use("/productos", productoRoutes);
app.use("/auth", authRuta);
app.use("/", dashboardRoutes); // Rutas protegidas y dashboard

// Ruta raíz redirige a login
app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

// Configuración base de datos y carga inicial
const conexion = require("./src/config/database");
const { cargarDatosIniciales } = require("./script");

conexion
  .sync({ force: true })
  .then(async () => {
    console.log("Tablas sincronizadas");
    await cargarDatosIniciales();
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });


