import React from "react";
import "./Recognition.css";

const Rec = ({imglink,boxpos,concept})=>{
    // console.log(boxpos);
    // console.log(concept);
    return(
        <div className="flex w-auto h-[33vh] justify-center items-center">
        <div className="absolute">
            <img className=" inputimg rounded-xl shadow-2xl w-auto h-[33vh]" alt="" src={imglink}></img>
            <div style={{top:boxpos.top_row, bottom:boxpos.bottom_row, right:boxpos.right_col, left:boxpos.left_col}} className="bounding_box absolute z-20 border-[3px] translate-x-[-10%] border-blue-400">
                <p className=" bg-blue-500 text-[12px] p-1 rounded-xl w-fit translate-x-[-100%]">{concept}</p>
            </div>
        </div>
        </div>
    )
}

export default Rec;
