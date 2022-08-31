# General

En este base de datos puedes encontrar un montón de apartamentos y sus reviews, esto está sacado de hacer webscrapping.

**Pregunta**: Si montaras un sitio real, ¿qué posibles problemas pontenciales le ves a cómo está almacenada la información?

**Repuesta**: El principal problema es que al tener toda la información en el mismo documento, se va a cargar en el working set todo y esto nos generará un problema de rendimiento.


# Consultas

## Basico

- Saca en una consulta cuántos apartamentos hay en España.

```
use('airbnb');

db.listingsAndReviews.count({"address.country": "Spain"});
```
- Lista los 10 primeros:
    - Sólo muestra: nombre, camas, precio, government_area
    - Ordenados por precio.

```
use('airbnb');

db.listingsAndReviews
.find(
  {"address.country": "Spain"}, 
  { name: 1, beds: 1, price: 1, 'address.government_area': 1 })
.sort( { "price": 1 } )
.limit(10);
```

## Filtrando
- Queremos viajar cómodos, somos 4 personas y queremos:
    - 4 camas.
    - Dos cuartos de baño.

```
use('airbnb');

db.listingsAndReviews.find(
  {
    beds: 4, bathrooms: 2
  },
  { 
    beds: 1, bathrooms: 1
  }
)
```

- Al requisito anterior, hay que añadir que nos gusta la tecnología queremos que el apartamento tenga wifi.

```
use('airbnb');

db.listingsAndReviews.find(
  {
    beds: 4, 
    bathrooms: 2,
    amenities: "Wifi"
  },
  { beds: 1, bathrooms: 1, amenities: 1}
)
```

- Y bueno, un amigo se ha unido que trae un perro, así que a la query anterior tenemos que buscar que permitan mascota Pets Allowed
```
use('airbnb');

db.listingsAndReviews.find(
  {
    beds: 4, 
    bathrooms: 2,
    amenities: { $all: ["Wifi", "Pets allowed"]}
  },
  { beds: 1, bathrooms: 1, amenities: 1}
)
```

## Operadores lógicos
- Estamos entre ir a Barcelona o a Portugal, los dos destinos nos valen, peeero... queremos que el precio nos salga baratito (50 $), y que tenga buen rating de reviews
```
use('airbnb');

db.listingsAndReviews.find(
  { 
    $or: [
      { "address.country": "Portugal" },
      { "address.market": "Barcelona" },
    ],
    price: {$lte: 50},
    "review_scores.review_scores_rating": {$gte: 75}
  },
  { price: 1, "review_scores.review_scores_rating": 1, address: 1}
)
```

## Agregaciones
- Queremos mostrar los pisos que hay en España, y los siguiente campos:
    - Nombre.
    - De que ciudad (no queremos mostrar un objeto, solo el string con la ciudad)
    - El precio
```
use('airbnb');

db.listingsAndReviews.aggregate([
  { 
    $match: {
      "address.country": "Spain"
    }
  },
  {
    $project: {
      name: 1, city: "$address.market", price: 1
    }
  }
])
```

- Queremos saber cuántos alojamientos hay disponibles por país.
```
use('airbnb');

db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: "$address.country",
      nalojamientos: {
        $sum: 1
      }
    }
  }
])
```

# Opcional
- Queremos saber el precio medio de alquiler de airbnb en España.
```
use('airbnb');

db.listingsAndReviews.aggregate([
  {
    $match: {
      "address.country": "Spain"
    }
  },
  {
    $group: {
      _id: null,
      averagePrice: {
        $avg: "$price"
      }
    }
  }
])
```

- ¿Y si quisiéramos hacer como el anterior, pero sacarlo por paises?
```
use('airbnb');

db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: "$address.country",
      averagePrice: {
        $avg: "$price"
      }
    }
  }
])
```

- Repite los mismos pasos pero agrupando también por número de habitaciones.
```
use('airbnb');

db.listingsAndReviews.aggregate([
  {
    $match: {
      "address.country": "Spain"
    }
  },
  {
    $group: {
      _id: {
        "bedrooms": "$bedrooms"
      },
      averagePrice: {
        $avg: "$price"
      }
    }
  }
])
```
```
use('airbnb');

db.listingsAndReviews.aggregate([
  {
    $group: {
      _id: {
        "country":"$address.country",
        "bedrooms": "$bedrooms"
      },
      averagePrice: {
        $avg: "$price"
      }
    }
  }
])
```

# Desafio
- Queremos mostrar el top 5 de apartamentos más caros en España, y sacar los siguentes campos:

    - Nombre.
    - Ciudad.
    - Amenities, pero en vez de un array, un string con todos los amenities.
```
use('airbnb');

db.listingsAndReviews
  .aggregate([
  {
    $match: {
      "address.country": "Spain"
    }
  },
  {
    $project: {
      name: 1,
      "address.market": 1,
      amenities: {
        $reduce: {
          input: "$amenities",
          initialValue: "",
          in: {
            "$concat": [
                  "$$value",
                  "$$this",
                  ","
                ]
          }
        }
      }
    }
  },
  { 
    $sort: { price: -1 } 
  },
  { 
    $limit: 5 
  }
])
```