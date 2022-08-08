import React from 'react'
import { datosEntreno, Activacion } from './Ejemplo'
import { LearningRate } from './LearningRate'

import * as math from 'mathjs'

const Perceptron1 = () => {



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
            let registroErrores = [0]
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
                    this.correcionPesos(lr, error, input, net)
                })

                let errorMedio = errorEpoca / numDatos
                registroErrores.push(errorMedio)
                console.log("Epoca" + i +  " "+ errorMedio)
            }

        }//lr es learning ratio
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

    }
                                //puedo pasarle la función de activación que desee
    let perceptron = new Perceptron()
    perceptron.loadTrainingData(datosEntreno)
    perceptron.initPesos()
   let net = perceptron.net([75,32,12])
    let output= perceptron.out(net)
    let error= perceptron.error([200], output)

    let lr = new LearningRate()
    lr.initLearningRate(perceptron, datosEntreno)
    let tasa = lr.lr

    //si época a época el error se incrementa quiere decir que la tasa de aprendizaje es muy elevada
    perceptron.train(10, tasa, true)

    


  return (
    <div>Perceptron</div>
  )
}

export default Perceptron1