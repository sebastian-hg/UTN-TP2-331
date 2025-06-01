# Proyecto de prueba
Implementación de proyecto back para manejar los registros de una tienda de ropa y calzado

### instrucciones para generar un ambiente local y poder usar la app:

Se necesita tener docker instalado localmente en caso de no tenerlos, se debera instalar con:
Windows : winget install --id=Docker.DockerDesktop -e
mac : brew install --cask docker


1- ejecutar el siguiente comando:

npm install (descarga todas la librerias necesarias)

1- levantar el contenedor de docker con el comando: 

docker-compose up -d (esto resuelve cualquier problema de conexiones con la base de datos y configuraciones) levanta la base datos en el puerto 5100,
se cambia puerto 3306 para evitar cualquier problema que se este usando el puerto 


2- levantar local del back node.js con el comando: 

node app.js (levanta la app en el puerto 3000)

### datos de interes:
* si se requiere validar los datos en la base de datos podria entrar al mysql del contenedor con el comando: 

1- docker exec -it mysql_servidor mysql -u tienda_user -p

2- clave: 1234

3- comandos:
    use tienda (base de datos que se genera)
    show tables (ver todas las tablas que se generaron)
    select * from nombre-table (para visualizar los datos)



