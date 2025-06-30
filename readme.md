# 🛍️ Proyecto Tienda Nube ALTA PINTA

Implementación de un proyecto backend para manejar los registros de una tienda de ropa y calzado. Se utiliza **Node.js**, **MySQL** (a través de Docker), y un frontend simple con HTML + Live Server.

se cuenta con un script.js el cual al momento de levantar inserta datos en la base de datos.

# Cualquier duda o problema contactar a :
### Sebastian Hernandez
### 1127620035
### sebastianhg479@gmail.com

## ✅ Requisitos Previos

Antes de comenzar, asegurate de tener instalados los siguientes componentes:

### 1. Docker (obligatorio) en caso de ya tenerlo, se requiere tener levantado el docker desktop

Necesario para levantar la base de datos MySQL y el backend en contenedores.

- **Windows:**
  ```bash
  winget install --id=Docker.DockerDesktop -e
  ```

-  **Mac**
  ```brew install --cask docker
  ```

Luego para validar que se instalo sin problemas usar los siguientes comandos:
* docker --version
* docker compose version

### 2. Server Live
Debera descargar el plugin de visual studio code para poder levantar el front 


### Como levantar la app?

El proyecto esta separado en tres carpetas, docker, back y front


# requiere abrir una (1) terminal exclusiva para levantar docker:  

ejecutar los siguiente comandos en la raiz del proyecto:

1. cd docker && docker-compose up --build
    este comando entra al archivo docker y levantara en un contenedor la base de datos en MySQL y el backEnd en node, esto permite eliminar cualquier tipo de problema de configuraciones
    debido a que toda configuracion esta en el contenedor y el desarrollador no se debe preocupar

* IMPORTANTE Si requiere validar alguna informacion en la base de datos del proyecto en el contenedor, usted debera:
1. abrir otra terminal
2. cd docker
3. docker exec -it mysql_servidor mysql -u tienda_user -p1234


ya estando dentro de la base de datos debera generar los siguientes comandos:
    use tienda (base de datos que se genera)
    show tables (ver todas las tablas que se generaron)
    select * from nombre-table (para visualizar los datos)


### Requerimientos Front

1. debera abrir el archivo index.html en el VSC
2. en la parte inferior derecha de la pantalla del VSC, debe presionar GO LIVE, esto levantara la app en la ruta : http://127.0.0.1:5500/front/index.html

### LOGIN Administrador 
con las siguientes credenciales usted podra ingresar al portal de admin:
1. email: "Sebastian@gmail.com", password: "123"
2. email: "utn@gmail.com", password: "utn123" 

### se agrego en la raiz del proyecto la coleccion de postman para poder probar las diferentes funcionalidades del back 

NOTA: luego de probar la app se recomienda bajar los contenedores con el comando 
docker-compose down -v  para bajar y eliminar todos los contenedores