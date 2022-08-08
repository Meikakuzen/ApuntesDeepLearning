import * as math from 'mathjs'


const RegresionMultiple = () => {

  const datosEntreno = [
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

  //instancia del objeto

  const regresion = new RegresionMultiple(datosEntreno)
  regresion.train()

  let precio = regresion.predecir([
    120,
    5,
    60
  ])
  
  console.log(precio)

function RegresionMultiple(datosEntreno){
      this.datosEntreno = datosEntreno;
      this.pesos = [];

      this.train = function(){
        //preparar las matrices de x e y

        let matrixX = []
        let matrixY = []

        this.datosEntreno.map(elemento=>{
          
          //Inertamops la salida en la matriz de y
         
          matrixY.push(elemento.output[0]);
         
          //añadir el sesgo a la entrada
         
          elemento.input.unshift(1);
         
          //añadir la entrada a la matriz de x

          matrixX.push(elemento.input);
        })
        //transposicion de la matriz de z

        let mxt = math.transpose(matrixX)

        //multiplicar la matriz transpuesta por la matriz de X

        let mtporx = math.multiply(mxt, matrixX)

        //La inversa de esta matriz resultante

        const mtporxinv = math.inv(mtporx)

        //multiplicar  la matriz transpuesta por y 

        const xtpory = math.multiply(mxt,matrixY)

        //último paso : multiplicar la inversa por xtpory

        this.pesos = math.multiply(mtporxinv, xtpory)

      
      }

      //método para calcular/predecir el valor desde un conjunto de valores

      //lo primero es multiplicar por el primer valor de la matriz que es el sesgo
      //lo siguiente es recorrer cada uno de los elementos e ir calculando un valor provisional
      this.predecir = function(xArray){
        let value = this.pesos[0]

        //suma ponderada

        for(let index = 0; index < xArray.length; index++){

          //index+1 para no incluir el sesgo

            let prov = this.pesos[index+1] * xArray[index]
            
            //actualizando la variable, sumándole el sesgo 
            value = value + prov
        }
        return value
      }
}

//result === 576.9677560305887




  return (
    <div>RegresionMultiple</div>
  )
}

export default RegresionMultiple