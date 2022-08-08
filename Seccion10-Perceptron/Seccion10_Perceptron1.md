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

## Funciones de activación

- Hay:
    - Discretas ( solo 2 posibilidades)
    - Continuas ( rango de 0 a 1)
- Cuando hablamos de funciones de activación nos interesa conocer la derivada de esta opción de activación, si es que existe
- Para hacer el algoritmo del gradiente descendiente, para calcular el incremento del peso, parea ser capaces de corregir el peso, se necesita la derivada de la función de activación que se está utilizando.
- La función de activación más básica es la de identidad o lineal
> f ( x ) = x
- La derivada es siempre 1, es como no aplicar nada
- La función del escalón (discreta)
    - para un valor negativo el valor de salida es 0
    - si es positiva es 1
- La sigmoide y la tangente hiperbólica son las más utilizadas
- La sigmoide, dado un valor de x, ofrece una función de activación continua que va del 0 al 1. Tiene una fórmula para calcularla y calcular su derivada.
- La tangente hiperbólica es parceida a la sigmoide pero esta va del -1 al 1. Tambien tiene su función para calcularse igual que su derivada
- Relu es otra función lineal, cuando x es negativo la salida es 0


~~~js
import React from 'react'
import { datosEntreno, Activacion } from './Ejemplo'

import * as math from 'mathjs'

const Perceptron = () => {



    class Perceptron {  //activación lineal por defecto
        constructor(activacion= 'lineal'){
            this.datosEntreno = []
            this.pesos =[]
            this.sesgo=[]
            this.activacion= activacion
        }
        
        //seteo los datos de entrenamiento

        loadTrainingData(datosEntreno){
            this.datosEntreno = datosEntreno;
        }

        //esta función debe retornar un valor aleatorio
        
        initPeso(){
            return Math.random()* (0.5 + 0.5) - 0.5
        }

        //inicializar todos los pesos. Hacer que el perceptron tenga unos valores aleatorios en lso pesos

        initPesos(){ //cómo solo hay un sesgo, guardo en la primera posición um valor aleatorio
            this.sesgo[0] = this.initPeso()
            //cuántos pesos voy a tener? tantos como entradas haya ( tengo 3 entradas )
            let numeroEntradas = this.datosEntreno[0].input.length

            for(let i = 0; i < numeroEntradas; i ++){
                this.pesos[i] = []
                this.pesos[i][0] = this.initPeso()
            }
            
        }
         //calcular la entrada neta

        net(input=[]){
           let multi =  math.multiply(input, this.pesos);
           return  math.add(multi,this.sesgo)
        }
        //función de activación: discretas( de 1 o -1, solo 2 posibles ) o continuas ( rango de 0 a 1 )

        //activación
        out(net = []){
            let out = []
                //recorrer los elementos de la entrada neta
                for(let i = 0; i < net.length; i++){
                    
                    //setearle en su posición correspondient la entrada neta aplicando la activacióne
                    //para ello llamo a la clase y tratarla como un array
                    out[i] = Activacion[this.activacion](net[i])
                }
            return out
        }
        //propagación hacia adelante
        forward(input){
            let net = this.net //genero la entrada neta
            return this.out(net) // me retorna la salida llamando a out insertando la entrada neta
        }

        //calcular el error
        error(outEsperado, out){
            return math.subtract(outEsperado, out)
        }


    }
                                //puedo pasarle la función de activación que desee
    let perceptron = new Perceptron('sigmoide')
    perceptron.loadTrainingData(datosEntreno)
    perceptron.initPesos()
   let net = perceptron.net([75,32,12])
    let output= perceptron.out(net)
    let error= perceptron.error([200], output)

    console.log(error)
    


  return (
    <div>Perceptron</div>
  )
}

