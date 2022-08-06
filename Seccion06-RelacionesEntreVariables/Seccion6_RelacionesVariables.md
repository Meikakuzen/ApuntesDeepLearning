# Sección 6 - Relaciones entre variables

## Relación entre variables
- Cuanto mayor número de variables se inserte en el modelo, mayor será el coste computacional
- Insertar variables poco relevantes implica una sobrecarga del modelo en vano
- Las variables están relacionadas **cuando la variación de una de ellas afecta al resultado de la otra**
- Es posible que en un rango inicial no se observen variaciones
- Hay dos tipos de variables según su relación:
    - Las variables cuantitativas: numéricas
    - Las variables cualitativas/categóricas: son aquellas que pueden no ser numericas, o numéricas finitas.

## Comparaciones numéricas

- Según la tipología (cuantitativa o categórica) se empleará un sistema u otro para estudiar la relación.
- Relación entre cuantitativas
    - Cuando se quiere comparar la relación entre variables cuantitativas ( por ejemplo el precio del combustible con el precio del transporte de mercancías ) se traza **un diagrama de dispersión**
    - Un *diagrama de dispersión* es una nube de puntos
    - Relación lineal( monótona ): cuando podemos trazar uanlinea que se adapta de forma aproximativa a la nube de puntos
    - Cuando hay una relación lineal significa que cuando una variable varia, la otra varía en la misma proporción
    - Relación no-lineal: la variación no es proporcional
    - Relación monótona: describe un patrón ( de curvas o recta ) pero preservando la misma tendencia
- Por lo tanto cuando la nubve de puntos se adapta a uno de estos patrones podemos aseverar que las variables **están relacionadas** e insertarlas en el modelo es factible

- Relación entre categórica y cuantitativa:
    - La variable cuantitativa podría ser el precio de la vivienda y la categórica el número de habitaciones por vivienda
    - Si en el gráfico hubiera poca variación significa que no están relacionadas
    - Añadiendo datos de más habitaciones puede ser que sea más evidente esta relación dónde inicialmente la variación era casi nula pero que con más habitaciones si varía exponencialmente

## Relación entre categórica y categórica

- Una relación entre categóricas puede ser dos grupos: uno que SI ha viajado, otro que NO ha viajado y el grado de satisfacción de ambos grupos ( poco , regular, mucho)
    - SI: 20 - 40 - 60 === 120
    - NO: 10 - 30 - 40 === 80
- Lo primero que necesito es el total de cada categoría
- Son datos poco comparables, ya que no son el mismo numero de personas encuestadas, por lo que debo relativizar/normalizar estos datos con porcentajes
- Una vez normalizados puedo representar estos datos en un gráfico o histograma.
- En este caso se puede observar que la incidencia es **mínima** por lo que se podría concluir que estas variables **no están relacionadas**
