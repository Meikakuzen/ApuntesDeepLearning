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
