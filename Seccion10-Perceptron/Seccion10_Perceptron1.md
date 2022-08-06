## ¿Que es el perceptron?

- Empezamos con la predecesión a la red neuronal

- Idea del perceptrón:
    - Es la red neuronal compuesta de **una única neurona**.
    - No es una red como tal ya que no hay aglomeración de neuronas.
    - Trata de *emular* desde la formulación matemática una neurona humana
- Un perceptrón recibe unas variables de entrada ya cda una de ellas se le asigna un peso.
- Se hará una suma ponderada de todas las entradas multiplicadas por su peso a la que se le añade el sesgo
----
## ¡¡¡Pero es lo mismo que la regresión lineal múltple!!!
---
- Hay diferencias:
    
    -Regresión lineal múltiple
    - recta, plano, hiperplano: hay una relación lineal, se pueden situar los puntos en una recta o plano
----
- La diferencia está en que en el caso del *perceptrón* **no es necesaria una relación lineal**
---
- La salida real del perceptrón **no será esta suma ponderada** (llamada entrada neta).
- El **resultado real** será el fruto de pasar esta entrada neta ( suma ponderada )por una **función de activación**

> OUT = activación(NET)

- Las funciones de activación son aquellas capaces de **flexibilizar** la salida.
    - **Deforma** esta linea plano o hiperplano para que se pueda adaptar a los puntos. 
    - Es un modelo más flexible, no se necesita una relación lineal
    
## Previo a la programación

- Cuando se quiere calcular a partir de unas entradas la salida del perceptrón se le llama **propagación hacia adelante**

- Hay varias formas de hacerla, una de ellas es el cálculo matricial.

- Habrán dos matrices: 
    - una de ellas contiene **todas las entradas** del perceptrón.
    - la otra contendrá **todos los pesos** que afectan a las entradas del perceptrón
- Su multiplicación sumada al sesgo nos da **la entrada neta**
- Falta la función de activación, aunque *no siempre se aplica*
- Hay que incializar los pesos, para que el modelo los vaya corrigiendo. es un proceso gradual ( por pasos )

## Hay una serie de criterios a seguir para que el perceptrón aprenda de una manera más eficiente:
    
- Los pesos deben de ser **cercanos a 0**: interesa que sean homogéneos, para que no haya determinadas entradas más importantes que otras. Si son muy muy cercanos a cero se anula y tampoco interesa.
- Deben de ser **aleatorios**: porque no sabemos que valores hay que asignar
- Deben de ser **positivos y negativos**: se ha demostrado que asignando todos los pesos positivos o negativos el modelo tiende a ajustar en una misma dirección y no interesa.

## El modelo va a tender siempre a incrementar el error

- El ajuste del peso va a ser siempre perjudicial en el resultado del modelo, va a hacer que se ajuste en dirección contraria al error mínimo, por ello son importantes estos criterios