export default Perceptron
~~~
El archivo de las funciones de activación
~~~js
export const datosEntreno = [
    {input:[80,2,100], output:[400]},
    {input:[60,2,900], output:[320]},
    {input:[90,3,250], output:[510]},
    {input:[55,2,350], output:[300]},
    {input:[30,1,520], output:[250]},
    {input:[80,4,90], output:[430]},
    {input:[65,2,700], output:[250]},
    {input:[120,3,400], output:[492]},
    {input:[100,4,800], output:[355]},
    {input:[75,1,650], output:[200]},
    
  ]

  //Activación

  export class Activacion{
    //recibe la entrada neta, y si queremos derivarla
    static lineal(net, derivada= false){
        if(derivada){
            1
        }
        return net;
    }
    static escalon(net, derivada=false){
        if(derivada){
            return 1
        }
        if(net< 0){
            return 0
        }else{
            return 1
        }
    }
    static escalonv2(net, derivada=false){
        if(derivada){
            return 1
        }
        if(net< 0){
            return -1
        }else{
            return 1
        }
    }

    static sigmoide(net, derivada=false){
        if(derivada){
            return this.derivadaSigmoide(net)
        }
        return 1/(Math.pow(Math.E, -net))
    }
    static derivadaSigmoide(net){
        //para calcular la derivada de la sigmoide  necesito la sigmoide
        let sigmoide= this.sigmoide(net);
        return sigmoide * (1- sigmoide) //derivada
    }
    static tangenteHiperbolica(net, derivada= false){
        if (derivada){
            return this.derivadaTang(net)
        }
        return (Math.exp(net) - Math.exp(-net)) / (Math.exp(net)+ Math.exp(-net))
    }
    static derivadaTang(net){
        let tang = this.tangenteHiperbolica(net)
        return 1 - Math.pow(tangenteHiperbolica, 2)
    }
    static relu(net, derivada = false){
        if(derivada){
            if(net < 0){
                return 0
            }
            return 1;
        }else{
            if (net < 0){
                return 0;
            }else {
                return net
            }
        }
    }

  }

~~~

- Ahora que se ha podido calcular el error, se puede ver cómo ajustar los parámetros tanto de las entradas como del sesgo
- Primero hacemos la función de entrenamiento
~~~js
import React from 'react'
import { datosEntreno, Activacion } from './Ejemplo'

import * as math from 'mathjs'

const Perceptron = () => {



    class Perceptron {  //activación lineal por defecto
        constructor(activacion= 'lineal'){
            this.datosEntreno = []
            this.pesos =[]
            this.sesgo=[]
            this.activacion= activacion
        }
        
        //seteo los datos de entrenamiento

        loadTrainingData(datosEntreno){
            this.datosEntreno = datosEntreno;
        }

        //esta función debe retornar un valor aleatorio
        
        initPeso(){
            return Math.random()* (0.5 + 0.5) - 0.5
        }

        //inicializar todos los pesos. Hacer que el perceptron tenga unos valores aleatorios en lso pesos

        initPesos(){ //cómo solo hay un sesgo, guardo en la primera posición um valor aleatorio
            this.sesgo[0] = this.initPeso()
            //cuántos pesos voy a tener? tantos como entradas haya ( tengo 3 entradas )
            let numeroEntradas = this.datosEntreno[0].input.length

            for(let i = 0; i < numeroEntradas; i ++){
                this.pesos[i] = []
                this.pesos[i][0] = this.initPeso()
            }
            
        }
         //calcular la entrada neta

        net(input=[]){
           let multi =  math.multiply(input, this.pesos);
           return  math.add(multi,this.sesgo)
        }
        //función de activación: discretas( de 1 o -1, solo 2 posibles ) o continuas ( rango de 0 a 1 )

        //activación
        out(net = []){
            let out = []
                //recorrer los elementos de la entrada neta
                for(let i = 0; i < net.length; i++){
                    
                    //setearle en su posición correspondient la entrada neta aplicando la activacióne
                    //para ello llamo a la clase y tratarla como un array
                    out[i] = Activacion[this.activacion](net[i])
                }
            return out
        }
        //propagación hacia adelante
        forward(input){
            let net = this.net //genero la entrada neta
            return this.out(net) // me retorna la salida llamando a out insertando la entrada neta
        }

        //calcular el error
        error(outEsperado, out){
            return math.subtract(outEsperado, out)
        }

        errorAbsoluto(error=[]){
            let errorAbsoluto = 0;
            for(let i = 0; i< error.length; i++){
                errorAbsoluto += Math.abs(error[i])
            }
            return errorAbsoluto
        }

        //funcion de ajuste para minimizar el error

        train(epocas, lr, debug= false){
            let numDatos = this.datosEntreno.length
            for(let i = 0; i < epocas; i++){
                
                let errorEpoca = 0;
                
                this.datosEntreno.map(element =>{
                    let input = element.input
                    let outEsperado = element.output

                    let net = this.net(input) // entrada neta
                    let out = this.out(net) // salida neta
                    let error = this.error(outEsperado, out)//error

                     //error absoluto (incremental)
                    errorEpoca = errorEpoca + this.errorAbsoluto(error)
                })

                let errorMedio = errorEpoca / numDatos
                console.log("Epoca" + i +  " "+ errorMedio)
            }

        }

    }
                                //puedo pasarle la función de activación que desee
    let perceptron = new Perceptron('sigmoide')
    perceptron.loadTrainingData(datosEntreno)
    perceptron.initPesos()
   let net = perceptron.net([75,32,12])
    let output= perceptron.out(net)
    let error= perceptron.error([200], output)

    perceptron.train(1, null, true)

    


  return (
    <div>Perceptron</div>
  )
}

