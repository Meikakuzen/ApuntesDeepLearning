export const datosEntreno = [
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

  //Activación

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