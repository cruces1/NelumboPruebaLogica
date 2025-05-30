/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect, useState } from 'react'
import Input from '../componentes/Input'
import Select from '../componentes/Select'

const index = () => {
  
  const [edad, setEdad] = useState(0)
  const [peso, setPeso] = useState(0)
  const [altura, setAltura] = useState(0)
  const [factor, setFactor] = useState(0)
  const [sistema, setSistema] = useState({ altura: "Pulgadas", peso: "Libras", tipo: 0 });
  const [calorias, setCalorias] = useState(0);
  const [erroredad, setErrorEdad] = useState("");
  const [errorpeso, setErrorPeso] = useState("");
  const [erroraltura, setErrorAltura] = useState("");
  const [errorcalorias, setErrorCalorias] = useState("");

  useEffect(() => {
    calcularCalorias();
  },[edad,peso,altura])

  const validarFactor = (peso) => {

    if (!isNaN(peso)) {
      if (peso > 220)
        setFactor(1);

      if (peso > 200 && peso <= 220)
        setFactor(1.2);

      if (peso >= 165 && peso <= 200)
        setFactor(1.4);

      if (peso < 165)
        setFactor(1.6);
    }
  }
  const calcularCalorias = () => {


     if(erroredad || errorpeso || erroraltura)
        {
            setErrorCalorias("Digite correctamente los campos");
            return;
        }

        setErrorCalorias("");
    let pesokg = peso;
    let alturacm = altura;

    if (sistema.tipo == 0) {
      pesokg = convertirUnidades(peso, "LB/KG");
      alturacm = convertirUnidades(altura, "IN/CM");
    }


    const cal = (10 * pesokg + 6.25 * alturacm -10 * edad + 5) * factor;
    setCalorias(cal);
  }

      const validarRangos = (valor, rango1, rango2, propname = "", unidad = "") => {
        let error = "";

        if (!(valor >= rango1 && valor <= rango2))
            error = `${propname} debe estar entre los rangos ${rango1} ${unidad} y ${rango2} ${unidad}`;
        
        return error;
    }
    const validarNegativos = (valor) => {
        let error = "";

        if (valor < 0)
            error = "El valor no puede ser menor a 0"
        
        return error;
    }


  const validarEdad = (value) => {
        
        setEdad(value)
        
        if (!value)
        {
            setErrorEdad("Digite el campo Edad")
            return;
        }

        const valor = parseFloat(value)
        const min = 16;
        const max = 105;

        const errorRangos = validarRangos(valor, min, max, "Edad");
        const errorNegativo = validarNegativos(valor);        

        if (!errorRangos && !errorNegativo)
        {                                
            setErrorEdad("");
        }

        if (errorRangos)
            setErrorEdad(errorRangos)

        if (errorNegativo)
            setErrorEdad(errorNegativo)
  }

  const validarPeso = (value, sistemMet) => {

    setPeso(value); 

        if (!value)
        {
            setErrorPeso("Digite el campo Peso")
            return;
        }

    const valor = parseFloat(value);
    let errorRangos = "";
    const errorNegativo = "";
    const kg_min = 40.50;
    const kg_max = 300;
    const lb_min = convertirUnidades(kg_min, "KG/LB");
    const lb_max = convertirUnidades(kg_max, "KG/LB");
      
          if (sistemMet == 0)
        {
            errorRangos = validarRangos(valor, lb_min, lb_max, "Peso", "Lb.");            
        }else
        {
            errorRangos = validarRangos(valor, kg_min, kg_max, "Peso", "Kg.");
            
        }
        
        const valorPeso = sistemMet != 0 ? valor : valor * 2.2046;
        validarFactor(valorPeso);
          if (!errorRangos && !errorNegativo)
        {                                
            setErrorPeso("");
        }

        if (errorRangos)
            setErrorPeso(errorRangos)

        if (errorNegativo)
            setErrorPeso(errorNegativo)
  }
  const validarAltura = (value, sistemMet) => {

    setAltura(value); 

        if (!value)
        {
            setErrorAltura("Digite el campo Altura")
            return;
        }


        const valor = parseFloat(value);
        let errorRangos = "";
        let errorNegativo = "";

        //mts
        const min = 1.40;
        const max = 2.25;

        const min_cm = min * 100;
        const max_cm = max * 100;
        

        const min_pl = convertirUnidades(min_cm, "CM/IN");
        const max_pl = convertirUnidades(max_cm, "CM/IN");

        if (sistemMet == 0)
        {
            //Pulgadas
            errorRangos = validarRangos(valor, min_pl, max_pl, "Altura", "in.");
            
        }else
        {
            //Centimetros
            errorRangos = validarRangos(valor, min_cm, max_cm, "Altura", "cm.");
        }

        errorNegativo = validarNegativos(valor);        

        if (!errorRangos && !errorNegativo)
        {                                
            setErrorAltura("");
        }

        if (errorRangos)
            setErrorAltura(errorRangos)

        if (errorNegativo)
            setErrorAltura(errorNegativo)
  }
    const convertirUnidades = (valor, metrica) => {
    let pesofinal = 0;
    if (metrica == "KG/LB") {
      pesofinal = valor * 2.2046;
    } else if (metrica == "LB/KG") {
      pesofinal = valor / 2.2046;
    } else if (metrica == "CM/IN") {
      pesofinal = (valor / 2.54);
    } else if (metrica == "IN/CM") {
      pesofinal = (valor * 2.54);
    } else {
      pesofinal = valor;
    }

    return pesofinal;
  }
  return (

    <div>
      <h1>Prueba Logica Nelumbo</h1>
      <h3>Calculadora de calorias</h3>
      <Select item={[{value:"0",descripcion:"Libras--Pulgadas"},{value:"1",descripcion:"Kilogramos--Centimetros"}]}

      sistemaMet={(e: { target: { value: string } }) => {

        const obj = {...sistema};
    
                        const tipo = parseInt(e.target.value);
    
    
                        obj.altura = tipo == 0 ? "Pulgadas" : "Centimetros";
                        obj.peso = tipo == 0 ? "Libras" : "Kilogramos"
                        obj.tipo = tipo;       
    
                        let newpeso = peso;
                        let newaltura = altura;


                        if(!isNaN(peso))
                        {
                            if(tipo == 0)
                            {
                                //LB a KG
                                newpeso = peso * 2.2046;
                                setPeso(newpeso);
                            }else
                            {
                                //PL a CM
                                newpeso = peso / 2.2046;
                                setPeso(newpeso);
                            }
                        }

                        if(!isNaN(altura))
                        {
                            if(tipo == 0)
                            {
                                //CM a PL
                                newaltura = altura / 2.54;
                                setAltura(newaltura);
                            }else
                            {
                                //PL a CM
                                newaltura = altura * 2.54;
                                setAltura(newaltura);
                            }
                        }

                        validarAltura(newaltura, tipo);
                        validarPeso(newpeso, tipo);
    
                        setSistema(obj);
      }}
      />

      <Input
        title="Edad"
        type="number"
        valor={edad}
        error={erroredad}
        sistemaMet={(e) => {
          validarEdad(e.target.value);
        }}
      />
      <Input
        title="Peso"
        type="number"
        valor={peso}
        error={errorpeso}
        sistemaMet={(e) => {
          validarPeso(e.target.value,sistema.tipo);
        }}
      />
      <Input
        title="Altura"
        type="number"
        valor={altura}
        error={erroraltura}
        sistemaMet={(e) => {
          validarAltura(e.target.value,sistema.tipo);
        }}
      />

      <div className='resultado'>
          <h3>Estas son tus Calorias</h3>
        
         {errorcalorias ? <span >{errorcalorias}</span> : <span>{calorias} cal</span>}
      </div>


    </div>
  )
}

export default index
