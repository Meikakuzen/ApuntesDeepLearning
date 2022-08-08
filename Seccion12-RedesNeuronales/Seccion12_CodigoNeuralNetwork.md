# INICIAR CÓDIGO
~~~js
import { xor } from "./Ejemplo2"
import { LayerDense } from "./LayerDense"

const RedNeuronal = () => {



class NeuralNetwork {
    constructor(layers =[], numEntradas){
        this.layers = [] // guardaré en esta propiedad las layers procesadas

        let count = 0; //contador para identificar la primera capa
        layers.map(element=>{
            let entradas = null;
            
            if(count === 0){
                entradas = numEntradas // en la primera capa cogemos el numEntadas
            }else{ // si no estoy en la primera capaa la entrada es igual a las salidas de la capa anterior
                entradas = this.layers[count-1].m
            }
            if(element.type === 'densed'){
                this.layers.push(new LayerDense(entradas, element.m, element.act)) // esto me guarda en layers las instancias de cada layer
            }
            count++;
        })


    }
}

let layers = [ // las capas ocultas
    {
        'type': 'densed',
        'm': 2, //numero de neuronas
        'act': 'escalon' // activación ( nimbre del método )
    },
    {
        'type': 'densed',
        'm': 1, // solo hay un output
        'act': 'escalon'
    }
]

const redNeuronal = new NeuralNetwork(layers, 2) // 2 inputs del xor

console.log(redNeuronal)




  return (
    <div>RedNeuronal</div>
  )
}

export default RedNeuronal

~~~
###  LayerDense

~~~js

//Una capa densamente conectada  necesita conocer el numero de entradas ( n ), el número de neuronas ( m ) y la función de activación

export class LayerDense{
    constructor(n, m, activacion){
        this.n = n;
        this.m= m;
        this.activacion = activacion 
    }
}

~~~

## Datos Entrada

~~~js
export const xor=[
    {input: [0,0], output:[0]},
    {input: [0,1], output:[1]},
    {input: [1,0], output:[1]},
    {input: [1,1], output:[0]},
]
~~~
--------
## Inicializar los pesos

- LayerDense
~~~js

//Una capa densamente conectada  necesita conocer el numero de entradas ( n ), el número de neuronas ( m ) y la función de activación

export class LayerDense{
    constructor(n, m, activacion){
        this.n = n;
        this.m= m;
        this.activacion = activacion 
        this.pesos= []
        this.sesgos = []
    }

    initPeso(){ // los pesos
        return Math.random() *(0.5+0.5) - 0.5;

    }
    initPesos(){ //inicilaizar los pesos ( una matriz de 3 x 2 ) poruqe tiene 3 entyradas y 2 salidas
            
        for(let i = 0; i < this.n; i++){
            this.pesos[i] = [];
                                 //ahora iterar el num de salidas ( o neuronas )
            for(let j = 0; j < this.m; j++){
                this.pesos[i][j] = this.initPeso() //inicialización del peso
                //ahora falta el sesgo, tantos como salidas ( m ) hayan
            }
        }
        for(let k = 0; k < this.m; k++)
            this.sesgos[k] = this.initPeso()
    }
}
~~~
### RedNeuronal.jsx
~~~js
import { xor } from "./Ejemplo2"
import { LayerDense } from "./LayerDense"

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
                this.layers.push(new LayerDense(entradas, element.m, element.act)) // esto me guarda en layers las instancias de cada layer
            }
            count++;
        })
    }


    initPesos() {
        this.layers.map(element =>{
            element.initPesos()
        })
    }
}

let layers = [ // las capas ocultas
    {
        'type': 'densed',
        'm': 2, //numero de neuronas
        'act': 'escalon' // activación ( nimbre del método )
    },
    {
        'type': 'densed',
        'm': 1, // solo hay un output
        'act': 'escalon'
    }
]

const redNeuronal = new NeuralNetwork(layers, 2) // 2 inputs del xor

    redNeuronal.initPesos()

    console.log(redNeuronal.layers[0])




  return (
    <div>RedNeuronal</div>
  )
}

