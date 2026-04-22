# API - Sistema de Gestión de Librería e Impresiones

Este proyecto es una API REST robusta desarrollada con **Node.js** y **Express**, diseñada para gestionar una librería y un sistema de pedidos de impresión. Incluye autenticación de usuarios, gestión de inventario y procesamiento automático de costos de impresión.

## Características Principales 

### 📚 Sección de Librería
*   **Gestión de Categorías**: CRUD completo para organizar productos.
*   **Gestión de Productos**: Control total sobre el inventario (nombre, precio, descripción, stock, imágenes, etc.).

### 🖨️ Pedidos de Impresión
*   **Cálculo Automático**: Procesa el precio total basado en el tipo de impresión (simple/doble faz, blanco y negro/color) y cantidad de páginas.
*   **Gestión Integral**: Vinculación de clientes con sus respectivos archivos y estados de pedido.
*   **Seguimiento**: Control de estados de impresión (ej. "printing", "completed").

### 🔐 Seguridad y Usuarios
*   **Autenticación JWT**: Rutas protegidas mediante JSON Web Tokens.
*   **Encriptación**: Contraseñas seguras procesadas con Bcrypt.

---

## Tecnologías Utilizadas

*   **Backend**: Node.js, Express.js
*   **Base de Datos Local**: MongoDB con Mongoose (ODM).
*   **Base de Datos en la Nube**: Atlas MongoDB.
*   **Autenticación**: JSON Web Token (JWT), Bcrypt.
*   **Otros**: Dotenv.


## Prerequisitos
- **Node.js instalado.
- **MongoBD instalado.



---

## Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/serocar2011-stack/MI_API.git
   cd mi_api
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:
   ```env
   PORT=...
   MONGO_URI=...
   JWT_SECRET=...
   ```

4. **Iniciar el servidor:**
   
   
 - Modo desarrollo: `npm run dev`

 - Modo producción: `npm start`


---

## 📂 Estructura del Proyecto

```text
mi_api/
├── src/
│   ├── config/      # Configuración de DB y variables
│   ├── controllers/ # Lógica de los endpoints
│   ├── models/      # Modelos de Mongoose (Schemas)
│   ├── routes/      # Definición de rutas Express
│   ├── middlewares/ # Validaciones y seguridad (JWT)
│   ├── utils/       # Funciones auxiliares y manejo de errores
│   └── services/    # Lógica de negocio adicional
├── index.js         # Punto de entrada de la aplicación
└── package.json     # Dependencias y scripts
```


---


## Ejemplos de Peticiones (Mocks)

Para facilitar las pruebas de la API, se han creado ejemplos de peticiones en formato JSON.

## Inicialización y creación de usuario administrador

⚠️ Para poder iniciar la administración de la aplicación es necesaria la creación de un usuario administrador mediante la ejecución del siguiente comando:

```bash
npm run create-admin
```

Este comando permitirá crear un usuario administrador para acceder a las funcionalidades de la API.

la respuesta exitosa sera la siguiente:

```json
{
    "message": "Administrador creado exitosamente",
    "user": {
        "email": "[EMAIL_ADDRESS]",
        "password": "[PASSWORD]"
    }
}
```


## Login

Para iniciar sesion como administrador se debe enviar un correo y una contraseña al siguiente endpoint:

**Endpoint:** POST /api/user/login


```json
{
    "email": "[EMAIL_ADDRESS]",
    "password": "[PASSWORD]"
}
```
En la respuesta se recibira un token JWT que deberá ser utilizado para las peticiones que requieran autenticación como administrador.


## Registro de Usuarios

> ⚠️ Requiere autenticación (token JWT en el header `Authorization`).

**Endpoint:** `POST /api/user`

```json
{
  "name": "juan",
  "lastName": "perez",
  "email": "juan.perez1@gmail.com",
  "password": "Password1"
}
```

Respuesta exitosa (`201 Created`):
```json
{
  "message": "User created",
  "data": {
    "_id": "664a1f...",
    "name": "juan",
    "lastName": "perez",
    "email": "juan.perez1@gmail.com",
    "createdAt": "2026-04-22T11:00:00.000Z",
    "updatedAt": "2026-04-22T11:00:00.000Z"
  }
}
```

