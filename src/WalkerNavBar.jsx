import React from "react";
import { NavLink } from "react-router-dom";
import HomeBtn from "./HomeBtn";


function WalkerNavBar() {
    return (
        <div className='flex bg-slate-100 bg-opacity-75 h-screen w-52 justify-center backdrop-grayscale'>
            <div>
                <ul className='font-semibold text-2xl text-slate-700 uppercase text-center'>
                    <li className="float-none">
                        <HomeBtn />
                    </li>
                    <li className="p-3 hover:text-orange-400">
                        <NavLink to="/requestform" exact>New Request</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-slate-100 border-0 rounded opacity-75 dark:bg-slate-500" />
                    <li className="p-3 hover:text-orange-400">
                        <NavLink to="/walkerscheduledwalk" exact>My Schedule</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-slate-100 border-0 rounded opacity-75 dark:bg-slate-500" />
                    <li className="p-3">
                        <NavLink to="/ongoingrequest" exact>Current Walk</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-slate-100 border-0 rounded opacity-75 dark:bg-slate-500" />
                    <li className="p-3 hover:text-orange-400">
                        <NavLink to="/walkerhistory" exact>Walk History</NavLink>
                    </li>
                    <hr className="w-48 h-1 mx-auto my-1 bg-slate-100 border-0 rounded opacity-75 dark:bg-slate-500" />
                </ul>
            </div>
        </div>
    );
}

export default WalkerNavBar;