import React from "react";

const Select = ({item,sistemaMet}) => {
    
    return (
        <div>
            <select onChange={(e) => {
                sistemaMet(e);
            }}>

                {item.map((i) => {
                    return <option key={i.value} value={i.value}>{i.descripcion}</option>;
                })}
            </select>
        </div>
    )
}
export default Select