import Nav from "../../NavFoot/Nav"

import { useEffect, useState } from "react"
import RedeemPage from "./RedeemPage"
import EarnCoinPage from "./EarnCoinPage"
import { useNavigate } from "react-router-dom"
import api from "../../../../services/api"



function Store() {

    const navigate = useNavigate()
    const [redeemSection, setRedeemSection] = useState(true)
    const [getCoinSection, setGetCoinSection] = useState(false)
    const [userCoins, setUserCoins] = useState(null)



    const handleSection = (value) => {
        setRedeemSection(false)
        setGetCoinSection(false)

        if (value === 'redeem'){
            setRedeemSection(true)
        }
        else if (value === 'earn_coin') {
            setGetCoinSection(true)
        }
    }

    const fetchUserCoin = async () => {
        const res = await api.get(`/usercoins`)
        if (res.status == 200){
            setUserCoins(res.data)
        }

    }

    useEffect(() => {
        fetchUserCoin()
    }, [])

    return(

        <div>
            <Nav />
            <div className="mt-20">
                <div className="bg-gradient-to-br from-blue-950 via-black to-blue-950 opacity-40 h-[400px] sm:h-[400px] md:h-[450px] ">
                    <div className="absolute right-4 top-24 sm:right-8 sm:top-16 md:right-12 md:top-24 lg:right-16 lg:top-24">
                        <div className="flex items-center space-x-2 border border-slate-600 p-2 rounded-md ">
                            <p className="font-bold font-mono text-xs sm:text-sm md:text-base">your coins: </p>
                            <p className="font-mono text-xs sm:text-sm md:text-base">🪙 {userCoins?.coins}</p>
                        </div>
                    </div>
    
                    <div className="relative flex flex-col h-full items-center justify-center">
                        <div className="flex flex-col sm:flex-row text-center">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black">DevH<span className="bg-slate-800 text-transparent bg-gradient-to-b from-orange-500 from-30% via-white  to-white  bg-clip-text">i</span>ve&nbsp;</h2>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl"> Store</h2>
                        </div>
                        <div>
                            <p className="text-xl mt-6 font-mono text-center"> Redeem our products for free by using your Coins.</p>
                        </div>
                        <div className="absolute bottom-8">
                            <div className="gap-6 flex">
                                <button onClick={() => handleSection('redeem')} className="border border-slate-500 p-2 rounded-md text-sm sm:text-base sm:font-bold bg-slate-900 hover:bg-blue-900">🎁 Redeem </button>
                                <button onClick={() => handleSection('earn_coin')} className="border border-slate-500 p-2 rounded-md text-sm sm:text-base sm:font-bold bg-slate-900 hover:bg-blue-900"> <span className="text-lg">⨭</span>How to Earn Coins</button>
                                <button onClick={() => navigate('/orderdetails')} className="border border-slate-500 p-2 rounded-md text-sm sm:text-base sm:font-bold bg-slate-900 hover:bg-blue-900"> 🛒View Orders</button>
                            </div>
                                
                        </div>
                    </div>
                </div>
            </div>

            {redeemSection &&
                <RedeemPage />
            }

            {getCoinSection && 
                <EarnCoinPage />
            }

        </div>
    )
}

export default Store