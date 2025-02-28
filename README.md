# gestion_camisetas_itr
Este repositorio contendra las aplicaciones de el sistema de gestión de venta de camisetas.

## Introducción al Sistema de Gestión de Venta de Camisetas
En el mundo actual, la eficiencia y seguridad en la administración de negocios en línea son factores clave para su éxito. Con este objetivo en mente, se ha desarrollado un Sistema de Gestión de Venta de Camisetas, una plataforma diseñada específicamente para optimizar la administración de productos, clientes y pedidos dentro de una tienda de ropa.

## Objetivo del Sistema
Este sistema está dirigido principalmente a la gestión interna de la tienda, permitiendo a los administradores llevar un control eficiente sobre:
- El registro y gestión de clientes.
- La catalogación de productos, incluyendo diferentes tipos y tallas de camisetas.
- La gestión de pedidos y su seguimiento.
- El envío de notificaciones por correo a los clientes sobre el estado de sus pedidos.
- La generación de reportes clave para la toma de decisiones.
- Inicialmente, el sistema no incluirá la tienda en línea para clientes, sino que se enfocará en proporcionar una plataforma administrativa robusta y escalable.

## Requerimientos Principales
# El sistema permitirá:
✅ Inicio de sesión seguro para administradores.
✅ Registro de clientes y almacenamiento de sus datos.
✅ Administración de productos (tipos de camisetas y camisetas disponibles).
✅ Registro y procesamiento de pedidos, incluyendo la asignación de camisetas y tallas.
✅ Generación automática de reportes sobre:
- Pedidos realizados por cliente.
- Pedidos organizados por talla de camiseta.
- Reportes de pedidos enviados automáticamente a los clientes por correo electrónico.
✅ Notificación de pedidos vía email, permitiendo que el cliente elija un correo alternativo si lo desea.
Diseño y Tecnologías
Para garantizar un sistema moderno, rápido y seguro, se ha optado por tecnologías eficientes y escalables tanto en el backend como en el frontend.

Backend (Administración de datos y lógica de negocio)
📌 Lenguaje: Java 21 con Spring Boot
📌 Arquitectura: Hexagonal, asegurando modularidad y mantenibilidad
📌 Tecnologías clave:

- Spring Security (para autenticación y seguridad)
- Spring Web (para servicios REST)
- Lombok (para optimizar el código)
- Jasper Reports (para generación de reportes en PDF)
- Java Mail (para envío de correos electrónicos)
Base de Datos
📌 MariaDB se usará en el desarrollo inicial por su facilidad de manejo con scripts SQL.
📌 PostgreSQL o MySQL serán las opciones para producción según los requerimientos del servidor.

Frontend (Interfaz de administración)
📌 Framework: Next.js con TypeScript
📌 Librería UI: ShadCN para un diseño limpio y moderno
📌 Manejo de datos:
- Axios + TanStack Query (React Query) para gestión eficiente del caché y solicitudes
- FormData para manejo de archivos
- JSON para solicitudes estándar
📌 Administrador de paquetes: PNPM
## Motivación y Beneficios
Este nuevo sistema surge como una solución para reemplazar un sistema previo basado en PHP y Vanilla.js, el cual presentaba problemas de rendimiento y seguridad. Con la adopción de tecnologías modernas y una arquitectura mejor estructurada, el nuevo sistema garantizará:
✅ Mayor velocidad de respuesta en operaciones CRUD.
✅ Mejor seguridad en autenticación y gestión de datos.
✅ Manejo eficiente de peticiones y caché.
✅ Automatización de reportes y notificaciones.

Con esta base sólida, el sistema podrá evolucionar en el futuro para incluir una tienda en línea completa, integrando aún más funciones que mejoren la experiencia tanto de los administradores como de los clientes.