export default RedNeuronal
~~~

## Código de la propagación hacia adelante
### Layer Dense
~~~js
import * as math from 'mathjs'
import { Activacion } from "../Seccion10_Preceptron/Ejemplo"


//Una capa densamente conectada  necesita conocer el numero de entradas ( n ), el número de neuronas ( m ) y la función de activación

export class LayerDense{
    constructor(n, m, activacion){
        this.n = n;
        this.m= m;
        this.activacion = activacion 
        this.pesos= []
        this.sesgos = []
        this.inputs = []
        this.net = []
        this.out = []
    }

    initPeso(){ // los pesos
        return Math.random() *(0.5+0.5) - 0.5;

    }
    initPesos(){ //inicilaizar los pesos ( una matriz de 3 x 2 ) poruqe tiene 3 entyradas y 2 salidas
            
        for(let i = 0; i < this.n; i++){
            this.pesos[i] = [];
                                 //ahora iterar el num de salidas ( o neuronas )
            for(let j = 0; j < this.m; j++){
                this.pesos[i][j] = this.initPeso() //inicialización del peso
                //ahora falta el sesgo, tantos como salidas ( m ) hayan
            }
        }
        for(let k = 0; k < this.m; k++){
            this.sesgos[k] = this.initPeso()

        }
    }
    forward(inputs = []){ //para el forward (salida real de una neurona) es calculo matricial
        this.inputs= inputs // lo guardo

        //hay que generar la entrada neta con una multiplicacion matricial
        let pesosInputs = math.multiply(this.inputs, this.pesos)
        //guardo la entrada neta en un propiedad
        this.net = math.add(pesosInputs, this.sesgos)

        for( let i = 0; i < this.net.length; i++){//la salida será llamar a la activación
            this.out[i]= Activacion[this.activacion](this.net[i])
        }
        return this.out
    }

}
~~~

### Red Neuronal

~~~js
import { xor } from "./Ejemplo2"
import { LayerDense } from "./LayerDense"


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
                this.layers.push(new LayerDense(entradas, element.m, element.act)) // esto me guarda en layers las instancias de cada layer
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

}

let layers = [ // las capas ocultas
    {
        'type': 'densed',
        'm': 2, //numero de neuronas
        'act': 'escalon' // activación ( nimbre del método )
    },
    {
        'type': 'densed',
        'm': 1, // solo hay un output
        'act': 'escalon'
    }
]

const redNeuronal = new NeuralNetwork(layers, 2) // 2 inputs del xor

    redNeuronal.initPesos()

    console.log(redNeuronal.layers[0])
    let salida = redNeuronal.forward(xor[0].input)
    console.log(salida)




  return (
    <div>RedNeuronal</div>
  )
}

export default RedNeuronal
~~~
### Código Activación
~~~js
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
-----
## Funcion de entrenamiento!

- Da error, Época NaN
~~~js
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
                this.layers.push(new LayerDense(entradas, element.m, element.act)) // esto me guarda en layers las instancias de cada layer
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
        'act': 'escalon' // activación ( nimbre del método )
    },
    {
        'type': 'densed',
        'm': 1, // solo hay un output
        'act': 'escalon'
    }
]

const redNeuronal = new NeuralNetwork(layers, 2) // 2 inputs del xor

    redNeuronal.initPesos()

    console.log(redNeuronal.layers[0])
    let salida = redNeuronal.forward(xor[0].input)

    console.log(salida)
    redNeuronal.train(1, 0.1, true)



  return (
    <div>RedNeuronal</div>
  )
}
//da error Epoca NaN
export default RedNeuronal
~~~

## La propagación del error

