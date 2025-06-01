const express = require("express");
const app = express();

const authRuta = require("../back/src/rutas/auth");
const productoRoutes = require("./src/rutas/producto")
//base de datod
const conexion = require("./src/config/database");


const { cargarDatosIniciales } = require("./script");

app.use(express.json());

// Rutas públicas de auth (login, registro)
app.use("/auth", authRuta);

// // Rutas de productos
app.use("/productos", productoRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});



app.use(express.json());

conexion
  .sync({ force: true })
  .then(async () => {
    console.log("Tablas sincronizadas");

    await cargarDatosIniciales();
  })
  .catch((error) => {
    console.error("Error al sincronizar la base de datos:", error);
  });
