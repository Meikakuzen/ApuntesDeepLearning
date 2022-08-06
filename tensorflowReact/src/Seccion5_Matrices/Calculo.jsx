import * as tf from '@tensorflow/tfjs'
import * as math from 'mathjs'

const Calculo = () => {
 
    const matrizA = [
        [2,3,5],
        [1,1,0]
    ]
 
    const matrizB = [
        [2,1],
        [5,3]
    ]

    const matrizC = [
        [4,1,2],
        [1,1,1]
    ]
 
    const multiplicacion = math.multiply(matrizB, matrizC);
    

    /*resultadoMultiplicacion = [
        [9,3,5],
        [23,8,13]
    ]*/

    const determinante = math.det(matrizB)
    

    // resultadoDeterminante = 1

    const inversa = math.inv(matrizB)
    console.log(inversa)

    /*resultado inversa = [
            [3,-1],
            [-5,2]
    ] */
 
    return (
    <div>

    </div>
  )
}

export default Calculo