# API Talento Tech

Este proyecto es una API REST desarrollada con Node.js y Express como parte del proyecto final del curso de Node Js de Talento Tech. Implementa operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre una colección de productos almacenados en Firebase.

## Tecnologías
- Node.js
- Express
- Firebase (Firestore)
- Vercel (despliegue)

## Instalación


1. Clonar el repositorio:


```bash
$ git clone https://github.com/melody-rabinovich/proyecto-final-ecommerce-Melody-Rabinovich.git
$ cd proyecto-final-ecommerce-Melody-Rabinovich
$ npm install 
```
2. Correr el programa de manera local:
```bash
$ npm run start
```

## Uso

Para interactuar con la API se recomienda utilizar herramientas como Postman o Thunder Client.

## Endpoints y casos de uso

#####  Acceder a todos los productos
```
GET https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/getAllProducts
```
Devuelve una lista en formato JSON, de todos los productos cargados

#### Filtrar por nombre o categoria:


**GET** https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/filtrar?nombre={nombre}

**GET** https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/filtrar?categoria={categoria}

Devuelve una lista de todos los productos cuyos nombres o categorías incluyan el texto buscado

##### Ejemplos exitosos:
```
GET https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/filtrar?nombre=arroz

GET https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/filtrar?categoria=frutas
```

###### Errores posibles
- Error en la conexión a la base de datos: puede deberse a problemas de red o configuración de Firebase.
- Falta de parámetros de búsqueda: si no se incluye al menos uno de los filtros (nombre o categoria), la API devuelve un mensaje de error.
- Sin resultados: si no se encuentran productos que coincidan con el filtro, se retorna un JSON indicandolo



#### Filtrar por precio
**GET** https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/filtrar/precioMenorA/:precio

Devuelve una lista de productos con precios menores o iguales al precio buscado

##### Ejemplo exitoso:
```
GET https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/filtrar/precioMenorA/1000
```

###### Errores posibles:
- Error en la conexión a la base de datos: puede deberse a problemas de red o configuración de Firebase.
- Falta de parámetros de búsqueda: si no se incluye el parámetro de precio, la ruta será incorrecta
- Parámetro erróneo: el parámetro debe ser un número
- Sin resultados: si no se encuentran productos que coincidan con el filtro, se retorna un JSON indicandolo


####  Buscar producto por nombre:
**GET** https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/buscarProducto/:nombre

Devuelve el producto con el mismo nombre buscado.

##### Ejemplo exitoso:
```
GET https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/buscarProducto/arroz
```

###### Errores posibles:
- Error en la conexión a la base de datos: puede deberse a problemas de red o configuración de Firebase.
- Falta de parámetros de búsqueda: si no se incluye el parámetro de nombre, la ruta será incorrecta
- Sin resultados: si no se encuentran productos que coincidan con el filtro, se retorna un JSON indicandolo




### Los siguientes endpoints requieren de autorización
Hay casos de uso exclusivamente para administradores, ya que pueden vulnerar la privacidad de la API.
En caso de ser un administrador, se requiere un log in previo, para realizar operaciones como crear, actualizar y eliminar productos.
El Log In proporciona un token, a través de JWT (JSON Web Token) necesario para autorizar las operaciones


####  Acceder con Log In

**POST** https://proyecto-final-ecommerce-melody-rab.vercel.app/auth/login

**Body (JSON):**

{
    "email" : {email},
    "contraseña" : {contraseña}
}

En caso de que el mail y la contraseña sean correctos, la api devuelve un objeto de tipo JSON, con un token, el cual es válido por dos horas, y necesario para los siguientes endpoints

###### Errores posibles:
- Error en la conexión a la base de datos: puede deberse a problemas de red o configuración de Firebase.
- Errores en el body: si al body le faltan propiedades o están mal escritas, devuelve un error
- Sin resultados: si no se encuentra el usuario autorizado, se retorna un JSON indicandolo

#### Cómo usar el token:
El token debe ser incluido en el header de autorización en cada solicitud protegida, así:
```
Authorization: Bearer {token}
```



####  Crear un producto:
**POST** https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/crearProducto

**Body (JSON):**
{
    "nombre" : {nombre},
    "categoria" : {categoria},
    "precio" : {precio},
    "stock" : {stock}
}

Requiere autorización, agrega el nuevo producto a la base de datos, y devuelve un mensaje comunicando el estado de la operación

##### Ejemplo exitoso:
```
POST https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/crearProducto
```

**Body (JSON):**

```json
{
  "nombre": "mandarina",
  "precio": 250,
  "stock": 100,
  "categoria": "frutas y verduras"
}
```


###### Errores posibles:
- Error en la conexión a la base de datos: puede deberse a problemas de red o configuración de Firebase.
- Errores en el body: si al body le faltan propiedades o están mal escritas, devuelve un error indicándolo
- Producto ya existente: si se encuentra un producto con el mismo nombre, no permite agregarlo y retorna un JSON indicandolo


####  Modificar un producto:
**PUT** https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/modificarProducto/:nombre

**Body (JSON):**

{
    "nombre" : {nombre},
    "categoria" : {categoria},
    "precio" : {precio},
    "stock" : {stock}
}

Requiere autorización, actualiza la base de datos con las modificaciones y devuelve un mensaje comunicando el estado de la operación. NO se puede cambiar el nombre de un producto. Si el nombre del producto cambia en el body, ignora esa modificación

##### Ejemplo exitoso:
```
PUT https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/modificarProducto/palta
```
**Body (JSON):**

{
    "nombre" : "palta",
    "categoria" : "frutas y verduras",
    "precio" : 1200,
    "stock" : 10
}


###### Errores posibles:
- Error en la conexión a la base de datos: puede deberse a problemas de red o configuración de Firebase.
- Errores en el body: si al body le faltan propiedades o están mal escritas, devuelve un error indicándolo
- Producto no encontrado: si no se encuentra un producto con el mismo nombre, no se puede modificar.


####  Eliminar un producto:
**DELETE** https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/eliminarProducto/:nombre

Requiere autorización, elimina el producto de la base de datos y devuelve un mensaje comunicando el estado de la operación.

##### Ejemplo exitoso:
```
DELETE https://proyecto-final-ecommerce-melody-rab.vercel.app/api/products/eliminarProducto/palta
```


###### Errores posibles:
- Error en la conexión a la base de datos: puede deberse a problemas de red o configuración de Firebase.
- Falta de parámetros de búsqueda: si no se incluye el parámetro de nombre, la ruta será incorrecta
- Producto no encontrado: si no se encuentra un producto con el mismo nombre, no se puede eliminar.




## Consideraciones

- Todas las respuestas están en formato JSON.
- Cada producto tiene un nombre único y la base de datos no permite duplicados


## Autor

- Nombre: Melody Maia Rabinovich
- Curso: Back-End / Node JS
- Fecha: Julio 2025
