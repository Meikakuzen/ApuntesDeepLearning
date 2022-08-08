## Seccion 11 - Normalizar datos

- A veces tenemos entradas muy dispares. Esto tiende a que los incrementos sean muy grandes
- Por ello se puede reducir la tasa de aprendizaje, pero hay más sistemas.
- Una forma es la normalización de los datos ( escalar los datos )
- Hay dos maneras, principalmente:
    - Escalar en rango
    - Logaritmos

## Escalado en rango

- Fórmula
> Y = ( X - MIN) / ( MAX - MIN )

- Pensar como el escalado en los mapas. 1:100 es que una unidad equivale a 100 en el mundo real
- En el escalado en rango tengo un minimo ( 0 ) que voy a definir y un máximo ( 1 )
- Si yo tenía valores hasta 255, el 1 ( max ) será ese 255
 - Ejemplo:
    - 30 = ( 30 - 0 ) / ( 255 - 0 ) = 0,11764

## Normalizar por logaritmo

- Fórmula
> a ** x = b   
- Con lenguaje de programación, donde b es cualquier valor:  
> log( b ) = x

- Logaritmo de 0 da error, los valores negativos también

- Con el logaritmo los datos son más homogéneos