- Lo que pasa en las capas ocultas a priori es desconocido.
- Obteniendo el error obtenemos una matriz que nos indica qué error comete cada una de las neuronas de la capa de salida
- Lo que ahora toca es coger estos errores y propagarlos hacia atrás
- Hemos de ser capaces de saber que responsabilidad tiene cada una de las neuronas en el resultado final, ya que cada una es diferente
- La propagación del error se basa en hacer el progreso inverso al forward, teniendo en cuenta que los resultados ( la transferencia de valores ) se hace a través del peso
- Cuanto más grande sea el peso más responsabilidad
- Se calcula con cálculos matriciales, multipilicando el valor de salida por los pesos de las neuronas anteriores de su matriz transpuesta.
- Es transponer la matriz que usamos para ir hacia adelante
- La propagación del error siempre se hace desde la salida, porque es dónde tienes la salida
-----
### RedNeuronal

~~~js
import { xor } from "./Ejemplo2"
import { LayerDense } from "./LayerDense"
import * as math from 'mathjs'
import { fromJSON } from "postcss"


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
                this.layers.push(new LayerDense(entradas, element.m, element.act)) // esto me guarda en layers las instancias de cada layer
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
        'act': 'escalon' // activación ( nimbre del método )
    },
    {
        'type': 'densed',
        'm': 1, // solo hay un output
        'act': 'escalon'
    }
]

const redNeuronal = new NeuralNetwork(layers, 2) // 2 inputs del xor

    redNeuronal.initPesos()

    console.log(redNeuronal.layers[0])
    let salida = redNeuronal.forward(xor[0].input)

    console.log(salida)
    redNeuronal.train(1, 0.1, true)



  return (
    <div>RedNeuronal</div>
  )
}

export default RedNeuronal

~~~

### LayerDense

~~~js
import * as math from 'mathjs'
import { Activacion } from "../Seccion10_Preceptron/Ejemplo"


//Una capa densamente conectada  necesita conocer el numero de entradas ( n ), el número de neuronas ( m ) y la función de activación

export class LayerDense{
    constructor(n, m, activacion){
        this.n = n;
        this.m= m;
        this.activacion = activacion 
        this.pesos= []
        this.sesgos = []
        this.inputs = []
        this.net = []
        this.out = []
        this.error= []
    }

    initPeso(){ // los pesos
        return Math.random() *(0.5+0.5) - 0.5;

    }
    initPesos(){ //inicilaizar los pesos ( una matriz de 3 x 2 ) poruqe tiene 3 entyradas y 2 salidas
            
        for(let i = 0; i < this.n; i++){
            this.pesos[i] = [];
                                 //ahora iterar el num de salidas ( o neuronas )
            for(let j = 0; j < this.m; j++){
                this.pesos[i][j] = this.initPeso() //inicialización del peso
                //ahora falta el sesgo, tantos como salidas ( m ) hayan
            }
        }
        for(let k = 0; k < this.m; k++){
            this.sesgos[k] = this.initPeso()

        }
    }
    forward(inputs = []){ //para el forward (salida real de una neurona) es calculo matricial
        this.inputs= inputs // lo guardo

        //hay que generar la entrada neta con una multiplicacion matricial
        let pesosInputs = math.multiply(this.inputs, this.pesos)
        //guardo la entrada neta en un propiedad
        this.net = math.add(pesosInputs, this.sesgos)

        for( let i = 0; i < this.net.length; i++){//la salida será llamar a la activación
            this.out[i]= Activacion[this.activacion](this.net[i])
        }
        return this.out
    }

    backward(error){
        this.error = error;
        let trans = math.transpose(this.pesos) //la transpuesta para calcular la propagación del error hacia atrás
        return math.multiply(error, trans) //multiplicamos las dos matrices
    }

}
~~~

-----
## Actualizar pesos

