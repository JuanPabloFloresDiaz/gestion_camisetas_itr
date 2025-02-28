# Explicación de cada capa de la api.

## domain: Contiene las entidades principales y los repositorios de dominio.
- model: Clases que representan las entidades del dominio, como Pedido y Camisa.
- repository: Interfaces que definen los métodos de acceso a datos para las entidades.
- common: Contiene código compartido y utilidades que son usadas en múltiples partes de la aplicación.

## application: Maneja la lógica de negocio y los casos de uso.
- service: Clases que implementan la lógica de negocio, como PedidoService.
- dto: Objetos de transferencia de datos que se utilizan para comunicar datos entre capas.

## infrastructure: Implementaciones técnicas y detalles de infraestructura.
- persistence: Implementaciones de los repositorios utilizando JPA/Hibernate.
- configuration: Clases de configuración, como SecurityConfig para la seguridad.
- email: Servicios relacionados con el envío de correos electrónicos.
- audit: Maneja la auditoría y el registro de eventos importantes, asegurando que las acciones críticas sean rastreables y revisables.

## api: Controladores que manejan las solicitudes HTTP y exponen la API RESTful.
- controller: Clases como PedidoController que manejan las solicitudes y respuestas HTTP.