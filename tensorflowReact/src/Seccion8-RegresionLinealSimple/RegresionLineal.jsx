import React from 'react'

const RegresionLineal = () => {

    const datosEntreno = [
        { input: [189], output: [200]},
        { input: [200], output: [300]},
        { input: [220], output: [300]},
        { input: [230], output: [350]},
        { input: [240], output: [330]},
        { input: [260], output: [340]},
        { input: [270], output: [400]},
        { input: [275], output: [500]},
        { input: [290], output: [550]},
        { input: [300], output: [520]},
        { input: [330], output: [550]},
    ]

    var regresion = new RegresionSimple(datosEntreno);
    regresion.train()

    console.log(regresion.pesos)
    console.log(regresion.prev(400))

    function RegresionSimple(datosEntreno){
        this.datosEntreno = datosEntreno //setear los datos de entreno en una propiedad
        this.pesos = [] // en pesos obtendremos el mejor valor de m y el mejor valor de b
       
        this.train = function(){ //aquí el calculo de la mejor m y mejor b
           let n = this.datosEntreno.length //para calcular la media
           let mediaY = 0
           let mediaX = 0
           let mediaX2 = 0 // media de x al cuadrado
           let mediaXY = 0 

           let sumatorioX = 0;
           let sumatorioY = 0;
           let sumatorioX2 = 0;
           let sumatorioXY = 0;

           this.datosEntreno.map(elemento =>{
            sumatorioX = sumatorioX + elemento.input[0]
            sumatorioY = sumatorioY + elemento.output[0]
            sumatorioX2 = sumatorioX2 + Math.pow(elemento.input[0], 2) //Math.pow eleva al exponente indicado
            sumatorioXY = sumatorioXY + elemento.input[0] * elemento.output[0]
           })

           //las medias
           
           mediaY = sumatorioY / n
           mediaX = sumatorioX / n
           mediaX2 = sumatorioX2 / n
           mediaXY = sumatorioXY / n

           //Formula de m

           let m = ( mediaY - (mediaXY/mediaX)) / (mediaX - (mediaX2/mediaX))

           //formula de b

           let b = mediaY - m * mediaX
           this.pesos[0] = m
           this.pesos[1] = b
        }

        //método dado un valor de x que haga el cálculo para dar el valor de y correspondiente aplicando la fórmula de la recta

        this.prev = function(x){
           return this.pesos[0] * x + this.pesos[1]
        }
    }


  return (
    <div>RegresionLineal</div>
  )
}

export default RegresionLineal