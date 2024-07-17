import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    "openapi": "3.0.1",
    "info": {
      "title": "Sistema para la gestión de Reportes Viales en la Ciudad de Quito",
      "description": "API que se encarga de manejar la información sobre reportes viales en la ciudad de Quito, donde involucra a los Administradores, Reportes y Usuarios que daran aviso de aquellas calles que tengan novedades estructurales, semaforización, etc.",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "https://proyecto-backend-vial.onrender.com/SourceCraft"
      }
    ],
    "tags": [
      {
        "name": "Users",
        "description": "Este endpoint maneja toda la información relacionada con la información de los Usuarios del Sistema."
      },
      {
        "name": "Reports",
        "description": "Este endpoint maneja toda la información relacionada con la información de los Reportes Viales."
      },
      {
        "name": "Admin",
        "description": "Este endpoint maneja toda la información relacionada con la información de los Administradores y como ellos logran visualizar los reportes."
      }
    ],
    "paths": {
      "/user/register": {
        "post": {
          "tags": [
            "Users"
          ],
          "summary": "Registra la información de un usuario en la Base de Datos.",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyUsersRegistroPost"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) El registro se realizo con exito.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoUsersRegistroPost"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/user/login": {
        "post": {
          "tags": [
            "Users"
          ],
          "summary": "Loguea al usuario si se encuentra en la Base de Datos y crea un token.",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyClientesLoginPost"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) El Logueo se realizo con exito.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoClientesLoginPost"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/user/recover-password": {
        "post": {
          "tags": [
            "Users"
          ],
          "summary": "Permite al usuario Logueado recuperar su contraseña.",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyRecuperarPasswordPost"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Revisa tu correo electrónico para reestablecer tu cuenta.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoRecuperarPasswordPost"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/user/recover-password/{token}": {
        "get": {
          "tags": [
            "Users"
          ],
          "summary": "Permite validar el token enviado por el usuario al correo para restablecer su contraseña.",
          "parameters": [
            {
              "$ref": "#/components/parameters/jwttoken"
            }
          ],
          "responses": {
            "200": {
              "description": "(OK) Token confirmado, ya puedes crear tu nuevo password.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ConfirmarTokenCrearPasswordPost"
                  }
                }
              }
            },
            "404": {
              "$ref": "#/components/responses/NotValidation"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/user/new-password/{token}": {
        "post": {
          "tags": [
            "Users"
          ],
          "summary": "Permite crear una nueva contraseña y almacenarla en la base de datos.",
          "parameters": [
            {
              "$ref": "#/components/parameters/jwttoken"
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyNuevaPasswordPost"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Felicitaciones, ya puedes iniciar sesión con tu nuevo password",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NuevaPasswordGeneradaPost"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "404": {
              "$ref": "#/components/responses/NotValidation"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/user/actualizarpassword": {
        "put": {
          "tags": [
            "Users"
          ],
          "summary": "Permite al usuario Logueado actualizar la contraseña.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyActualizarPasswordPut"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Password Actualizada correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoActualizarPasswordPut"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "404": {
              "$ref": "#/components/responses/NoMatch"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/user/{id}": {
        "put": {
          "tags": [
            "Users"
          ],
          "summary": "Permite al usuario Logueado actualizar su perfil.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Identificador del Usuario a actualizar el perfil.",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyActualizarPerfilUserPut"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Perfil Actualizado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoActualizarPerfilUserPut"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        },
        "get": {
          "tags": [
            "Users"
          ],
          "summary": "Permite al usuario visualizar su perfil.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Identificador del Usuario a visualizar el perfil.",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "(OK) Perfil del usuario.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoDetallePerfilUserGet"
                  }
                }
              }
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/user/detalle/{id}": {
        "get": {
          "tags": [
            "Users"
          ],
          "summary": "Permite al usuario conocer todos sus Reportes.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Identificador del Usuario a obtener los reportes.",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "(OK) Reportes del Usuario",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoDetalleReportesUserGet"
                  }
                }
              }
            },
            "404": {
              "$ref": "#/components/responses/NotValidation"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/reporte/registro": {
        "post": {
          "tags": [
            "Reports"
          ],
          "summary": "Permite generar un reporte al usuario.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyNuevoReportePost"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Registro Realizado con exito.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoRegistroReporteUsuarioPost"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/reporte/{id}": {
        "get": {
          "tags": [
            "Reports"
          ],
          "summary": "Permite obtener uno de los Reportes en especifico que se encuentra en la Base de Datos.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Identificador del Reporte a obtener .",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "(OK) Registro Realizado con exito.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoObtencionReporteUsuarioGet"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        },
        "put": {
          "tags": [
            "Reports"
          ],
          "summary": "Permite actualizar un reporte y registralo en la Base de Datos.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Identificador del Reporte a actualizar.",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyActualizarReportePut"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Actualizacion realizada con exito.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoActualizacionReportesPut"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "404": {
              "$ref": "#/components/responses/NotValidation"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        },
        "delete": {
          "tags": [
            "Reports"
          ],
          "summary": "Permite eliminar un reporte en especifico de la Base de Datos.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Identificador del Reporte a actualizar.",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "(OK) Reporte eliminado con exito.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoEliminarReporteDelete"
                  }
                }
              }
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/reportes": {
        "get": {
          "tags": [
            "Reports"
          ],
          "summary": "Permite obtener todos los Reportes",
          "responses": {
            "200": {
              "description": "(OK) Consulta Realizada con exito.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoObtencionReportesAdministradorGet"
                  }
                }
              }
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/reporte/actualizacionestado/{id}": {
        "put": {
          "tags": [
            "Reports"
          ],
          "summary": "Permite actualizar un reporte y registralo en la Base de Datos pasando el token del Administrador.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Identificador del Reporte a actualizar estado.",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyActualizarEstadoReportePut"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Actualizacion de situacion realizada correctamente."
            },
            "404": {
              "$ref": "#/components/responses/NotValidation"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/admin/register": {
        "post": {
          "tags": [
            "Admin"
          ],
          "summary": "Registra la información de un administrador en la Base de Datos.",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyAdminRegistroPost"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) El registro se realizo con exito.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoAdminRegistroPost"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/admin/login": {
        "post": {
          "tags": [
            "Admin"
          ],
          "summary": "Loguea al Administrador si se encuentra en la Base de Datos y crea un token.",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyAdminLoginPost"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) El Logueo se realizo con exito.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoAdminLoginPost"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/admin/recover-password": {
        "post": {
          "tags": [
            "Admin"
          ],
          "summary": "Permite al Administrador Logueado recuperar su contraseña.",
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyRecuperarPasswordAdminPost"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Revisa tu correo electrónico para reestablecer tu cuenta.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoRecuperarPasswordPost"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/admin/recover-password/{token}": {
        "get": {
          "tags": [
            "Admin"
          ],
          "summary": "Permite validar el token enviado por el Administrador al correo para restablecer su contraseña.",
          "parameters": [
            {
              "$ref": "#/components/parameters/jwttoken"
            }
          ],
          "responses": {
            "200": {
              "description": "(OK) Token confirmado, ya puedes crear tu nuevo password.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ConfirmarTokenCrearPasswordPost"
                  }
                }
              }
            },
            "404": {
              "$ref": "#/components/responses/NotValidation"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/admin/new-password/{token}": {
        "post": {
          "tags": [
            "Admin"
          ],
          "summary": "Permite crear una nueva contraseña y almacenarla en la base de datos.",
          "parameters": [
            {
              "$ref": "#/components/parameters/jwttoken"
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyNuevaPasswordPost"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Felicitaciones, ya puedes iniciar sesión con tu nuevo password",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NuevaPasswordGeneradaPost"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "404": {
              "$ref": "#/components/responses/NotValidation"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/admin/actualizarpassword": {
        "put": {
          "tags": [
            "Admin"
          ],
          "summary": "Permite al Administrador Logueado actualizar la contraseña.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyActualizarPasswordPut"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Password Actualizada correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoActualizarPasswordPut"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "404": {
              "$ref": "#/components/responses/NoMatch"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      },
      "/admin/{id}": {
        "put": {
          "tags": [
            "Admin"
          ],
          "summary": "Permite al Administrador Logueado actualizar su perfil.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Identificador del Administrador a actualizar el perfil.",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BodyActualizarPerfilAdminPut"
                }
              }
            },
            "required": true
          },
          "responses": {
            "200": {
              "description": "(OK) Perfil Actualizado correctamente.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoActualizarPerfilUserPut"
                  }
                }
              }
            },
            "400": {
              "$ref": "#/components/responses/BadRequest"
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        },
        "get": {
          "tags": [
            "Admin"
          ],
          "summary": "Permite al Administrador visualizar su perfil.",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "Identificador del Administrador a visualizar el perfil.",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "(OK) Perfil del usuario.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ExitoDetallePerfilAdminGet"
                  }
                }
              }
            },
            "404": {
              "$ref": "#/components/responses/NotFound"
            },
            "500": {
              "$ref": "#/components/responses/ServerError"
            }
          }
        }
      }
    },
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT"
        }
      },
      "parameters": {
        "jwttoken": {
          "name": "token",
          "in": "path",
          "description": "JWT de autenticación requerido.",
          "required": true,
          "schema": {
            "type": "string",
            "example": "JsonWebToken"
          }
        }
      },
      "responses": {
        "NotFound": {
          "description": "(NotFound) no se encontro la información."
        },
        "NotValidation": {
          "description": "(NotValidation) Lo sentimos, no se puede validar los datos ingresados usuario, cuenta o ID."
        },
        "NoMatch": {
          "description": "(NoMatch) La contraseñas no coinciden."
        },
        "BadRequest": {
          "description": "(BadRequest) Lo sentimos, debes llenar todos los campos."
        },
        "ServerError": {
          "description": "Error en el servidor."
        }
      },
      "schemas": {
        "BodyUsersRegistroPost": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Nombre del usuario para registro."
            },
            "lastname": {
              "type": "string",
              "description": "Apellido del usuario para registro."
            },
            "telefono": {
              "type": "number",
              "description": "Numero de telefono del usuario para registro."
            },
            "email": {
              "type": "string",
              "description": "Email del usuario para registro."
            },
            "password": {
              "type": "string",
              "description": "Contraseña del usuario."
            }
          }
        },
        "BodyAdminRegistroPost": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Nombre del usuario para registro."
            },
            "lastname": {
              "type": "string",
              "description": "Apellido del usuario para registro."
            },
            "telefono": {
              "type": "number",
              "description": "Numero de telefono del usuario para registro."
            },
            "email": {
              "type": "string",
              "description": "Email del usuario para registro."
            },
            "password": {
              "type": "string",
              "description": "Contraseña del usuario."
            }
          }
        },
        "ExitoUsersRegistroPost": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Revisa tu correo electrónico para verificar tu cuenta."
            }
          }
        },
        "ExitoAdminRegistroPost": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Revisa tu correo electronico de administrador para verificar tu cuenta."
            }
          }
        },
        "BodyClientesLoginPost": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "Email del usuario para Login."
            },
            "password": {
              "type": "string",
              "description": "Contraseña del usuario para Login."
            }
          }
        },
        "BodyAdminLoginPost": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "Email del usuario para Login."
            },
            "password": {
              "type": "string",
              "description": "Contraseña del usuario para Login."
            }
          }
        },
        "BodyRecuperarPasswordPost": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "Email del usuario registrado a recuperar password."
            }
          }
        },
        "BodyRecuperarPasswordAdminPost": {
          "type": "object",
          "properties": {
            "email": {
              "type": "string",
              "description": "Email del Administrador registrado a recuperar password."
            }
          }
        },
        "BodyNuevaPasswordPost": {
          "type": "object",
          "properties": {
            "password": {
              "type": "string",
              "description": "Password Nueva."
            },
            "confirmpassword": {
              "type": "string",
              "description": "Confrimar Password Nueva"
            }
          }
        },
        "BodyActualizarPasswordPut": {
          "type": "object",
          "properties": {
            "passwordactual": {
              "type": "string",
              "description": "Password Actual."
            },
            "passwordnuevo": {
              "type": "string",
              "description": "Password Nueva"
            }
          }
        },
        "BodyActualizarPerfilUserPut": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Password Actual del usuario."
            },
            "lastname": {
              "type": "string",
              "description": "Password Nueva del usuario"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "Password Nueva del usuario"
            }
          }
        },
        "BodyActualizarPerfilAdminPut": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "description": "Password Actual del administrador."
            },
            "lastname": {
              "type": "string",
              "description": "Password Nueva del administrador"
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "Password Nueva del administrador"
            }
          }
        },
        "BodyNuevoReportePost": {
          "type": "object",
          "properties": {
            "ubicacion": {
              "type": "string",
              "description": "Ubicacion de donde es la novedad presentada."
            },
            "descripcion": {
              "type": "string",
              "description": "Descripcion detallada de la novedad presentada"
            },
            "usuario": {
              "type": "string",
              "description": "Id del usuario al que va vinculado el reporte."
            }
          }
        },
        "BodyActualizarReportePut": {
          "type": "object",
          "properties": {
            "ubicacion": {
              "type": "string",
              "description": "Ubicacion de donde es la novedad presentada."
            },
            "descripcion": {
              "type": "string",
              "description": "Descripcion detallada de la novedad presentada"
            },
            "situacion": {
              "type": "string",
              "description": "Situacion actual reporte."
            }
          }
        },
        "BodyActualizarEstadoReportePut": {
          "type": "object",
          "properties": {
            "situacion": {
              "type": "string",
              "description": "Situacion actualizada del reporte."
            }
          }
        },
        "ExitoClientesLoginPost": {
          "type": "object",
          "properties": {
            "token": {
              "type": "string",
              "description": "Token de autenticación generado."
            },
            "name": {
              "type": "string",
              "description": "Nombre del usuario logueado."
            },
            "lastname": {
              "type": "string",
              "description": "Apellido del usuario logueado."
            },
            "telefono": {
              "type": "number",
              "description": "Telefono del usuario logueado"
            },
            "id": {
              "type": "string",
              "description": "ID del cliente."
            }
          }
        },
        "ExitoAdminLoginPost": {
          "type": "object",
          "properties": {
            "token": {
              "type": "string",
              "description": "Token de autenticación generado."
            },
            "name": {
              "type": "string",
              "description": "Nombre del usuario logueado."
            },
            "lastname": {
              "type": "string",
              "description": "Apellido del usuario logueado."
            },
            "_id": {
              "type": "string",
              "description": "ID del cliente."
            },
            "email": {
              "type": "string",
              "format": "email",
              "description": "Telefono del usuario logueado"
            }
          }
        },
        "ExitoDetallePerfilUserGet": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "object",
              "properties": {
                "_id": {
                  "type": "string",
                  "description": "ID del usuario."
                },
                "name": {
                  "type": "string",
                  "description": "Nombre del usuario."
                },
                "lastname": {
                  "type": "string",
                  "description": "Apellido del usuario."
                },
                "telefono": {
                  "type": "number",
                  "description": "Telefono del usuario"
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "ID del cliente."
                },
                "status": {
                  "type": "boolean",
                  "description": "Estado del usuario"
                },
                "token": {
                  "type": "string",
                  "description": "Estado del Token"
                },
                "confirmEmail": {
                  "type": "string",
                  "description": "Si el token ya fue confirmado"
                },
                "reporte": {
                  "type": "array",
                  "description": "Reportes del usuario"
                },
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Datos de creacion del usuario"
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Datos de ultima actualizacion del usuario"
                },
                "__v": {
                  "type": "number",
                  "description": "Valor 0"
                }
              }
            }
          }
        },
        "ExitoDetallePerfilAdminGet": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "object",
              "properties": {
                "_id": {
                  "type": "string",
                  "description": "ID del usuario."
                },
                "name": {
                  "type": "string",
                  "description": "Nombre del usuario."
                },
                "lastname": {
                  "type": "string",
                  "description": "Apellido del usuario."
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "ID del cliente."
                },
                "status": {
                  "type": "boolean",
                  "description": "Estado del usuario"
                },
                "token": {
                  "type": "string",
                  "description": "Estado del Token"
                },
                "confirmEmail": {
                  "type": "string",
                  "description": "Si el token ya fue confirmado"
                },
                "reporte": {
                  "type": "array",
                  "description": "Reportes del usuario"
                },
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Datos de creacion del usuario"
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Datos de ultima actualizacion del usuario"
                },
                "__v": {
                  "type": "number",
                  "description": "Valor 0"
                }
              }
            }
          }
        },
        "ExitoRecuperarPasswordPost": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Revisa tu correo electrónico para reestablecer tu cuenta"
            }
          }
        },
        "ConfirmarTokenCrearPasswordPost": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Token confirmado, ya puedes crear tu nuevo password"
            }
          }
        },
        "ExitoDetalleReportesUserGet": {
          "type": "object",
          "properties": {
            "Users": {
              "type": "object",
              "properties": {
                "_id": {
                  "type": "string",
                  "description": "Id del usuario."
                },
                "name": {
                  "type": "string",
                  "description": "Nombre del usuario."
                },
                "lastname": {
                  "type": "string",
                  "description": "Apellido del usuario."
                },
                "telefono": {
                  "type": "string",
                  "description": "Telefono del usuario."
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "Email del usuario."
                }
              }
            },
            "reports": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "_id": {
                    "type": "string",
                    "description": "Id del reporte."
                  },
                  "ubicacion": {
                    "type": "string",
                    "description": "Direccion del reporte."
                  },
                  "descripcion": {
                    "type": "string",
                    "description": "Descripcion del reporte."
                  },
                  "situacion": {
                    "type": "string",
                    "description": "Situacion del Reporte."
                  },
                  "status": {
                    "type": "boolean",
                    "description": "Estado del Reporte."
                  },
                  "usuario": {
                    "type": "string",
                    "description": "ID del usuario."
                  }
                }
              }
            }
          }
        },
        "ExitoActualizarPasswordPut": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Password actualizado correctamente"
            }
          }
        },
        "ExitoActualizarPerfilUserPut": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Perfil actualizado correctamente"
            }
          }
        },
        "NuevaPasswordGeneradaPost": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Felicitaciones, ya puedes iniciar sesión con tu nuevo password"
            }
          }
        },
        "ExitoObtencionReporteUsuarioGet": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "description": "ID del reporte."
            },
            "ubicacion": {
              "type": "string",
              "description": "Dirección del reporte."
            },
            "descripcion": {
              "type": "string",
              "description": "Descripcion del reporte."
            },
            "situacion": {
              "type": "string",
              "description": "Situacion en la que se encuentra el reporte."
            },
            "usuario": {
              "type": "object",
              "properties": {
                "_id": {
                  "type": "string",
                  "description": "Id del usuario que genero el reporte."
                },
                "name": {
                  "type": "string",
                  "description": "Nombre del usuario que genero el reporte."
                },
                "lastname": {
                  "type": "string",
                  "description": "Apellido del usuario que genero el reporte."
                },
                "telefono": {
                  "type": "string",
                  "description": "Telefono del usuario que genero el reporte."
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "Email del usuario que genero el reporte."
                }
              }
            }
          }
        },
        "ExitoObtencionReportesAdministradorGet": {
          "type": "object",
          "properties": {
            "administrador": {
              "type": "object",
              "properties": {
                "_id": {
                  "type": "string",
                  "description": "ID del administrador que realizo la consulta."
                },
                "name": {
                  "type": "string",
                  "description": "Nombre del administrador que realizo la consulta."
                },
                "lastname": {
                  "type": "string",
                  "description": "Apellido del administrador que realizo la consulta."
                },
                "email": {
                  "type": "string",
                  "format": "email",
                  "description": "Email del administrador que realizo la consulta."
                }
              }
            },
            "reports": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "_id": {
                    "type": "string",
                    "description": "ID del reporte."
                  },
                  "ubicacion": {
                    "type": "string",
                    "description": "Dirección del reporte."
                  },
                  "descripcion": {
                    "type": "string",
                    "description": "Descripcion del reporte."
                  },
                  "situacion": {
                    "type": "string",
                    "description": "Situacion en la que se encuentra el reporte."
                  },
                  "status": {
                    "type": "boolean",
                    "description": "Estado en el que se encuentra el reporte."
                  },
                  "usuario": {
                    "type": "string",
                    "description": "ID del usuario al que le pertenece el reporte."
                  }
                }
              }
            }
          }
        },
        "ExitoRegistroReporteUsuarioPost": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Mensaje de registro exitoso."
            },
            "reportedatos": {
              "type": "object",
              "properties": {
                "ubicacion": {
                  "type": "string",
                  "description": "Ubicacion del reporte"
                },
                "descripcion": {
                  "type": "string",
                  "description": "Descripcion del reporte"
                },
                "situacion": {
                  "type": "string",
                  "description": "Situacion del reporte si ya avanzo o no"
                },
                "status": {
                  "type": "boolean",
                  "description": "Estado del Reporte"
                },
                "usuario": {
                  "type": "string",
                  "description": "Usuario dueño del reporte"
                },
                "id": {
                  "type": "string",
                  "description": "id del reporte"
                },
                "createdAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Fecha de creación del reporte"
                },
                "updatedAt": {
                  "type": "string",
                  "format": "date-time",
                  "description": "Fecha de actualizacion del reporte"
                },
                "__v": {
                  "type": "number",
                  "description": "valor"
                }

              }
            }
          }
        },
        "ExitoCreacionReclamosPost": {
          "type": "object",
          "properties": {
            "id": {
              "type": "string",
              "description": "ID del reclamo."
            },
            "direccion": {
              "type": "string",
              "description": "Dirección del reclamo."
            },
            "descripcion": {
              "type": "string",
              "description": "Descripcion del reclamo."
            },
            "fecha": {
              "type": "string",
              "format": "date",
              "description": "Fecha y Hora del reclamo."
            },
            "imagen": {
              "type": "string",
              "description": "Imagen referente al reclamo."
            },
            "public_id": {
              "type": "string",
              "description": "Id de la imagen."
            }
          }
        },
        "ExitoActualizacionReportesPut": {
          "type": "object",
          "properties": {
            "msg": {
              "type": "string",
              "description": "Mensaje de actualizacion exitosa."
            },
            "reporte": {
              "type": "object",
              "properties": {
                "id": {
                  "type": "string",
                  "description": "id del reporte"
                },
                "ubicacion": {
                  "type": "string",
                  "description": "Ubicacion del reporte"
                },
                "descripcion": {
                  "type": "string",
                  "description": "Descripcion del reporte"
                },
                "situacion": {
                  "type": "string",
                  "description": "Situacion del reporte si ya avanzo o no"
                },
                "usuario": {
                  "type": "string",
                  "description": "Usuario dueño del reporte"
                }
              }
            }
          }
        },
        "ExitoEliminarReporteDelete": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "description": "Reporte eliminado con exito."
            }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"], // Ruta a los archivos donde se definen las rutas y controladores
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/SourceCraft/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/SourceCraft/docs.json", (req, res) => {
    res.setHeader("Content-type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(`Version 1 docs | port: ${port}`);
};

const V1SwaggerDocs = swaggerDocs;

export { swaggerDocs, V1SwaggerDocs, swaggerSpec }; // Exportar swaggerSpec
