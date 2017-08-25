### Descripción
Simple API para autenticación de usuarios, tomando como campos
- `email`
- `contraseña`

### Endpoints
- **POST** - `/signup` para registrar un nuevo usuario
  - payload: email (string), contraseña (string).
  - respuesta: token
- **POST** - `/signin` para autenticar usuarios existentes
  - payload: email (string), contraseña (string).
  - respuesta: token
