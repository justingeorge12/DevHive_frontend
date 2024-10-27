import { useEffect, useState } from "react"
import Nav from "../NavFoot/Nav"
import avatar from '../../../assets/images/hjwrE.png'
import { useNavigate } from "react-router-dom"

import { MdBookmarkAdd } from "react-icons/md";
import api from "../../../services/api";
import toast from "react-hot-toast";


function Questions() {

    const navigate = useNavigate()

    const [sortOptions, setSortOptions] = useState(false)
    const [filterOptions, setFilterOptions] = useState(false)
    const [questions, setQuestions] = useState([])
    const [userVote, setUserVote] = useState('')


    useEffect(() => {
        const fetchQuestion = async () => {
            try{

                const res = await api.get('questionlist')
                
                setQuestions(res.data)
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }

        fetchQuestion()
    }, [userVote])


    const handleVote = async (id , type) => {
        try{
            const res = await api.post('managequesvote',{question_id:id, vote_type:type})

        }
        catch(err) {
            console.log(err)
        }
    }


    const handleSave = async (id) => {
        try{
            const res = await api.post('savequestion',{question_id:id})

            if (res.data === 'your qustion is saved successfully '){
                toast.success(res.data)
            }
            else{
                toast.error(res.data)
            }
        }
        catch(err) {
            console.log(err)
        }
    }



    return(
        <div>
            <Nav />
            <div className="mt-24">
                <div className="lg:m-24 md:m-10 sm:m-4 m-2">
                    <div className="flex justify-between">
                        <h1 className="md:text-3xl sm:text-2xl text-lg font-semibold text-zinc-300 ">All Questions</h1>   
                        <button onClick={() => navigate('/askquestion')} className="p-2 md:text-sm text-xs text-neutral-400 border rounded-md border-x-orange-400 border-r-green-300 border-t-yellow-300 border-lime-300">ASK QUESTION</button>
                    </div>

                    <div className="flex justify-center">
                        <input type="text" className="bg-black-050 border border-zinc-500 rounded-lg p-1 w-2/5 pl-2" placeholder="search.."/>
                    </div>

                    <div className="flex justify-between mt-6">
                        <div className="text-sm">2,355 questions</div>
                        <div>
                            <div className="flex gap-2 justify-end">
                                {sortOptions && 
                                <div className="p-1 px-3 text-zinc-400 rounded-md border border-zinc-600 flex gap-3 ">
                                    <p>Active</p>
                                    <p>Answered</p>
                                    <p>Accepted</p>
                                    <p>UnAnswered</p>
                                </div>
                                }
                                <button onClick={() => setSortOptions(!sortOptions)} className="p-1 border border-black-050 text-gray-300"> ↜ sort</button>
                            </div>
                            <div className="flex justify-end mt-1 gap-1">
                                {filterOptions && 
                                <div className="p-1 px-3 text-zinc-400 rounded-md border border-zinc-600 flex gap-3 ">
                                    <p>votes</p>
                                    <p>Newest</p>
                                    <p>alphabet</p>
                                </div>
                                }
                                <button onClick={() => setFilterOptions(!filterOptions)} className="p-1 border border-black-050 text-gray-300 " >↜ filter</button>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-2">
                        {questions.map((ques) => (

                            <div className="border">
                                <p>{ques.answers}</p>
                                <p>{ques.question}</p>
                                <p>{ques.expl}</p>
                            </div>
                        ))}
                    </div> */}

                    {questions.map((question) => (

                        
                        <div key={question.id} className="border border-neutral-900 mt-16 p-6 shadow-md shadow-zinc-800 rounded-md bg-gradient-to-tl from-black via-slate-950 to-black-050">
                        <div className="pl-4 py-1 border border-slate-900  bg-gradient-to-tr from-slate-900 via-black-050 to-black-050 ">
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <img src={avatar} alt="profile" className="h-12 w-12 rounded" />
                                    <p className="font-semibold">{question.user.username} </p>
                                </div>
                                <div className="mr-2">
                                    <div className="flex items-center">
                                        <p className="mr-4 text-green-300">{question.accepted && <span>Accepted </span> } </p>
                                        <div>
                                            <p className="flex justify-end text-sm text-orange-100">asked on {question.created} </p>
                                            <p className="bg-slate-700 mt-1 px-1 ml-4 pl-2 rounded text-slate-400 border border-gray-800">Answers {question.answer_count} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 border border-neutral-900 pl-4">
                            <h1 onClick={() => navigate('/answer',{state:{question_id:question.id}})} className="text-lg font-bold text-sky-200 cursor-pointer"> {question.title} </h1>
                            <div className="mt-1 p-1 text-red-100" dangerouslySetInnerHTML={{ __html: question.body }} />
                            <div className="flex gap-3 text-slate-400">{question.tags.map((tag, index) => (
                                <p key={index}>{tag} </p>
                            )) } </div>
                        </div>
                        <div className="px-4 mt-2 border border-neutral-900 flex justify-between">
                            <div className="flex gap-4">
                                <p onClick={() => handleVote(question.id, 'upvote')} className="text-red-200 cursor-pointer"><span className="text-xs text-gray-400">upvote </span>⇧</p> 
                                <p onClick={() => handleVote(question.id, 'downvote')} className="text-red-200 cursor-pointer"><span className="text-xs text-gray-400">downvote</span> ⇩</p>
                            </div>
                            <div>
                                <MdBookmarkAdd onClick={() => handleSave(question.id)} size={22} color="gray" />
                            </div>
                        </div>
                        <div className="flex">

                        <div className="px-4 mt-2">{question.pos_vote} </div>
                        <div className="pl-12 mt-2">{question.neg_vote} </div>
                        </div>
                    </div>
                    ))}


                </div>
            </div>
            <div className="h-1 shadow-2xl shadow-red-500 bg-gradient-to-r from-lime-400 via-orange-400 to-green-400"></div>
        </div>
    )
}

export default Questions 