> ℹ️ Reglas de contraseña: debe contener al menos un número, una mayúscula y tener entre 6 y 16 caracteres.

---

## Categorías

> ⚠️ Requiere autenticación (token JWT en el header `Authorization`).

**Endpoint:** `POST /api/categories`

```json
{
  "name": "cuadernos"
}
```

Respuesta exitosa (`201 Created`):
```json
{
  "_id": "664b2a...",
  "name": "cuadernos",
  "createdAt": "2026-04-22T11:00:00.000Z",
  "updatedAt": "2026-04-22T11:00:00.000Z"
}
```

---

## Productos

> ⚠️ Requiere autenticación (token JWT en el header `Authorization`).
> ℹ️ La categoría debe existir previamente en la base de datos.

**Endpoint:** `POST /api/products`

```json
{
  "name": "cuaderno universitario rayado",
  "price": 5.50,
  "description": "cuaderno universitario de 80 hojas rayadas tapa dura",
  "quantity": 50,
  "status": "AVAILABLE",
  "category": "cuadernos",
  "image": "https://example.com/images/cuaderno-rayado.jpg",
  "highlighted": true
}
```

> Valores válidos para `status`: `"AVAILABLE"` | `"NOT AVAILABLE"` | `"DISCONTINUED"`

Respuesta exitosa (`201 Created`):
```json
{
  "_id": "664c3b...",
  "name": "cuaderno universitario rayado",
  "price": "5.50",
  "description": "cuaderno universitario de 80 hojas rayadas tapa dura",
  "quantity": 50,
  "status": "AVAILABLE",
  "category": "664b2a...",
  "image": "https://example.com/images/cuaderno-rayado.jpg",
  "highlighted": true,
  "profitRate": 1.20,
  "finalPrice": 6.60,
  "createdAt": "2026-04-22T11:00:00.000Z",
  "updatedAt": "2026-04-22T11:00:00.000Z"
}
```

---

## Pedido de Impresión Completo (Cliente + Archivos)

> ℹ️ Endpoint público, no requiere autenticación.
> ℹ️ El precio total se calcula automáticamente según el tipo de impresión de cada archivo.

**Endpoint:** `POST /api/fullprintjobs`

```json
{
  "cliente": {
    "nombre": "juan",
    "apellido": "perez",
    "telefono": "3442478901",
    "email": "juan.perez1@gmail.com"
  },
  "files": [
    {
      "fileName": "tp_programacion.pdf",
      "fileUrl": "https://files.com/tp_programacion.pdf",
      "pages": 10,
      "color": "Blanco y negro",
      "faz": "simple"
    },
    {
      "fileName": "diagramas.pdf",
      "fileUrl": "https://files.com/diagramas.pdf",
      "pages": 8,
      "color": "Color",
      "faz": "doble"
    }
  ]
}
```

> Valores válidos para `color`: `"Blanco y negro"` | `"Color"`
> Valores válidos para `faz`: `"simple"` | `"doble"`

Respuesta exitosa (`201 Created`):
```json
{
  "_id": "664d4c...",
  "cliente": {
    "_id": "664e5d...",
    "nombre": "juan",
    "apellido": "perez",
    "telefono": "3442478901",
    "email": "juan.perez1@gmail.com"
  },
  "totalPages": 18,
  "totalPrice": 2100,
  "status": "pending",
  "files": [
    {
      "_id": "664f6e...",
      "fileName": "tp_programacion.pdf",
      "fileUrl": "https://files.com/tp_programacion.pdf",
      "pages": 10,
      "color": "Blanco y negro",
      "faz": "simple"
    },
    {
      "_id": "664f6f...",
      "fileName": "diagramas.pdf",
      "fileUrl": "https://files.com/diagramas.pdf",
      "pages": 8,
      "color": "Color",
      "faz": "doble"
    }
  ],
  "createdAt": "2026-04-22T11:00:00.000Z",
  "updatedAt": "2026-04-22T11:00:00.000Z"
}
```

