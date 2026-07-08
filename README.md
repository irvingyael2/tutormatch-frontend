# 🎓 TutorMatch - Frontend

TutorMatch es una plataforma web orientada a conectar a la comunidad estudiantil de la Universidad Tecnológica de Querétaro. Permite a los alumnos solicitar apoyo académico y a los estudiantes capacitados ofrecer sesiones como tutores.

Este repositorio contiene la Single Page Application (SPA) construida con Angular, la cual interactúa con un ecosistema de microservicios en Spring Boot a través de un API Gateway.

## Tecnologías y Arquitectura

- **Framework:** Angular 18/19 (Standalone Components, sin SSR para compatibilidad con OIDC).
- **Seguridad:** OAuth2 con flujo PKCE (Proof Key for Code Exchange).
- **Gestión de Identidad:** Integración directa con Spring Authorization Server mediante la librería `angular-oauth2-oidc`.
- **Estilos:** CSS3 puro con variables globales y diseño responsivo.

## Estructura del Proyecto

El código fuente principal se encuentra en la carpeta `src/app/`, organizado bajo los siguientes estándares:

- `/core`: Contiene el corazón de la aplicación.
  - `/guards`: Guardianes de rutas asíncronos (`auth.guard.ts`, `public.guard.ts`) que protegen las vistas.
  - `/services`: Servicios inyectables, destacando `auth.service.ts` para la orquestación de tokens y decodificación JWT.
  - `auth.config.ts`: Mapeo de conexión con el Auth Server.
- `/pages`: Componentes principales de las vistas.
  - `/landing`: Página pública de presentación.
  - `/layout`: Cascarón dinámico (NavBar) que reacciona a los roles del usuario (Alumno, Tutor, Admin).
  - `/home`: Panel de control principal.

## Requisitos Previos

Para ejecutar este proyecto en tu entorno local, necesitas tener instalado:

- [Node.js](https://nodejs.org/) (Versión LTS recomendada).
- [Angular CLI](https://angular.dev/tools/cli).
- El ecosistema Backend de TutorMatch (Eureka, Auth Server y API Gateway) corriendo localmente.

## Flujo de Seguridad

Este frontend no almacena contraseñas ni gestiona bases de datos. Delega toda la autenticación al Auth Server.

- Al intentar ingresar a una ruta protegida, el public.guard redirige al usuario.

- La librería genera un code_challenge y lanza al usuario al login de Spring.

- Tras un login exitoso, Angular intercepta el code en la URL, lo canjea por un Access Token (JWT) y lo adjunta automáticamente (vía Interceptor) a todas las peticiones dirigidas al API Gateway (http://localhost:8080/api/).