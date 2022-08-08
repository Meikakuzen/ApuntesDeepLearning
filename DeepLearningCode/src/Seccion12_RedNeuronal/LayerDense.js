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
