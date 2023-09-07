# tarea_onesta: API Simple de Agricultura

Esta API proporciona varios CRUDs que representan diferentes entidades relacionadas con la agricultura, como frutas, variedades, agricultores y campos.

## Características Principales

- **Modelado de Datos:** Las entidades han sido modeladas siguiendo la forma normal Boyce-Codd (BCNF). Puedes encontrar el esquema en [`src/models/initDB.ts`](src/models/initDB.ts).
  
- **Consultas SQL:** Aunque las consultas SQL se han realizado sin considerar el riesgo de inyección SQL, este aspecto se consideró fuera del alcance de este proyecto. En un escenario real, se recomendaría el uso de un ORM.

- **Lógica de Operaciones:** La lógica está organizada según las operaciones necesarias para cada modelo.

- **Documentación en Swagger:** Se proporciona una documentación en Swagger para consultar y probar los distintos endpoints. Esto facilita la prueba de los endpoints de manera individual en lugar de cargar directamente un archivo CSV.

- **Validación de Esquema:** Al realizar solicitudes HTTP, se valida el esquema utilizando la librería JOI. Sin embargo, al cargar un archivo CSV internamente, no se realizan las mismas validaciones ya que no son solicitudes HTTP y podría haber un tratamiento previo al CSV.

## Contacto

Si tienes alguna duda o comentario, no dudes en preguntarme!
dlcollao@uc.cl
**Diego Collao**
