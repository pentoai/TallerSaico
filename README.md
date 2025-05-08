# 🧠 Taller de Programación con IA

Este proyecto contiene una API REST básica desarrollada con ASP.NET Core, pensada para ser extendida mediante tareas de complejidad creciente. 
Durante el taller, los participantes utilizarán herramientas de inteligencia artificial como **GitHub Copilot** para implementar nuevas funcionalidades 
y experimentar cómo la IA puede asistir en el desarrollo de software.

---

## 🚀 API Base

La API gestiona un inventario de productos. Cada producto tiene los siguientes campos:

- `id`: Identificador único (int)
- `name`: Nombre del producto (string)
- `description`: Descripción (string)
- `price`: Precio (decimal)
- `quantity`: Cantidad en stock (int)

### Endpoints disponibles:
- `GET /products`: Lista todos los productos
- `GET /products/{id}`: Obtiene un producto por ID
- `POST /products`: Crea un nuevo producto
- `PUT /products/{id}`: Actualiza un producto existente
- `DELETE /products/{id}`: Elimina un producto

La API utiliza una lista en memoria como almacenamiento temporal.

---

## 🎯 Tareas del Taller

Los participantes podrán elegir cualquiera de las siguientes tareas, dependiendo de su nivel de experiencia con C# y desarrollo backend. 
Todas están diseñadas para ser resueltas con el apoyo de GitHub Copilot.

---

### 🟢 Tarea 1: Búsqueda de Productos

**Objetivo:**  
Agregar un nuevo endpoint:  
`GET /products/search?query=...`  
Este endpoint debe devolver todos los productos cuyo nombre o descripción contenga el texto de búsqueda.

**Temas a trabajar:**  
- Filtrado de listas
- Manejo de parámetros en query
- Buenas prácticas básicas en endpoints REST

---

### 🟡 Tarea 2: Validación y Manejo de Errores

**Objetivo:**  
Agregar validaciones a los modelos y mejorar las respuestas de error:
- Validar que `name` no sea vacío, `price` > 0, y `quantity` ≥ 0
- Asegurar que la API devuelva errores 400 cuando los datos sean inválidos y 404 cuando el recurso no exista

**Temas a trabajar:**  
- Data Annotations (`[Required]`, `[Range]`, etc.)
- Validación de `ModelState`
- Buenas prácticas para respuestas HTTP

---

### 🔴 Tarea 3: Motor de Descuentos

**Objetivo:**  
Agregar un nuevo endpoint:  
`POST /products/{id}/apply-discount`  
El cuerpo del request debe incluir información como:

```json
{
  "customerType": "premium",
  "season": "summer"
}
```

El endpoint debe aplicar reglas de negocio para calcular descuentos en función del tipo de cliente y la temporada:
- Si el cliente es **premium** se debe realizar un 10% de descuento sobre el precio original
- Si la temporada es **summer** se debe realizar un 5% de descuento sobre el precio original
- Los descuentos son acumulables (pueden haber clientes **premium** comprando en verano).

**Temas a trabajar:**  
- Lógica de negocio condicional
- Transformación de modelos
- Abstracción y patrones (opcional: patrón Strategy para lógica de descuentos)