export default Perceptron
~~~

- Ahora podemos proceder al ajuste/actualización de pesos
## El gradiente descendente

- Ajustar los pesos de la entrada y el sesgo
- El descenso de gradiente es un método que permite tener el minimo error posible dentro de funciones de error complejas
- Tiene un coste computacional elevado pero es la mejor respuesta posible
- El simil es: supongamos que tenemos que bajar una montaña y tenemos vendados los ojos
    - Poco a poco testeando el terreno con el pie se avanza poco a poco en el descenso
    - Se para, se vuelve a hacer lo mismo.
    - Llegará un punto que no se pude descender más porque se estará en el punto mínimo
- Esto es encontrar el vector gradiente, puedo saber hacia dónde tengo que ir para poder descender
- Vector es un ente matemático como la recta o el plano, se representa mediante un segmento de recta orientado dentro de un espacio euclidiano tridimensional. 
    . Un vector **ES UNA FLECHA** que tiene una magnitud, una dirección y un sentido. Dentro de un espacio tridimensional nos indica hacia donde se debe ir. x e y serían los parámetros a ajustar y z el error
- La montaña es la función de error.
    - Qué parametro tiene que tener el parámetro x e y para obtener el punto de error  mínimo? ( recordar minimo error )
- Dado un punto determinado ( error aleatorio ) mirar hasta donde debemos descender hasta llegar al punto de error mínimo
## Gradiente descendente II
- En un plano bidimensional de x e y, se calculaba la derivada parcial del error respecto al parámetro.
- Esto daba la info para ajustar el peso.
- En un plano tridimensional se necesita de un vector, porque hay una magnitud, una dirección y un sentido que se mueve por el espacio
- **El vector gradiente** lo que contiene son las derivadas parciales del error respecto de los pesos
- La derivada del error respecto un peso cualquiera se compone de tres partes:
    - La derivada del error respecto a la salida definitiva ( una vez aplicada la funciónd e activación ): el error. Lo que esperamos obtener y lo obtenido **EN NEGATIVO**
    - La derivada de la salida respecto a la derivada de la entrada neta: es la derivada de la función de activación pasándole la entrada neta
    - La derivada de la entrada neta respecto al peso

    - Recordar que la derivada lo que hace es darme la recta tangente que pasa por un punto

> Fórmula = El incremento de un peso cualquiera === el rango de entrenamiento * el vector gradiente que actúa sobre ese peso
- Hay una conversión de signo del resultado, si es positivo el resultado es negativo
----
### Esto es porque se debe ir en dirección contraria para corregir el error 
----
- Ejemplo:
    - Valor de entrada 5
    - Valor del peso 0.50
    - Entrada neta/salida neta 2.5 ( lineal )
    - Valor esperado 3
-  Gradiente: 
    - error = Entrada neta - valor esperado = 0.5
    - derivada de la función de activación, al ser lineal = 1
    - Multiplicado por la entrada que es 5

> Gradiente = 0.5 * 1 * 5 = 2.5

- Peso actualizado:
    - 0.50 ( peso incial ) + (gradiente * 0.10) = 0.75
    - Sumar el 0.10 que es el ratio de entrenamiento ( establecido libremente )

- La actualización del peso es 0.75 ( nuevo peso )

## Correción peso

- Da error: INFINITY
- Esta función se llama en el .map de datosEntreno en el método train() ( al final de la iteración )

