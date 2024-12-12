import { useEffect, useState } from "react"
import api from "../../../../services/api"
import { useNavigate } from "react-router-dom"


function AnswerComo() {

    const navigate = useNavigate()
    const [userAnsw, setUserAnsw] = useState([])
    const [answLen, setAnswLen] = useState(null)

    useEffect(() => {

        const fetchUserAnsw = async () => {

            try{
                const res = await api.get('useranswer')
                console.log(res.data, '-------------------------------')
                setUserAnsw(res.data)
                setAnswLen(res.data.length)
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchUserAnsw()

    }, [])


    return(
        <div>
           <div >
                <h1 className="text-xl">Answers [ {answLen} ] </h1>

                {userAnsw.map((answ , index) => (
                    <div key={index} className="border border-slate-700 mt-6 p-4 cursor-pointer">
                        <div onClick={() => navigate(`/useranswer/${answ.id}`)} className="mt-1 p-1 text-red-100" dangerouslySetInnerHTML={{ __html: answ.body }} />
                        <div className="flex gap-4 mt-4">
                            <p className="text-gray-300 border border-gray-800 rounded-sm px-2"><span className="text-slate-400 text-sm">⇧ : </span>  {answ.pos_vote} </p>
                            <p className=" text-gray-300 border border-gray-800 rounded-sm px-2"><span className="text-slate-300 text-sm">⇩ : </span> {answ.neg_vote} </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnswerComo