import React from "react";

const Navigation = ({ changeRoute, isSignedIn }) => {

    if (isSignedIn===true) {
        return (
            <div className="navi flex justify-end rounded-xl">
                <nav onClick={() => changeRoute("signin")} className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3 shadow-inner shadow-sky-400">
                    <p  className="text-2xl text-amber-50 font-bold ">Sign Out</p>
                </nav>
            </div>
        )
    }
    else {
        return(<div></div>)
    }

}

export default Navigation;