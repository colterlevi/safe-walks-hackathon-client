import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProtectorSignup from "./ProtectorSignup";
import ProtectorLogin from "./ProtectorLogin"
import WalkerLogin from "./WalkerLogin"
import HomeBtn from "./HomeBtn";
// import { Dialog } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const Login = () => {
    const navigate = useNavigate()
    const [showProtector, setShowProtector] = useState(false)
    const [showWalker, setShowWalker] = useState(false)

    const handleProtector = () => {
        setShowProtector(true)
        setShowWalker(false)
        // navigate(‘/protectorsignup’)
    }
    const handleWalker = () => {
        setShowWalker(true)
        setShowProtector(false)
        // navigate(‘/walkersignup’)
    }

   

    return (
        <div className="">
            <div className="flex bg-slate-100 bg-opacity-75 backdrop-grayscale  h-28 span-2">
                <HomeBtn />
                <div className="py-3">
                <h1 className="font-sans font-bold text-orange-400 text-left text-6xl" >PONY</h1>
                <h2 className="font-sans font-bold text-orange-400 text-left text-xl" >Protectors of New York</h2>
                </div>
        </div>
            <div className="flex w-screen h-screen gap-x-96 justify-center items-center">
                {showProtector === true ? 
                    <ProtectorLogin />
                    // pony video lol
                    // <div className="justify-center items-center">
                    // <section className="h-96 w-96">
                    //     <div className="video-docker absolute w-96 h-96 overflow-hidden">
                    //         <video className="min-w-full min-h-full absolute object-cover" src="/20141205_Ginuwine - Pony.mp4" type="video/mp4" autoPlay loop></video>
                    //     </div>
                    // </section>
                    // </div> 
                    :
                    <div onClick={() => { handleProtector() }} className="flex justify-center items-center rounded-full bg-slate-100 backdrop-grayscale bg-opacity-75 w-96 h-96 shadow-lg ring-8 ring-transparent text-slate-500 hover:ring-orange-400 hover:text-indigo-500">
                    <h2 className="text-4xl font-semibold">Protector</h2>
            </div> 
                }

                {showWalker === true ? 
                    <WalkerLogin /> :
                    <div onClick={() => { handleWalker() }} className="flex justify-center items-center rounded-full bg-slate-100 backdrop-grayscale bg-opacity-75 w-96 h-96 ring-8 ring-transparent text-slate-500 hover:ring-orange-400 hover:text-indigo-500">
                    <h2 className="text-4xl font-semibold">Walker</h2>
                </div>
                }
        </div>
        </div>
    )
}

export default Login