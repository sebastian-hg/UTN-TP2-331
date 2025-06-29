const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tienda', 'tienda_user', '1234', {
  host: 'mysql',    
  port: 3306,       
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('se establecio conexion con MySQL desde Docker.');
  })
  .catch(err => {
    console.error(' Error al conectar con MySQL:', err);
  });

module.exports = sequelize;