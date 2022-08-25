# Módulo 1. Modelado

El modelo contiene dos colecciones:
- **Courses**

| Key | Description |
| ----------- | ----------- |
| id | Identificador del curso |
| name | Nombre del curso |
| description | Pequeña descripción del contenido del curso |
| theme | Tema en el que se engloba el curso ("Frontend", "DevOps", "Backend", "Otros") |
| authors | Lista de los objectIds de los autores del curso |
| lessons | Lista de lecciones del curso |

El primer patrón que vamos a utilizar es el **extended ref**. Creamos un documento con el contenido de cada **lección** y lo anidamos dentro de la colección de cursos. Esto es con el objetivo de evitar hacer demasiados joins en las búsquedas de todas las lecciones que forman parte de un curso. Además, como la información de cada lección no se prevee que cambie demasiado, podemos tener datos duplicados en todas las colecciones sin temor a que no se actualicen los datos cuando hay un cambio en los mismos.

Otro patrón aplicado en esta colección sería el patrón **polymorphic** para las temáticas de los cursos, ya que son las características comunes de todos los cursos, facilitando así las futuras consultas.

- **Lección**

| Key | Description |
| ----------- | ----------- |
| id | Identificador de la lección |
| name | Nombre de la lección |
| author | Autor de la lección |
| theme | Tema en el que se englobal la lección ("Frontend", "DevOps", "Backend", "Otros") |
| guid_video | GUID del video correspondiente a la lección |
| guid_article | GUID del artículo correspondiente al artículo |

- **Autores**

| Key | Description |
| ----------- | ----------- |
| id | Identificador del autor |
| name | Nombre del autor |
| author | Autor de la lección |
| biography | Biografía del autor |
| lessons | Lecciones impartidas por el autor |

Colección independiente ya que se tiene previsto que la página de información del autor no sea muy visitada. Por lo tanto, estaremos aplicando el patrón **extended ref**. Al igual que en el caso de las lecciones con respecto a los cursos, queremos incluir en los cursos sólo el nombre los autores, dejando el resto de información dentro del documento de autores.

- **Categorías**

| Key | Description |
| ----------- | ----------- |
| id | Identificador de la categoría |
| name | Nombre de la categoría |

Colección independiente en la que almacenamos el nombre de la categoría y que tiene una relación uno (categoría) a muchos (cursos) con respecto a la colección de cursos.