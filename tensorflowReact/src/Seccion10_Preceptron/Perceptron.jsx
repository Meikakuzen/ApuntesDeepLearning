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