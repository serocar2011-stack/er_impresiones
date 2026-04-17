Descripción:
El sistema posee dos secciones:

LIBRERIA: 
- Se pueden agregar, eliminar y traer categorias
- Se pueden agregar, modificar, traer y eleminar productos (CRUD completo)

PEDIDOS DE IMPRESION:
- Se crean pedidos de impresion los cuales tienen un usuario conectado por medio de id con los archivos del pedido solicitado
- El pedido calcula el precio total automaticamente segun los tipos de archivos: simple/doble faz - b&n/color
- Se pueden realizar pedidos completos, se pueden traer pedidos completo por id, se pueden traer archivos por id, se pueden borrar pedidos completos.



******************************************************************************
CATEGORIAS

Endpoint: http://localhost:3000/api/categories/

{
  "name":"cuadernos"
}



******************************************************************************
PRODUCTO (1RO SE DEBEN CREAR CATEGORIAS PARA PODER AGREGAR PRODUCTOS)

Endpoint: http://localhost:3000/api/products/

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

*********************************************************************************

PEDIDO DE IMPRESION COMPLETO (CLIENTE + ARCHIVOS)

Endpoint: http://localhost:3000/api/fullprintjobs/


{
  "cliente": {
    "nombre": "juan",
    "apellido": "perez",
    "telefono": "3442478901",
    "email": "juan.perez1@gmail.com"
  },
  "totalPages": 18,
  "totalPrice": 2100,
  "status": "printing",
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

*********************************************************************************

{
  "cliente": {
    "nombre": "maria",
    "apellido": "lopez",
    "telefono": "3442556677",
    "email": "maria.lopez@gmail.com"
  },
  "files": [
    {
      "fileName": "resumen_historia.pdf",
      "fileUrl": "https://files.com/historia.pdf",
      "pages": 12,
      "color": "Blanco y negro",
      "faz": "simple"
    }
  ]
}

*********************************************************************************

{
  "cliente": {
    "nombre": "diego",
    "apellido": "fernandez",
    "telefono": "3442334455",
    "email": "diego.fernandez@gmail.com"
  },
  "files": [
    {
      "fileName": "apunte1.pdf",
      "fileUrl": "https://files.com/apunte1.pdf",
      "pages": 15,
      "color": "Blanco y negro",
      "faz": "doble"
    },
    {
      "fileName": "apunte2.pdf",
      "fileUrl": "https://files.com/apunte2.pdf",
      "pages": 4,
      "color": "Color",
      "faz": "simple"
    },
    {
      "fileName": "grafico.pdf",
      "fileUrl": "https://files.com/grafico.pdf",
      "pages": 9,
      "color": "Color",
      "faz": "doble"
    }
  ]
}




*********************************************************************************

USUARIOS

EndPoint: http://localhost:3000/api/user

  {
    "name": "juan",
    "lastName": "perez",
    "email": "juan.perez1@gmail.com",
    "password": "Password1"
  },

*********************************************************************************

  {
    "name": "maria",
    "lastName": "gomez",
    "email": "maria.gomez2@gmail.com",
    "password": "Maria123"
  },

*********************************************************************************

  {
    "name": "lucas",
    "lastName": "rodriguez",
    "email": "lucas.rodriguez3@gmail.com",
    "password": "Lucas123"
  },

*********************************************************************************

  {
    "name": "sofia",
    "lastName": "fernandez",
    "email": "sofia.fernandez4@gmail.com",
    "password": "Sofia123"
  },

*********************************************************************************

  {
    "name": "martin",
    "lastName": "lopez",
    "email": "martin.lopez5@gmail.com",
    "password": "Martin123"
  },


*********************************************************************************

  {
    "name": "valentina",
    "lastName": "martinez",
    "email": "valentina.martinez6@gmail.com",
    "password": "Valen123"
  },


*********************************************************************************

  {
    "name": "tomas",
    "lastName": "sanchez",
    "email": "tomas.sanchez7@gmail.com",
    "password": "Tomas123"
  },


 *********************************************************************************

  
  {
    "name": "camila",
    "lastName": "diaz",
    "email": "camila.diaz8@gmail.com",
    "password": "Camila123"
  }

*********************************************************************************

LOGIN

EndPoint: http://localhost:3000/api/user/login


ejemplo:
{
    "email": "maria.gomez2@gmail.com",
    "password": "Maria123"
  }