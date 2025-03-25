# ORDER MANAGEMENT SYSTEM - API REST

## DESCRIPCIÓN:
API desarrollada con Node.js, TypeScript y Express para gestionar un sistema de órdenes de compra con autenticación JWT y dos roles de usuario (Administrador y Cliente).

## CARACTERÍSTICAS PRINCIPALES:
- Autenticación con JWT
- Dos roles de usuario: Administrador y Cliente
- CRUD completo de productos 
- Gestión de órdenes de compra
- Manejo centralizado de errores
- Validación de datos
- Tipado fuerte con TypeScript

## TECNOLOGÍAS UTILIZADAS:
- Node.js
- Express
- TypeScript
- MongoDB (con Mongoose)
- JWT para autenticación
- Winston para logging

## INSTALACIÓN:

1. Clonar el repositorio:

2. Instalar dependencias:
npm install

3. Configurar variables de entorno:
Crear un archivo .env en la raíz con las siguientes variables:
MONGO_URI=mongodb://localhost:27017/order-management
JWT_SECRET=tu_clave_secreta_jwt
PORT=3000

4. Ejecutar en desarrollo:
npm run dev

5. Compilar para producción:
npm run build
npm start

## Estructura del Proyecto

```
src/
├── config/               # Configuraciones de la aplicación
│   └── database.ts       # Configuración de MongoDB
├── controllers/          # Lógica de los endpoints
│   ├── auth.controller.ts
│   ├── order.controller.ts
│   └── product.controller.ts
├── dtos/                 # Objetos para transferencia de datos
│   ├── auth.dto.ts
│   ├── order.dto.ts
│   └── product.dto.ts
├── interfaces/           # Tipos TypeScript
│   ├── auth.interface.ts
│   ├── order.interface.ts
│   └── product.interface.ts
├── middlewares/          # Middlewares
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── models/               # Modelos de MongoDB
│   ├── order.model.ts
│   ├── product.model.ts
│   └── user.model.ts
├── routes/               # Definición de rutas
│   ├── auth.routes.ts
│   ├── index.ts
│   ├── order.routes.ts
│   └── product.routes.ts
├── services/             # Lógica de negocio
│   ├── auth.service.ts
│   ├── order.service.ts
│   └── product.service.ts
├── utils/                # Utilidades
│   └── logger.ts         # Configuración de logs
├── app.ts                # Configuración Express
└── server.ts             # Punto de entrada
```


## Endpoints Disponibles

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión (obtener JWT)

### Productos
- `POST /api/products` - Crear producto (Admin)
- `GET /api/products` - Listar todos los productos
- `GET /api/products/:id` - Obtener producto específico
- `PUT /api/products/:id` - Actualizar producto (Admin)
- `DELETE /api/products/:id` - Eliminar producto (Admin)

### Órdenes
- `POST /api/orders` - Crear nueva orden (Cliente)
- `GET /api/orders` - Listar órdenes (propias para Cliente, todas para Admin)
- `GET /api/orders/:id` - Obtener detalles de orden

### PRUEBAS:
Puedes probar la API usando Postman. Consulta la guía de pruebas en la documentación.

## VARIABLES DE ENTORNO:
- MONGO_URI: URL de conexión a MongoDB
- JWT_SECRET: Clave secreta para JWT
- PORT: Puerto del servidor

### DEPENDENCIAS PRINCIPALES:
- express: Framework web
- mongoose: ODM para MongoDB
- jsonwebtoken: Para autenticación JWT
- bcryptjs: Para hashing de contraseñas
- winston: Para logging
- typescript: Para tipado estático

## SCRIPTS DISPONIBLES:
- npm run dev: Ejecuta en desarrollo con nodemon
- npm run build: Compila TypeScript a JavaScript
- npm start: Inicia la aplicación en producción

## Ejemplos de Uso

### Registro de Usuario
```json
POST /api/auth/register
{
  "name": "Maria García",
  "email": "maria@example.com",
  "password": "password123",
  "role": "client"
}
```

### Login de Usuario
```json
POST /api/auth/login
{
  "email": "maria@example.com",
  "password": "password123"
}
```

### Crear Producto (requiere token Admin)
```json
POST /api/products
Authorization: Bearer <token_admin>
{
  "name": "Smartphone",
  "description": "Último modelo",
  "price": 799.99,
  "stock": 100
}
```

### Crear Orden (requiere token Cliente) (requiere habilitar transacciones para ejecutarse en modo local) (en modo produccion está todo bien)
```json
POST /api/orders
Authorization: Bearer <token_cliente>
{
  "items": [
    {
      "productId": "615a1d9b8e9f8b3a7c6d5e4f",
      "quantity": 1
    }
  ]
}
```

## Pruebas con Postman

### Colección de Postman
Puedes encontrar la colección de Postman para probar los endpoints en:
`src/utils/order-products-app.postman_collection.json`

#### Pasos para importar la colección:
1. Abre Postman
2. Haz clic en "Import" en la parte superior izquierda
3. Selecciona el archivo `order-products-app.postman_collection.json`
4. La colección se importará con todos los endpoints preconfigurados

### Configuración de Variables de Entorno en Postman
- `base_url`: URL base de la API (ej. `http://localhost:3000/api`)
- `admin_token`: Token JWT para autenticación (dejar vacío inicialmente)
- `client_token`: Token JWT para autenticación (dejar vacío inicialmente)


## CONTRIBUCIÓN:
1. Haz fork del proyecto
2. Crea tu rama 
3. Haz commit de tus cambios 
4. Haz push a la rama 
5. Abre un Pull Request

LICENCIA:
MIT License