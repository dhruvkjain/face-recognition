import React from "react";

const Imagelinkform = ({onInputChange,onDetect})=>{
    return(
        <div className="grid-rows-2 pt-5 p-4 rounded-xl">
            <p className="text-3xl w-full font-bold">Upload an Image URL, TRY ME !</p>
            <div className="flex p-4 justify-center items-center shadow-sm shadow-slate-400">
                <input onChange={onInputChange} className=" text-center rounded-xl w-50 h-10 m-2" type="text"></input>
                <button onClick={onDetect}className="rounded-md w-20 h-10 bg-slate-500">Detect</button>
            </div>
        </div>
    ) 
}

export default Imagelinkform;