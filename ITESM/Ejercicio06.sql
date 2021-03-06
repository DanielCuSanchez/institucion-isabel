-- Utilizando SQL, plantea para cada una de las consultas:
-- 1.- Una solución que utilice sub-consultas.
-- 2.- Una solución que no haga uso de sub-consultas.


-- Película(título, año, duración, encolor, presupuesto, nomestudio, idproductor)
-- Elenco(título, año, nombre, sueldo)
-- Actor(nombre, dirección, telefono, fechanacimiento, sexo)
-- Productor(idproductor, nombre, dirección, teléfono)
-- Estudio(nomestudio, dirección)

-- 1.- Actrices de “Las brujas de Salem”.
 
-- no sub-consultas
SELECT Nombre
FROM Actor A, Elenco E
WHERE Actor.Nombre = E.Nombre
AND Sexo = 'F' AND Titulo = 'Las brujas de Salem'


-- sub-consultas
SELECT Nombre
FROM ELENCO
WHERE TITULO = 'Las Brujas de Salem'
AND Nombre IN (SELECT NOMBRE FROM Actor WHERE Sexo = 'F')

-- 2.- Nombres de los actores que aparecen en películas producidas por MGM en 1995.

-- no sub-consulta

SELECT Nombre, nomestudio, año
FROM ELENCO E, PELICULA P
WHERE (E.titulo = A.titulo) 
AND (E.año = A.año)
AND nomestudio = 'MGM' 
AND A.año = 1995

-- sub-consulta

SELECT Nombre , año
FROM ELENCO
WHERE Nombre IN (SELECT Nombre FROM Pelicula WHERE año = 1955 AND nomestudio = 'MGM')

-- 3.- Películas que duran más que “Lo que el viento se llevó” (de 1939).

-- no sub-consulta

-- No hay solucion

--  sub-consulta

SELECT Nombre, duracion
FROM Pelicula
WHERE duracion > (SELECT duration FROM película WHERE nombre = ‘Lo que el viento se llevo’ AND año = 1939)


-- 4.- Productores que han hecho más películas que George Lucas.

-- no sub-consulta

-- no hay solucion

--  sub-consulta

SELECT nombre, COUNT(titulo)
FROM productor Pr, pelicula Pe
WHERE Pr.idProductor = Pe.idProductor
GROUP BY nombre
HAVING COUNT(titulo) > (
    -- Número de peliculas hechas por George Lucas
    SELECT COUNT(*)
    FROM productor Pr, pelicula Pe
    WHERE Pr.idProductor = Pe.idProductor 
    AND nombre = 'George Lucas')

-- Sub Consulta con vista
SELECT nombre, COUNT(titulo)
FROM productor Pr, pelicula Pe
WHERE Pr.idProductor = Pe.idProductor
GROUP BY nombre
HAVING COUNT(titulo) > (
    SELECT *
    FROM Productores_Mas_Peliculas_Que_George_Lucas
)

CREATE VIEW  Productores_Mas_Peliculas_Que_George_Lucas AS 
    SELECT COUNT(*)
    FROM productor Pr, pelicula Pe
    WHERE Pr.idProductor = Pe.idProductor 
    AND nombre = 'George Lucas'

-- 5.- Nombres de los productores de las películas en las que ha aparecido Sharon Stone.

-- no sub-consulta

SELECT Nombre
FROM pelicula P , elenco E , productor R
WHERE (P.titulo = E.titulo)
AND (P.año = E.año) 
AND (R.idProductor = P.idProductor)
AND (E.Nombre = 'Sharon Stone')

-- sub-consulta

SELECT Nombre
FROM productor Pr, pelicula Pe
WHERE Pe.idProductor = Pr.idProductor AND Pe.titulo IN (
        SELECT Titulo 
        FROM Elenco 
        WHERE Nombre = 'Sharon Stone')

-- 6.- Título de las películas que han sido filmadas más de una vez

-- no sub-consulta

-- sub-consulta
SELECT titulo, COUNT(*)
FROM pelicula
GROUP BY titulo
HAVING COUNT(*) > 1