~~~js
 correcionPesos(lr, error, input, net ){ //pasamos la entrada neta y queremos la derivada (true)
                                                //queremos solo la primera posición de net pq el perceptron solo tiene una neurona
            let activacion = Activacion[this.activacion](net[0], true)
            let numPeso = 0

            //actualizar los pesos. Pesos hay tantos como entrada. Solo una neurona, solo un peso
            this.pesos.map(element=>{
                //gradiente
                let delta = error[0] * activacion * input[numPeso]
                
                //incremento. Aplicarlo en positivo es ya haber intercambiado el signo negativo
                let incremento = lr * delta
                this.pesos[numPeso][0] += incremento
                numPeso++;
            })

            //SESGO
            let deltaSesgo = error[0]* activacion * 1
            let incrementoSesgo = lr * deltaSesgo
            //sesgo solo hay uno porque hay tantos como neuronas haya
            this.sesgo[0] += incrementoSesgo
        }
//ATENCIÓN DA ERROR: INFINITY
~~~

## Importancia de la tasa de aprendizaje

- Imagina que estas en un campo de golf donde en un punto tienes el hoyo (minimo error) y en otro la pelota
- Si golpeo fuerte siempre nunca meteré la pelota
- Con lo único que puedo incidir directamente en el resultado es con la tasa de aprendizaje
- Este parametro afecta a la rápidez del avance ( golpeo de la pelota )
- Si alterno negativos y positivos continuamente ( pongamos que a la izquierda del hoyo es negativo y tengo que avanzar en positivo y a la derecha es positivo y tengo que avanzar en negativo) pasará que me alejo cada vez más del agujero ( error mínimo )
- La neurona se satura pq el ajuste de los pesos es demasiado grande
- Si golpeamos demasiado flojo tardaremos mucho ya que se necesitarán más épocas y tampoco interesa.

## Que tasa de aprendizaje poner?
- Es dificil. Se puede dilucidar a través de los ensayos viendo los resultados de las épocas viendo como se modifica el error.
- Hay muchas fórmulas para calcular la tasa de aprendizaje
- Se puede crear un script para ello.
- Cuando el error se reduce es la tasa adecuada
- Hay parámetros para decidir qué tasa de aprendizaje emplear
    - Número de pesos: a más pesos más incrementos va a recibir.
        - No interesa que el incremento sea grande
    - Escalado de datos: si los datos son muy grandes, tenderá a hacer errores grandes. Por ello es importante escalar los datos
- Cuanto más pesos más pequeña tiende a ser la tasa de aprendizaje

## Cálculo de tasa de aprendizaje

~~~js
export class LearningRate{
    constructor(){
        this.lr = 0.1
    }

    initLearningRate(redNeuronal,datosEntreno){

        let entrar = true;
        let limit= 1000
        while (entrar){

            redNeuronal.loadTrainData(datosEntreno)
            redNeuronal.initPesos()

            let errores = redNeuronal.train(10, this.lr, true)

            entrar = false
        }
    }
}
~~~

- Ahora en train() añado una variable llamada registroErrores = 0 que lo que hará es que cuando calculemos el error medio de la época lo seteamos en ese array de registro de Errores

- Lo coloco debajo del cálculo del errorMedio
~~~js
 registroErrores.push(errorMedio)
~~~
 

~~~~js
import { datosEntreno } from "./Ejemplo";



export class LearningRate{
    constructor(){
        this.lr = 0.1
    }

    initLearningRate(redNeuronal,datosEntreno){

        let entrar = true;
        let limit= 1000

        //parta verificar el limite necesito un contador
        let contador= 0

        while (entrar){

            redNeuronal.loadTrainingData(datosEntreno)
            redNeuronal.initPesos()

            //de esta manera tengo todos los errores de época a época

            let errores = redNeuronal.train(10, this.lr, true)

            let grande = 0
            let fracaso = false
            for(let i = 1; i < errores; i ++){
                //si el error actual es mayor al error anterior
                if(errores[i] < errores[i-1] || Number.isNaN(errores[i])){
                    fracaso = true
                    break;
                }
            }

             if(contador >=limit){
                entrar = false
            }else{
                if(fracaso){ // actualizar tasa de aprendizaje
                    this.lr = this.lr*0.9
                }else{
                    entrar = false
                }
            }
            contador ++
        }
    }
}
~~~~

- Para usarla debo instanciarla en Perceptron 
~~~js
let lr = new LearningRate()
    
    lr.initLearningRate(perceptron, datosEntreno)
    let tasa = lr.lr


    perceptron.train(1000, tasa, true)
~~~

- Da de resultado infinity ( ERROR )