# Sección 5 - Cálculo matricial y estadística

## Matrices

- Una matriz es una disposición ordenada de valores.
- Se disponen en filas y columnas
- en el ejemplo de B es de Dimensión = 2 x 3 , 2 filas 3 columnas
- La dimensión de la matriz viene determinado por el número de filas, 2 en este caso

~~~js
const B = [[1,2,3],
           [4,5,6]]
~~~

- Transponer la matriz B daría como resultado:

~~~js
const Bt =[[1,4],
           [2,5],
           [3,6]]
~~~
- Es convertir las filas en columnas. El exponente t significa transposición
- Podemos sumar o restar matrices
- Hay que sumar o restar el análogo de la otra matriz
- Ejemplo
~~~js
const sum = (a, b) =>{
    const a = [[1,2],
               [3,4]]
    
    const b = [[6,4],
               [2,1]]

    return a+b
}

//El resultado es:
    [[7,6],
     [5,5]]
~~~
- Para sumar o restar ambas deben tener la misma dimensión, y el resultado será de igual dimensión

## Multiplicación matricial

- Para multiplicar dos matrices tienen que ser iguales el número de columnas de la primera con el número de filas de la segunda
- 2 x 2 y 2 x 3 ---> multiplicable
La dimensión de la matriz resultante será igual al número de filas de la primera matriz y el numero de columnas de la segunda. En el ejemplo === 2 x 3 
- Es ir multiplicando filas por columnas y sumar los resultados
- Ejemplo:
~~~js
const a = [[2,1],
          [5,3]]

const b = [[4,1,2],
           [1,1,1]]

a * b = [[9,3,5],
         [23,8,13]]
~~~
- Si quisiera multiplicar b * a no sería posible

## Determinante e inversa de una matriz
- El determinante epende de las dimensiones de la matriz
- Esta debe de ser cuadrada
- Es una operación que nos devolverá un valor escalar ( un número )

- Se calcula multiplicando en diagonal y restando los valores

~~~js
const b = [[1,2],
           [3,4]] // el resultado es -2

~~~
- La inversa es muy tediosa y complicada.
- Formula:
    - A ** -1 = ( Adj ( A ) ) ** 7 / | A |

- En la inversa se divide algo por un determinante, por lo que este no puede ser 0

- La matriz debe ser cuadrada ( el mismo número de filas que de columnas )

~~~js
import * as math from 'mathjs'
 
    const matrizA = [
        [2,3,5],
        [1,1,0]
    ]
 
    const matrizB = [
        [2,1],
        [5,3]
    ]

    const matrizC = [
        [4,1,2],
        [1,1,1]
    ]
 
    const multiplicacion = math.multiply(matrizB, matrizC);
    

    /*resultadoMultiplicacion = [
        [9,3,5],
        [23,8,13]
    ]*/

    const determinante = math.det(matrizB)
    

    // resultadoDeterminante = 1

     const inversa = math.inv(matrizB)
    

    /*resultado inversa = [
            [3,-1],
            [-5,2]
    ] */
 
~~~

## Población y muestra

- Población: conjunto de individuos a estudiar
- Muestra: parte representativa de individuos
- Estos individuos tienen propiedades.
    - Estas propiedades tienen valores distintos
    - A las propiedades se les llama variables
- En el caso de unas elecciones la variable a estudiar sería el partido
- Unidimensional === 1 variable
- Multidimensional === varias variables
- Un sistema bi-dimensional es aquel en el que de cada individuo nos interesa estudiar 2 variables

## Media y mediana

- La media se obtiene sumando todos los valores dividiendo el total por n valores

- La mediana es aquel valor situado en medio del total de valores ordenados de menor a mayor
- Si el numero total es par, se coge el valor de enmedio más el siguiente dividido entre dos

## El rango, varianza y desviación típica

- El rango es la resta entre el valor máximo y el valor minimo
- La varianza mide cómo varian los datos.
    - Primero se calcula la media
    - Posteriormente  la suma de todos los datos menos la media elevados al cuadrado, con el total dividido por n datos es la varianza
- Desviación típica: es la raíz cuadrada de la varianza