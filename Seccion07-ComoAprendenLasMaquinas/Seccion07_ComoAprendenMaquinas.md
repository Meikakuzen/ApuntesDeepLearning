# Seccion 7 - ¿Cómo aprenden las máquinas?

- Tipos de aprendizaje:
    - Aprendizaje supervisado
    - Aprendizaje no supervisado
-----

- Aprendizaje supervisado:
    - Se suministran datos y se le indica al modelo que respuestas se quieren obtener para esos datos.
    - Dadas unas variables independientes concretas, qué variable dependiente se espera y es correcta
    - Se le introducen los datos que darán una salida y se le indica si es correcta o no
    - Con lo cual habrá una fase de entrenamiento del modelo
    - Pueden ser tareas de clasificación o regresión
    - Clasificación: dato cualitativo. Decir si es un perro o un gato después de pasarle fotos y fotos y haya generado conocimiento reconociendo patrones
    - Regresión: dato cuantitativo. Decir cuánto vale una casa según sus características
----
- Aprendizaje no supervisado:
    - Se utiliza para resolver tareas de clasificación sin supervisión
    - Se le suministran variables independientes al modelo, pero sin indicarle cuál es el resultado esperado.
    - El modelo los irá categorizando en función de la similitud de sus propiedades.
    - Es útil para agrupar por semejantes: por ejemplo, tenemos datos de clientes y queremos saber que clientes son similares para dirigir campañas publicitarias con éxito
    
## Regresión lineal simple

- Las variables tienen que estar relacionadas con el problema. Es decir, que tengan una tendencia hacia la relación lineal
- Sólo hay dos variables, una de entrada y una de salida
- Aporta una solución de regresión( cuantitativa), no de clasificación
- Debe de haber una relación lineal entre las dos variables
- La fórmula de la recta:

> y = mx + b

- y es la salida, x es la variable de entrada, m la pendiente y b el sesgo

- Por lo tanto m y b son constantes, lo único que varía es x e y
- En un diagrama de dispersión, uscando los mejores valores para m y para b se traza la mejor recta posible
- Esto nos permite que sin tener un valor de x ( un punto en la gráfica ) podemos conocer el valor correspondiente aproximado de y gracias a esta recta.
- Si m === 2 y b === 1 tenemos una recta perfecta
- esto rara vez se dará, se busca trazar la mejor recta posible

## El mínimo error

- Se trata de buscar la mejor recta posible. La que mejor se adapte a la nube depuntos y así poder predecir el valor de una variable dependiente a través de una variable independiente de entrada

- Se trata de encontrar el valor de m y b ( constantes de una recta ) que mejor se adapte a la nube de puntos.
- Para ello usaremos la función de Error ( con forma de parábola )
- M === buscar el punto de la función donde el error es menor
    - Se consigue a través de la derivada parcial respecto a m dónde la pendiente === 0
- Con B igual
Hay dos formulas ya expresadas para el cálculo de m ( pendiente de la recta ) y b ( sesgo )

## El mínimo error II

- Cuando tenemos el diagrama de dispersión, la diferencia que hay entre los puntos y la mejor recta posible trazada es el error.
- El error es la diferencia entre lo que se espera obtener y lo que se obtiene
- No se trabaja con el error tal cual, si no con el error cuadrático, que es el que da la función de parábola mencionada anteriormente, que además es derivable, con lo cual se puede analizar por cada punto la pendiente que va a tener, necesario para calcular el error mínimo

- La función del error cuadrático es el error obtenido menos la ecuación de la recta elevado al cuadrado
> ( Yr- (m * x + b ) ** 2

- Para simplificarla se emplea la fórmula de binomio al cuadrado, para sacarle el paréntesis al cuadrado.
> ( a + b ) ** 2 = a ** 2 + 2ab + b ** 2


## El mínimo error III
- Teniendo en cuenta que la suma de todas las y que esperamos obtener === la media de todas las y que esperamos obtener * n puntos
- Lo mismo con las x y las x * y
- Si se aplican estos conceptos a la función anterior se obtiene la función del error cuadrático total pero no la función de un punto.
- Ahora es encontrar la mejor m y b posible, reducir el error cuadrático al máximo
- Se hace calculando las derivadas parciales del error cuadrático respecto a m y respecto a b
- Si recordamos, se hace igualando estas derivadas parciales a cero
- De esta manera se encontrará el error mínimo
- Para hacer la derivada parcial respecto a m se cogen todos los fragmentos de la expresión dónde esta m y derivar la m

## El mínimo error IV

- Ahora se elimnan las 2n que están en todas las partes de la ecuación.
- El resultado de x donde x e y son la media es:
> -xy + x ** 2 m + bx = 0
- El resultado de y donde x e y son la media es:

> -y + mx + b = 0

- Para simplificarlo más:
> x ** 2 m + bx = xy

> mx + b = y
- A partir de aquí se hace el proceso de igualar hasta resultar la fórmula de m y b
------
## Regresión lineal simple 

- Ahora se tratará de crear un algoritmo que recibirá unos datos de entrenamiento, y con esos datos que sea capaz de calcular la mejor pendiente y el mejor sesgo posible

~~~js
    const datosEntreno = [
        { input: [189], output: [200]},
        { input: [200], output: [300]},
        { input: [220], output: [300]},
        { input: [230], output: [350]},
        { input: [240], output: [330]},
        { input: [260], output: [340]},
        { input: [270], output: [400]},
        { input: [275], output: [500]},
        { input: [290], output: [550]},
        { input: [300], output: [520]},
        { input: [330], output: [550]},
    ]

    var regresion = new RegresionSimple(datosEntreno);
    regresion.train()

    console.log(regresion.pesos)
    console.log(regresion.prev(400))

    function RegresionSimple(datosEntreno){
        this.datosEntreno = datosEntreno //setear los datos de entreno en una propiedad
        this.pesos = [] // en pesos obtendremos el mejor valor de m y el mejor valor de b
       
        this.train = function(){ //aquí el calculo de la mejor m y mejor b
           let n = this.datosEntreno.length //para calcular la media
           let mediaY = 0
           let mediaX = 0
           let mediaX2 = 0 // media de x al cuadrado
           let mediaXY = 0 

           let sumatorioX = 0;
           let sumatorioY = 0;
           let sumatorioX2 = 0;
           let sumatorioXY = 0;

           this.datosEntreno.map(elemento =>{
            sumatorioX = sumatorioX + elemento.input[0]
            sumatorioY = sumatorioY + elemento.output[0]
            sumatorioX2 = sumatorioX2 + Math.pow(elemento.input[0], 2) //Math.pow eleva al exponente indicado
            sumatorioXY = sumatorioXY + elemento.input[0] * elemento.output[0]
           })

           //las medias
           
           mediaY = sumatorioY / n
           mediaX = sumatorioX / n
           mediaX2 = sumatorioX2 / n
           mediaXY = sumatorioXY / n

           //Formula de m

           let m = ( mediaY - (mediaXY/mediaX)) / (mediaX - (mediaX2/mediaX))

           //formula de b

           let b = mediaY - m * mediaX
           this.pesos[0] = m
           this.pesos[1] = b
        }

        //método dado un valor de x que haga el cálculo para dar el valor de y correspondiente aplicando la fórmula de la recta

        this.prev = function(x){
           return this.pesos[0] * x + this.pesos[1]
        }
    }
~~~