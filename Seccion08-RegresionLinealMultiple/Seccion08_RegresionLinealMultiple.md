# Sección 8 - Regresión Lineal Múltiple

- Parte de los mismos principios de la regresión lineal simple, con la diferencia de que hay más variables independientes ( variables de entrada )
- Teniendo en cuenta de que una variable no suele depender únicamente de una única variable, puede parecer un sistema mucho mejor
- En la regresión lineal simple se tienen varias variables de entrada que se insertan en el modelo, este las proceso y genera una salida

- Cada entrada se va a multiplicar por su peso y generará una salida.

- En resumen: hace una suma ponderada
> Entrada1 * peso1 + Entrada2 * peso2, etc y se le suma un sesgo (b)

- En definitiva, hay más pendientes, que en ligar de llamarlas así se les llamará **pesos**. El sesgo en si mismo también es un peso

- A nivel gráfico, cuantas más variables, más dimensiones, con lo que en lugar de una recta se obtiene un plano.
- Las variables tienen que estar linealmente relacionadas

## Cálculo

- La solución de un problema de regresión lineal múltiple se aborda mediante **cálculo matricial**.
- Ejemplo con casas:
    - Precio: variable dependiente
    - Metros2: variable independiente
    - Habitaciones: variable independiente
    - Distancia playa: variable indepndiente
- Con el cálculo matricial lo primero es generar 2 matrices, x e y

    - *y* hace referencia a **la variable de salida** ( en este caso el precio )
    - *x* son las **variables independientes** ( de entrada )
    - Se le añade una columna de 1 como filas haya. Esto hace referencia al sesgo, ya que en la suma ponderada siempre se le suma el sesgo
    - Entonces el sesgo es **un valor de entrada al modelo de 1** . Tanto en la regresion lineal simple cómo  múltiple

### Proceso:
- Primero **transponemos la X** ( pasamos las filas a columnas )
- Luego se multiplica **la x transpuesta por la x**.
    - podría ser que **no se pudiera** multiplicar
- Se calcula **la inversa** del resultado
- Se calcula el **resultdao por y**
- Por último se multiplica **la inversa por el resultado de la inversa por y**
- La matriz **resultante** es una matriz de los **pesos**.
    - La matriz que va a contener cada uno de los pesos que van a afectar a cada una de las entradas del modelo
- Quedaría **una matriz con las filas de pesos sesgo, metros, habitaciones, distancia playa** 
- Estan en **el mismo orden** que los datos de la matriz x de entrada

- Ahora si yo quisiera calcular el precio de la vivienda, sería hacer la suma ponderada:
    - Coger el sesgo resultante, sumarle los metros cuadrados multiplicados por el dato de metros la matriz de pesos, sumarle el númerod e habitaciones por el peso de habitaciones, y sumarle la distancia de la playa por el peso de ditancia de la playa. 
~~~js
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
~~~~