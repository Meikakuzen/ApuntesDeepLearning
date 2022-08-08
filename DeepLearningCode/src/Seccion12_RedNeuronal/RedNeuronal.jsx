import { xor } from "./Ejemplo2"
import { LayerDense } from "./LayerDense"
import * as math from 'mathjs'



const RedNeuronal = () => {



class NeuralNetwork {
    constructor(layers =[], numEntradas){
        this.layers = [] // guardaré en esta propiedad las layers procesadas
        this.datosEntreno = []

        let count = 0; //contador para identificar la primera capa
        layers.map(element=>{
            let entradas = null;
            
            if(count === 0){
                entradas = numEntradas // en la primera capa cogemos el numEntadas
            }else{ // si no estoy en la primera capaa la entrada es igual a las salidas de la capa anterior
                entradas = this.layers[count-1].m
            }
            if(element.type === 'densed'){
                this.layers.push(new LayerDense(entradas, element.m, element.act, element.momento)) // esto me guarda en layers las instancias de cada layer
            }
            count++;
        })
    }

    //dar la posibilidad a la red que conozca los datos de entrenamiento (opcional)
    loadTrainData(datosEntreno = []){
        this.datosEntreno = datosEntreno
    }

    initPesos() {
        this.layers.map(element =>{
            element.initPesos()
        })
    }

    forward(input =[]){
        let x = input
        this.layers.map(element=>{
            x = element.forward(x) // que me devuelva de cada una de las capas su salida, porque su salida será la entrada de la siguiente capa
        })
        return x // la x final será la salida del modelo  ( sobreescribiendo la x )
    }

    error(outEsp, out){
        return math.subtract(outEsp, out)
    }
    //propagar el error a las capas anteriores
    backward(error=[]){
        //saber cual es la última capa
        let posUltima= this.layers.length -1
        
        for(let i= posUltima; i>=0; i --){
            //recalcular el error para que lo pase a la capa siguiente
            error= this.layers[i].backward(error)
        }
    }
    //lr es learning ratio. Recalculo de pesos
    update(lr){
        for(let i = 0; this.layers.length; i++){
            //va a hacer el update de cada una de estas capas pasándole el ratio de entrenamiento
            this.layers[i].update(lr)
        }
    }

    errorAbsoluto(error=[]){
        let errorAbsoluto = 0
        for (let i = 0; i < error.length; i++){
            errorAbsoluto += Math.abs(error[i])
        }
        return errorAbsoluto
    }
    
    
    train(epocas, lr, debug = false){
        let numDatos = this.datosEntreno.length 
        let registroErrores= []
        for(let i = 0; i < epocas; i++){
            let errorEpoca = 0;
            this.datosEntreno.map(element=>{
                let input = element.input
                let outEsp = element.output
                        //calculamos la salida
                let out = this.forward(input)//con esto tenemos los valores de las neuronas de la capa de salida
                let error = this.error(outEsp, out)
                errorEpoca = errorEpoca + this.errorAbsoluto(error)
                this.backward(error)
                this.update(lr)
            })
            let errorMedio = errorEpoca / numDatos
            registroErrores.push(errorMedio)
            if(debug){
                console.log("Epoca" + i + " " + errorMedio)
            }

            if(errorEpoca == 0){
                break;
            }
        }
    }

}

let layers = [ // las capas ocultas
    {
        'type': 'densed',
        'm': 2, //numero de neuronas
        'act': 'escalon' ,// activación ( nimbre del método )
        'momento': 0
    },
    {
        'type': 'densed',
        'm': 1, // solo hay un output
        'act': 'escalon',
        'momento': 0
    }
]

const redNeuronal = new NeuralNetwork(layers, 2) // 2 inputs del xor

    redNeuronal.initPesos()

    console.log(redNeuronal.layers[0])
    let salida = redNeuronal.forward(xor[0].input)

    console.log(salida)
    redNeuronal.train(100, 0.08, true)



  return (
    <div>RedNeuronal</div>
  )
}

export default RedNeuronal