import { useEffect, useState } from "react"
import api from "../../../../services/api"


function AnswerComo() {

    const [userAnsw, setUserAnsw] = useState([])
    const [answLen, setAnswLen] = useState(null)

    useEffect(() => {

        const fetchUserAnsw = async () => {

            try{
                const res = await api.get('useranswer')

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
                    <div key={index} className="border border-slate-700 mt-6 p-4">
                        <div className="mt-1 p-1 text-red-100" dangerouslySetInnerHTML={{ __html: answ.body }} />

                    </div>
                ))}
            </div>
        </div>
    )
}

export default AnswerComo