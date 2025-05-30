import React from "react";
import "../styles/Input.css"

const Input = ({title,type,valor,sistemaMet,error=""})=> {


    return (

        <div className='contenedor'>      
                <div className="title">
                     <span>{title}</span>
                </div>
               <div >
                
                <input 
                className={`input  ${error ? "error":""}` }
                type={type}
                value={valor}
                onChange={(e) => {
                    sistemaMet(e) ;
                }}
            /> 

            </div>
             <div className="name"> <span >{error}</span></div>
    
        </div>
    )
}
export default Input