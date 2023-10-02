import React from "react";

const Rank = ({name,entries})=>{
    return(
        <div className="flex justify-center items-center rounded-xl text-xl">
            {name} your current entry count is {entries}
        </div>
    )
}

export default Rank;