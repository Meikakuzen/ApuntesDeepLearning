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