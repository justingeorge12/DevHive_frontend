import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import api from "../../../../../services/api"
import Nav from "../../../NavFoot/Nav"

function ProfQuesDetails() {

    const location = useLocation()
    const [quesAnswers, setQuesAnswers] = useState([])
    const [loading, setLoading] = useState(false)
    const question_id = location.state?.question_id || ''
    
    useEffect(() => {
        const fetchAnsw = async () => {
            try{
                setLoading(true)
                const res = await api.get('useranswer')
                setQuesAnswers(res.data)
                console.log(res)
            }
            catch(err) {
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }

        fetchAnsw()

    }, [])


    return(
        <div>
            <Nav />
            <div className="mt-20">
                <div className="m-24 border border-slate-900">
                    <div className="m-6">

                    <div className="p-4 border border-slate-700 rounded-md ">
                        <div className="flex justify-between">

                            <p className="text-lg font-bold text-sky-200"> what is today's moodl sldkfj jf lskjdf slkfjs lfjslfkj sldfjl;k sfljslfkj slfj slfkjls fjslfjlsd fjlskj lskfj ;slfkjaslfk jsldfkj ;alkfdjsls fslfj lsjdflkjsdfkjkdfj skjfksdj fskdj  ? </p>
                            <div className="whitespace-nowrap"> <p className="bg-slate-800 px-1"> 12-3-2024 </p> </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className="flex text-gray-600">
                                #java # sql
                            </div>
                            <p className="text-slate-400">Answers: 89</p>
                        </div>
                        <button className="border w-full border-slate-800 p-2 mt-4 flex justify-center font-semibold text-gray-400 bg-gradient-to-br from-black-050 from-10% via-gray-950 to-black-050 to-90%"> Close Answer </button>

                    </div>

                        <div className="mt-10">
                            {quesAnswers.map((answ) => (
                                <div className="p-4 border border-slate-900 my-6 flex justify-between">
                                    <div dangerouslySetInnerHTML={{ __html: answ.body }}  />
                                    <div className=" px-2 border border-slate-800 flex items-center">
                                        <div>
                                            <button className=" whitespace-nowrap border border-slate-800 text-green-300 p-2 flex justify-center">Accept answer</button>
                                        </div>
                                    </div>
                                </div>
                            
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfQuesDetails