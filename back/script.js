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
      { nombre: "Camiseta Basica", categoria: "ropa", precio: 1500, imagen: "https://cdn.pixabay.com/photo/c/03/31/19/56/t-shirt-1296421_1280.png" },
      { nombre: "Jeans Ajustados", categoria: "ropa", precio: 3500, imagen: "https://cdn.pixabay.com/photo/2016/03/31/19/56/jeans-1296397_1280.png" },
      { nombre: "Chaqueta de Cuero", categoria: "ropa", precio: 7000, imagen: "https://cdn.pixabay.com/photo/2017/08/06/22/03/jacket-2592499_1280.jpg" },
      { nombre: "Vestido Veraniego", categoria: "ropa", precio: 2800, imagen: "https://cdn.pixabay.com/photo/2017/07/16/10/43/dress-2503541_1280.jpg" },
      { nombre: "Suéter de Lana", categoria: "ropa", precio: 3200, imagen: "https://cdn.pixabay.com/photo/2017/08/01/14/34/sweater-2566270_1280.jpg" },
      { nombre: "Pantalones Deportivos", categoria: "ropa", precio: 2200, imagen: "https://cdn.pixabay.com/photo/2014/12/27/15/40/trousers-581554_1280.jpg" },
      { nombre: "Camisa Formal", categoria: "ropa", precio: 4000, imagen: "https://cdn.pixabay.com/photo/2016/03/27/19/56/shirt-1286415_1280.png" },
      { nombre: "Zapatos Deportivos", categoria: "calzado", precio: 4500, imagen: "https://cdn.pixabay.com/photo/2014/04/03/10/31/sneakers-309149_1280.png" },
      { nombre: "Botas de Cuero", categoria: "calzado", precio: 8000, imagen: "https://cdn.pixabay.com/photo/2016/11/21/16/38/boots-1845299_1280.jpg" },
      { nombre: "Sandalias Verano", categoria: "calzado", precio: 2500, imagen: "https://cdn.pixabay.com/photo/2017/05/10/20/28/sandals-2300124_1280.jpg" },
      { nombre: "Zapatos Formales", categoria: "calzado", precio: 6000, imagen: "https://cdn.pixabay.com/photo/2014/12/15/14/04/shoes-568248_1280.jpg" },
      { nombre: "Zapatillas Casual", categoria: "calzado", precio: 3800, imagen: "https://cdn.pixabay.com/photo/2017/01/25/15/43/shoes-2001690_1280.jpg" },
      { nombre: "Mocasines", categoria: "calzado", precio: 5200, imagen: "https://cdn.pixabay.com/photo/2017/01/16/15/10/moccasin-1985971_1280.jpg" },
      { nombre: "Chanclas Playa", categoria: "calzado", precio: 1200, imagen: "https://cdn.pixabay.com/photo/2017/01/16/15/11/flip-flops-1985977_1280.jpg" },
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
