# Sección 12 Redes neuronales
## Conceptos de red neuronal

- El deep learning es uno de los algoritmos de ML
- Un algoritmo pensado para dotar al ordenador la capcidad de aprender
- Está basado en lo que se conoce como el cerebro humano
    - Este recibe un estímulo exterior, se procesa e interpreta en el cerebro y genera una respuesta
    - Nuestras percepciones son limitadas
- Las neuronas están conectadas entre si formando una red.
- A esta conexión se le llama sinapsis
- Una red neuronal es capaz de generalizar de forma bastante efectiva gracias a la correcta modulación de los pesos
- Esta el input ( capa de entrada ), las capas ocultas y el output ( capa de salida )
- La neurona ( el perceptron es una única neurona ) esta limitada pues es un clasificador lineal. Con más neuronas más capacidad de clasificar linealmente superando la limitación del perceptron
- Al tener varias capas en paralelo, se consigue elmismo resultado reduciendo neuronas a un coste computacional más bajo

## Red neuronal cómo capa de abstracción
- La abstracción son las capas ocultas.
    - Dadas unas características generará nuevas características a partir de las dadas

- Cada capa se le puede considerar como un generador de características nuevas
- Lo único que se puede controlar son los datos de entrada y los datos de salida, por eso se les dice cajas negras a las redes neuronales
- La toma de decisiones se hace en base a una salida dados unos datos de entrada, pero lo que ocurre en ese proceso se desconoce.
    - Esto es un lastre para las redes neuronales

## La propagación hacia adelante

- Cuando se programa el algoritmo de red neuronal, lo que se tiene en cuenta es cómo se propagan esas entradas hacia la salida.

- Lo principal es que las capas estén densamente conectadas
    - Quiere decir que todas las neuronas capa a capa están conectadas con todas las neuronas de las capas posteriores
- Cada neurona hará lo mismo que el perceptrón
    - La entrada por el peso, sumarle el sesgo y la entrada neta por la función de activación
- Esto se resuelve a través del cálculo matricial
- Ejemplo:
    - Capa de entrada 3 inputs : A B C
    - Primera capa oculta, 2 neuronas: D E
    - Lo primero es multiplicar  A B C por todos los pesos
    - AD AE, BD BE, CD CE
    - Esta matriz tiene una dimension de 3 * 2 ( A B C, D E )
    - La dimension es neuronas de entrada por neuronas de salida
    - Luego sumarle el sesgo y multiplicar el total por la activación
    - Puede acabar con varias neuronas
## Red neuronal con código

- La clase red neuronal va a ser la clase que lo gestione todo
- La red está compuesta por varias capas
- Lo interesante es que esta clase sea ciega a cómo se comporta cada una de estas capas.
    - Que la actualización de los pesos lo gestiona la clase de la capa, no la de la red neuronal