- La fórmula es la misma que el perceptron pero con más pesos, por lo que es algo más compleja
- Voy a necesitar la entrada, el error, y la derivada de la activación de la entrada neta
~~~js
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
                this.layers.push(new LayerDense(entradas, element.m, element.act)) // esto me guarda en layers las instancias de cada layer
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
        'act': 'escalon' // activación ( nimbre del método )
    },
    {
        'type': 'densed',
        'm': 1, // solo hay un output
        'act': 'escalon'
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
~~~

### LayerDense

~~~js
import * as math from 'mathjs'
import { Activacion } from "../Seccion10_Preceptron/Ejemplo"


//Una capa densamente conectada  necesita conocer el numero de entradas ( n ), el número de neuronas ( m ) y la función de activación

export class LayerDense {
    constructor(n, m, activacion){
        this.n = n;
        this.m= m;
        this.activacion = activacion 
        this.pesos= []
        this.sesgos = []
        this.inputs = []
        this.net = []
        this.out = []
        this.error= []
    }

    initPeso(){ // los pesos
        return Math.random() *(0.5+0.5) - 0.5;

    }
    initPesos(){ //inicilaizar los pesos ( una matriz de 3 x 2 ) poruqe tiene 3 entyradas y 2 salidas
            
        for(let i = 0; i < this.n; i++){
            this.pesos[i] = [];
                                 //ahora iterar el num de salidas ( o neuronas )
            for(let j = 0; j < this.m; j++){
                this.pesos[i][j] = this.initPeso() //inicialización del peso
                //ahora falta el sesgo, tantos como salidas ( m ) hayan
            }
        }
        for(let k = 0; k < this.m; k++){
            this.sesgos[k] = this.initPeso()

        }
    }
    forward(inputs = []){ //para el forward (salida real de una neurona) es calculo matricial
        this.inputs= inputs // lo guardo

        //hay que generar la entrada neta con una multiplicacion matricial
        let pesosInputs = math.multiply(this.inputs, this.pesos)
        //guardo la entrada neta en un propiedad
        this.net = math.add(pesosInputs, this.sesgos)

        for( let i = 0; i < this.net.length; i++){//la salida será llamar a la activación
            this.out[i]= Activacion[this.activacion](this.net[i])
        }
        return this.out
    }

    backward(error){
        this.error = error;
        let trans = math.transpose(this.pesos) //la transpuesta para calcular la propagación del error hacia atrás
        return math.multiply(error, trans) //multiplicamos las dos matrices
    }

    update(lr){
        //recorrer el arry multidimensional de pesos, primero filas, luego columnas
        for(let k = 0; k < this.pesos.length; k++){
            for(let j = 0; j<this.pesos[k].length; j++){
                //this.pesos[fila k][columna j]
                let input = this.input[k]

               //gradiente//el error correspondiente a la columna, la entrada neta correspondiente a la columna, la derivada y la entrada perteneciente a la fila
               let delta = this.error[j]* Activacion[this.activacion](this.net[j], true)* input
               
               //gradiente por el ratio de entrenamiento
               let incremento = delta * lr

               //actualizao peso
               this.pesos[k][j] += incremento

            }
        }

        for(let h = 0; h < this.sesgos; h++){
            let delta = this.error[h]* Activacion[this.activacion](this.net[h], true)
            let incremento = delta* lr
            this.sesgos[k]+=incremento;
        }
    }

}

~~~
----
## Propagar delta

- Si tengo pesos grandes y entrada pequeña hay muy poca responsabilidad
- Si tengo pesos pequeños y entrada muy grande, hay mucha responsabilidad

- El delta de una neurona es igual a la derivada parcial del error respecto a la entrada neta de esa neurona
- Es decir la derivada parcial respecto a la salida por la derivada parcial de la salida respecto a la entrada neta
- Se traduce en lo que esperamos obtener menos lo obtenido, multiplicado por la derivada de la función de activación pasándole la entrada neta.
- El resultado sería lo que yo propago hacia detrás, yo propago delta
- Esto hace que obtenga un error en las neuronas anteriores, con lo cual debo recalcular los deltas de estas neuronas ( la misma operación )
- El fin de esto es tener en cuenta que la responsabilidad de una neurona **no depende únicamente** de los pesos que ha recibido sino también de **las entradas**. Por eso estudiamos como varia el error cuando varia la entrada neta, es lo que le da sentido a hacer **la derivada parcial del error** respecto a **la entrada neta**.

~~~js
import * as math from 'mathjs'
import { Activacion } from "../Seccion10_Preceptron/Ejemplo"


//Una capa densamente conectada  necesita conocer el numero de entradas ( n ), el número de neuronas ( m ) y la función de activación

export class LayerDense {
    constructor(n, m, activacion){
        this.n = n;
        this.m= m;
        this.activacion = activacion 
        this.pesos= []
        this.sesgos = []
        this.inputs = []
        this.net = []
        this.out = []
        this.error= []
        //propagacion delta
        this.delta=[]
    }

    initPeso(){ // los pesos
        return Math.random() *(0.5+0.5) - 0.5;

    }
    initPesos(){ //inicilaizar los pesos ( una matriz de 3 x 2 ) poruqe tiene 3 entyradas y 2 salidas
            
        for(let i = 0; i < this.n; i++){
            this.pesos[i] = [];
                                 //ahora iterar el num de salidas ( o neuronas )
            for(let j = 0; j < this.m; j++){
                this.pesos[i][j] = this.initPeso() //inicialización del peso
                //ahora falta el sesgo, tantos como salidas ( m ) hayan
            }
        }
        for(let k = 0; k < this.m; k++){
            this.sesgos[k] = this.initPeso()

        }
    }
    forward(inputs = []){ //para el forward (salida real de una neurona) es calculo matricial
        this.inputs= inputs // lo guardo

        //hay que generar la entrada neta con una multiplicacion matricial
        let pesosInputs = math.multiply(this.inputs, this.pesos)
        //guardo la entrada neta en un propiedad
        this.net = math.add(pesosInputs, this.sesgos)

        for( let i = 0; i < this.net.length; i++){//la salida será llamar a la activación
            this.out[i]= Activacion[this.activacion](this.net[i])
        }
        return this.out
    }

    backward(error){
        this.error = error;
        let trans = math.transpose(this.pesos) //la transpuesta para calcular la propagación del error hacia atrás
        //return math.multiply(error, trans) //multiplicamos las dos matrices

        //calcular delta
        for(let i = 0; i < this.error.length; i++){
            //el primer delta corresponderá a la primera neurona
            this.delta[i] = this.error[i]* Activacion[this.activacion](this.net[i], true)
        }
        return math.multiply(this.delta, trans) //propagacion delta
    }

    update(lr){
        //recorrer el arry multidimensional de pesos, primero filas, luego columnas
        for(let k = 0; k < this.pesos.length; k++){
            for(let j = 0; j<this.pesos[k].length; j++){
                //this.pesos[fila k][columna j]
                let input = this.input[k]

               //gradiente//el error correspondiente a la columna, la entrada neta correspondiente a la columna, la derivada y la entrada perteneciente a la fila
               let delta = this.error[j]* Activacion[this.activacion](this.net[j], true)* input
               
               //gradiente por el ratio de entrenamiento
               let incremento = delta * lr

               //actualizao peso
               this.pesos[k][j] += incremento

            }
        }

        for(let h = 0; h < this.sesgos; h++){
            let delta = this.error[h]* Activacion[this.activacion](this.net[h], true)
            let incremento = delta* lr
            this.sesgos[k]+=incremento;
        }
    }

}
~~~
----
## La inercia

- La inercia es la resistencia de un cuerpo a cambiar su estado.
- Es posible que nos quedemos en un minimo error que no lo es, podría serlo más
- La inercia sería aprovechar la fuerza de llegar a este minimo error fake y saltar para ir a buscar el minimo real
- La inercia contribuye en conseguir esto

- ¿Cómo se aplica?
- Se coge el incremento de la iteración anterior y se le multiplica el momento ( un hiperparámetro, una constante que yo pongo)
    - Momento puede ser el número de neuronas de salida, por ejemplo. Es un valor de 0 a 1. Cero no cuenta
    - Menos inercia cuanto más pequeño sea el incremento 
    - La inercia nos puede ayudar a suavizar esos cambios de signo que alejan del error
    - Implementarla es útil

### RedNeuronal
~~~js
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
~~~
### LayerDense
~~~js
import * as math from 'mathjs'
import { Activacion } from "../Seccion10_Preceptron/Ejemplo"


//Una capa densamente conectada  necesita conocer el numero de entradas ( n ), el número de neuronas ( m ) y la función de activación

export class LayerDense {
    constructor(n, m, activacion, momento= 0){
        this.n = n;
        this.m= m;
        this.activacion = activacion 
        this.pesos= []
        this.sesgos = []
        this.inputs = []
        this.net = []
        this.out = []
        this.error= []
        //propagacion delta
        this.delta=[]
        
        //inercia Hay que inicializarlos para que haya unaposición por cada peso de entyrada y por cada sesgo que haya 
        this.pesosAnterioresIncr = [] // array multidimensional
        this.sesgosAnterioresIncr = [] // array unidimensional
        this.momento= 0.05


    }

    initPeso(){ // los pesos
        return Math.random() *(0.5+0.5) - 0.5;

    }
    initPesos(){ //inicilaizar los pesos ( una matriz de 3 x 2 ) poruqe tiene 3 entyradas y 2 salidas
            
        for(let i = 0; i < this.n; i++){
            this.pesos[i] = [];
            this.pesosAnterioresIncr[i] = []
                                 //ahora iterar el num de salidas ( o neuronas )
            for(let j = 0; j < this.m; j++){
                this.pesos[i][j] = this.initPeso() //inicialización del peso
                //ahora falta el sesgo, tantos como salidas ( m ) hayan
                this.pesosAnterioresIncr[i][j]= 0
            }
        }
        for(let k = 0; k < this.m; k++){
            this.sesgos[k] = this.initPeso()
            this.sesgosAnterioresIncr[k]= 0

        }
    }
    forward(inputs = []){ //para el forward (salida real de una neurona) es calculo matricial
        this.inputs= inputs // lo guardo

        //hay que generar la entrada neta con una multiplicacion matricial
        let pesosInputs = math.multiply(this.inputs, this.pesos)
        //guardo la entrada neta en un propiedad
        this.net = math.add(pesosInputs, this.sesgos)

        for( let i = 0; i < this.net.length; i++){//la salida será llamar a la activación
            this.out[i]= Activacion[this.activacion](this.net[i])
        }
        return this.out
    }

    backward(error){
        this.error = error;
        let trans = math.transpose(this.pesos) //la transpuesta para calcular la propagación del error hacia atrás
        //return math.multiply(error, trans) //multiplicamos las dos matrices

        //calcular delta
        for(let i = 0; i < this.error.length; i++){
            //el primer delta corresponderá a la primera neurona
            this.delta[i] = this.error[i]* Activacion[this.activacion](this.net[i], true)
        }
        return math.multiply(this.delta, trans) //propagacion delta
    }

    update(lr){
        //recorrer el arry multidimensional de pesos, primero filas, luego columnas
        for(let k = 0; k < this.pesos.length; k++){
            for(let j = 0; j<this.pesos[k].length; j++){
                //this.pesos[fila k][columna j]
                let input = this.input[k]

               //gradiente//el error correspondiente a la columna, la entrada neta correspondiente a la columna, la derivada y la entrada perteneciente a la fila
               let delta = this.error[j]* Activacion[this.activacion](this.net[j], true)* input
               
               //gradiente por el ratio de entrenamiento
               let incremento = delta * lr
               incremento += this.momento * this.pesosAnterioresIncr[k][j]
               //lo guardamos
               this.pesosAnterioresIncr[k][j]= incremento

               //actualizao peso
               this.pesos[k][j] += incremento

            }
        }

        for(let h = 0; h < this.sesgos; h++){
            let delta = this.error[h]* Activacion[this.activacion](this.net[h], true)
            let incremento = delta* lr
            incremento += this.momento * this.sesgosAnterioresIncr[h]; // una vez lo tenemos calculado lo guardamos
            this.sesgosAnterioresIncr[h] = incremento
            this.sesgos[k]+=incremento;
        }
    }

}
~~~