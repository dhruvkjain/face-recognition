import React from "react";
import Tilt from 'react-parallax-tilt';

const Logo = ()=>{
    return(
        <Tilt className="w-fit bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl">
        <div className="logo p-2 flex rounded-xl border-4 border-teal-500 w-fit shadow-lg shadow-slate-400" >
            <img className="" src="https://cdn-icons-png.flaticon.com/128/900/900961.png"></img>
        </div>
        </Tilt>
    )
}

export default Logo;