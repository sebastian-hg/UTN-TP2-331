const bcrypt = require("bcrypt");
const { Producto, Usuario, Talla } = require("./src/modelo"); // Asegurate de importar desde index.js

const cargarDatosIniciales = async () => {
  try {
    const countProductos = await Producto.count();
    const countUsuarios = await Usuario.count();
    if (countProductos > 0 || countUsuarios > 0) {
      console.log("Los datos iniciales ya fueron cargados previamente");
      return;
    }

    // 1. Crear tallas
    const tallas = await Talla.bulkCreate([
      { valor: "S" },
      { valor: "M" },
      { valor: "L" },
      { valor: "XL" },
      { valor: "38" },
      { valor: "40" },
      { valor: "42" },
      { valor: "44" },
    ]);

    // 2. Crear productos
    const productos = await Producto.bulkCreate([
      { nombre: "Buzo Polar", categoria: "ropa", precio: 11500, imagen: "buzoPolar.jpeg"},
      { nombre: "Pantalon de Montaña", categoria: "ropa", precio: 8500, imagen: "pantalonMontaña.jpeg" },
      { nombre: "Chaqueta Rompe Viento", categoria: "ropa", precio: 7000, imagen: "rompeViento.jpeg" },
      { nombre: "Camisa Messi", categoria: "ropa", precio: 2800, imagen: "camisaMessi.jpeg" },
      { nombre: "Buzo Adidas", categoria: "ropa", precio: 3200, imagen: "buzoAdidas.jpeg" },
      { nombre: "Camisaco", categoria: "ropa", precio: 2200, imagen: "camisaco.jpeg" },
      { nombre: "Camiseta Basica", categoria: "ropa", precio: 1500, imagen: "casmisaBlanca.jpeg"},
      { nombre: "Jeans Ajustados", categoria: "ropa", precio: 3500, imagen: "jeansAjustados.jpeg" },
      { nombre: "Chaqueta de Cuero", categoria: "ropa", precio: 7000, imagen: "chaquetaCuero.jpeg" },
      { nombre: "Vestido Veraniego", categoria: "ropa", precio: 2800, imagen: "vestidoVeraniego.jpeg" },
      { nombre: "Suéter de Lana", categoria: "ropa", precio: 3200, imagen: "sueterLana.jpeg" },
      { nombre: "Pantalones Deportivos", categoria: "ropa", precio: 2200, imagen: "pantalonesDeportivos.jpeg" },
      { nombre: "Camisa Formal", categoria: "ropa", precio: 4000, imagen: "camisaFormal.jpeg" },
      { nombre: "Zapatos Deportivos", categoria: "calzado", precio: 4500, imagen: "zapatosDeportivos.jpeg" },
      { nombre: "Botas de Cuero", categoria: "calzado", precio: 8000, imagen: "botasCuero.jpeg" },
      { nombre: "Sandalias Verano", categoria: "calzado", precio: 2500, imagen: "sandaliasVerano.jpeg" },
      { nombre: "Zapatos Formales", categoria: "calzado", precio: 6000, imagen: "zapatosFormales.jpeg" },
      { nombre: "Zapatillas Casual", categoria: "calzado", precio: 3800, imagen: "zapatillasCasual.jpeg" },
      { nombre: "Mocasines", categoria: "calzado", precio: 5200, imagen: "mocasines.jpeg" },
      { nombre: "Chanclas Playa", categoria: "calzado", precio: 1200, imagen: "chanclasPlaya.jpeg" },
      { nombre: "Zapatos Fila", categoria: "calzado", precio: 8000, imagen: "zapatosFila.jpeg" },
      { nombre: "Calzado de montaña", categoria: "calzado", precio: 33500, imagen: "calzadoMontaña.jpeg" },
      { nombre: "Botas Industriales", categoria: "calzado", precio: 36000, imagen: "botasIndustriales.jpeg" },
      { nombre: "Zapatillas Futbol", categoria: "calzado", precio: 23800, imagen: "zapatillasFutbol.jpeg" },
      { nombre: "Vans", categoria: "calzado", precio: 15200, imagen: "vans.jpeg" },
      { nombre: "Crocs", categoria: "calzado", precio: 6200, imagen: "crocs.jpeg" },
    ]);

    // 3. Asociar tallas según categoría
    const tallasRopa = await Talla.findAll({ where: { valor: ["S", "M", "L", "XL"] } });
    const tallasCalzado = await Talla.findAll({ where: { valor: ["38", "40", "42", "44"] } });

    for (const producto of productos) {
      if (producto.categoria === "ropa") {
        await producto.addTallas(tallasRopa);
      } else {
        await producto.addTallas(tallasCalzado);
      }
    }

    // 4. Crear usuarios con contraseña encriptada
    const saltRounds = 10;
    const usuarios = [
      { email: "S@gmail.com", password: "123" },
      { email: "ThiagoFernandez", password: "thiago123" },
      { email: "test", password: "test1234" },
    ];

    for (const user of usuarios) {
      const hash = await bcrypt.hash(user.password, saltRounds);
      await Usuario.create({
        email: user.email,
        password: hash,
      });
    }

    console.log("Datos iniciales cargados correctamente");
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error);
  }
};

module.exports = { cargarDatosIniciales };
