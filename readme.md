# Proyecto tienda nube
Implementación de proyecto back para manejar los registros de una tienda de ropa y calzado

### instrucciones para generar un ambiente local y poder usar la app:


El proyecto esta separado en dos carpetas, por lo cual se recomienda generar dos terminales, asi se tiene separados el back y el front, usted debera:

# en la terminal 1 exclusiva para levantar docker:  

1- ejecutar los siguiente comandos:

- cd back
- npm install (descarga todas la librerias necesarias)

Se necesita tener docker instalado localmente en caso de no tenerlos, se debera instalar con:
Windows : winget install --id=Docker.DockerDesktop -e
mac : brew install --cask docker

1- levantar el contenedor de docker con el comando: 

* docker-compose up -d  (esto resuelve cualquier problema de conexiones con la base de datos y configuraciones) levanta la base datos en el puerto 5100,
se cambia puerto 3306 para evitar cualquier problema que se este usando el puerto 

- datos de interes:
* si se requiere validar los datos en la base de datos podria entrar al mysql del contenedor con el comando: 

1- docker exec -it mysql_servidor mysql -u tienda_user -p

2- clave: 1234

3- comandos:
    use tienda (base de datos que se genera)
    show tables (ver todas las tablas que se generaron)
    select * from nombre-table (para visualizar los datos)

### terminal 2 back
 ya una vez levantado el docker localmente y tener todas las dependencias instaladas, usted debe:
 1. cd back
 2. node app.js (levanta la app en el puerto 3000) ya se puede ingregar a http://localhost:3000/auth/login para verificar el frotn con los ejs
 
### para levantar el Front
debe navegar el en la raiz del proyecto a /front/index.html 
una vez posicionado en index.html debe presionar en la parte inferior de la pantalla del lado derecho la opcion GO Live, esto levantara el front en la siguiente direccion: http://127.0.0.1:5500/front/index.html

### postman se agrego en la raiz del proyecto la coleccion de postman para poder probar las diferentes funcionalidades del back 