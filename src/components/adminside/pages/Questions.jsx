import { useEffect, useState } from "react"
import api from "../../../services/api"

function Questions() {

    const [question, setQuestion] = useState([])

    useEffect(() => {

        const fetchAllQuestion = async () => {
            const res = await api.get('listquesiton')

            setQuestion(res.data)
        }

    }, [])

    return(
        <div>
            <div >
                <h1 className="text-xl">Question</h1>

                {question.map((quest , index) => (
                    <div key={index} className="border border-slate-700 mt-6 p-4">
                        <h1>{quest.title} </h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Questions