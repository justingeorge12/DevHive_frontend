import { useNavigate } from "react-router-dom"

function EarnCoinPage() {


    const navigate = useNavigate()

    return(
        <div className="m-10 border border-slate-900">
            <div className="m-4 flex justify-around">
                <div className="w-80 border border-slate-800 p-5">
                    <div className="flex gap-6 items-center">
                        <div className="">
                            <p> 🪙</p>
                            <p> +4 </p>  
                        </div>
                        <div>
                            <p className="text-zinc-400">once you get upvote for your answer you will get 4 coins</p>
                            <button onClick={() => navigate('/profile', {state:{answer:'openanswer'}})} className="border border-slate-700 text-orange-100 mt-4 px-2 py-1 rounded-md w-full">check your answers  »</button>
                        </div>
                    </div>
                </div>
                <div className="w-80 border border-slate-800 p-5">
                    <div className="flex gap-6 items-center">
                        <div className="">
                            <p> 🪙</p>
                            <p> +2 </p> 
                        </div>
                        <div>
                            <p className="text-zinc-400">once you get upvote for your question you will get 2 coins</p>
                            <button onClick={() => navigate('/profile', {state:{question:'openquestion'}})} className="border border-slate-700 text-orange-100 mt-4 px-2 py-1 rounded-md w-full">check your question » </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EarnCoinPage

