TODO:
- nodejs docker container
- CI/CD (jenkins, travis, circleci)
- delete desc from categories
- add lang to cats
- use mysql spatial functionality
  SELECT ST_Distance_Sphere(POINT(30.356438,50.455225), POINT(30.738039,50.490405))
  POINT(gpsLng, gpsLat) !!!
  Note: The arguments for the point method are longitude first, then latitude; this is a common gotcha!
  create table column: position POINT NOT NULL SRID 4326,
  add spatial index: CREATE SPATIAL INDEX position ON {tableNamae} (position);
  example: SELECT ST_Distance_Sphere(position, POINT(30.738039, 50.490405))

Фичи:
Возможность создать событие без локейшена.
Предложить возможность проголосовать за один из нескольких на выбор.

Requirements:
- nodejs LTS
- yarn (npm globally installed)
- knex (npm globally installed)
- docker
- mysql workbench
