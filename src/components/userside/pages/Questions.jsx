import { useEffect, useState } from "react"
import Nav from "../NavFoot/Nav"
import noProfile from '../../../assets/images/noProfile.jpg'
import { useNavigate } from "react-router-dom"

import { MdBookmarkAdd } from "react-icons/md";
import api from "../../../services/api";
import toast from "react-hot-toast";


function Questions() {

    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [sortOptions, setSortOptions] = useState(false)
    const [filterOptions, setFilterOptions] = useState(false)
    const [questions, setQuestions] = useState([])
    const [userVote, setUserVote] = useState('')
    const [filter, setFilter] = useState('votes');
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])

    const [totalQuestion, settotalQuestion] = useState(null)
    const [nextUrl, setNextUrl] = useState('questionlist?filter=&page=1');
    

    // this useEffect is I made for after asking question(askQuestionpage) it should go to questin page and sort as newest so his question comes as first

    // useEffect(() => {
    //     const statefilter = location.state?.statefilter || '';

    //     if (statefilter) {
    //         setFilter('newest');
    //         setNextUrl('questionlist?filter=newest&page=1');
    //     }
    // }, [location.state?.statefilter]);










    
    // if(searchResult) {
    //     setQuestions(searchResult)
    // }


    const fetchQuestion = async () => {
        setLoading(true)
        try{
            const res = await api.get(nextUrl);
            settotalQuestion(res.data.count)
            const newQuestions = res.data.results || [];
            console.log(newQuestions)

            setQuestions(prevQuestions => {
                const existingIds = new Set(prevQuestions.map(q => q.id));
                return [...prevQuestions, ...newQuestions.filter(q => !existingIds.has(q.id))];
            });

            setNextUrl(res.data.next || null);

        }
        catch(err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    
    }

    useEffect(() => {

        fetchQuestion()
    }, [ filter])


    const handleLoadMore = () => {
        if (nextUrl) {
            fetchQuestion();
        }
    }


    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setQuestions([]); 
        setNextUrl(`questionlist?filter=${newFilter}&page=1`);
    };


    const handleVote = async (id , type) => {
        try{
            const res = await api.post('managequesvote',{question_id:id, vote_type:type})
            console.log(res)

            if(res.status === 200) {
                const { tot_posvote, tot_negvote} = res.data;
                toast('thanks for your feedback 🪄')

                setQuestions(prevQuestions => prevQuestions.map(question => 
                    question.id === id ? {...question, pos_vote:tot_posvote, neg_vote:tot_negvote}
                    :
                    question
                ))
            }
        }
        catch(err) {
            console.log(err)
            if (err.status === 403) {
                toast.error('you cannot upvote or downvote for your own question')
            }
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

    const handleSearch = async (e) => {
        e.preventDefault()
        if(search.trim() === ''){
            return
        }
        try{
            setLoading(true)
            const res = await api.get(`/elasticsearchquestion?q=${search}`)
            setSearchResult(res.data.results)
            setQuestions(res.data.results);

            console.log(res.data.results,'--------')
        }
        catch (err) {
            console.log(err)

            toast.error('there is a error while search')
        }
        finally{
            setLoading(false)
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

                    <form onSubmit={handleSearch}>
                        <div className="flex justify-center">
                            <input onChange={(e) => setSearch(e.target.value)} type="text" className="bg-black-050 border border-zinc-500 rounded-lg p-1 w-2/5 pl-2" placeholder="search.."/>
                        </div>
                    </form>

                    <div className="flex justify-between mt-6">
                        <div className=""> {totalQuestion} Questions</div>
                        <div>
                            <div className="flex gap-2 justify-end">
                                {sortOptions && 
                                <div className="p-1 px-3 text-zinc-400 rounded-md border border-zinc-600 flex gap-3 ">
                                    <p onClick={() => handleFilterChange('active')} className="cursor-pointer">Active</p>
                                    <p onClick={() => handleFilterChange('answered')} className="cursor-pointer">Answered</p>
                                    <p onClick={() => handleFilterChange('accepted')} className="cursor-pointer">Accepted</p>
                                    <p onClick={() => handleFilterChange('unanswered')} className="cursor-pointer">UnAnswered</p>
                                </div>
                                }
                                <button onClick={() => setSortOptions(!sortOptions)} className="p-1 border border-black-050 text-gray-300"> ↜ sort</button>
                            </div>
                            <div className="flex justify-end mt-1 gap-1">
                                {filterOptions && 
                                <div className="p-1 px-3 text-zinc-400 rounded-md border border-zinc-600 flex gap-3 ">
                                    <p onClick={() => handleFilterChange('votes')} className="cursor-pointer">votes</p>
                                    <p onClick={() => handleFilterChange('newest')} className="cursor-pointer">Newest</p>
                                    <p onClick={() => handleFilterChange('alphabet')} className="cursor-pointer">alphabet</p>
                                </div>
                                }
                                <button onClick={() => setFilterOptions(!filterOptions)} className="p-1 border border-black-050 text-gray-300 " >↜ filter</button>
                            </div>
                        </div>
                    </div>


                    {questions.length ===0 && 
                    <div>
                        <div className="mt-10 p-4 border border-red-200 ">
                            <p> there are no question <span className="text-red-500"> !!!! </span></p> 
                        </div>
                    </div>
                    }

                    {questions.map((question) => (

                        
                        <div key={question.id} className="border border-neutral-900 mt-16 p-6 shadow-md shadow-zinc-800 rounded-md bg-gradient-to-tl from-black via-slate-950 to-black-050">
                        <div className="pl-4 py-1 border border-slate-900  bg-gradient-to-tr from-slate-900 via-black-050 to-black-050 ">
                            <div className="flex justify-between">
                                <div className="flex gap-2 items-center">
                                    <img src={question.user.profile || noProfile } alt="profile" className="h-12 w-12 rounded" />
                                    <p className="font-semibold">{question.user.username} </p>
                                </div>
                                <div className="mr-2">
                                    <div className="flex items-center">
                                        <p className="mr-4 text-green-300">{question.accepted && <span>Accepted </span> } </p>
                                        <div>
                                            <p className="flex justify-end text-xs text-orange-100">asked on {question.created} </p>
                                            <p className="bg-slate-700 mt-1 px-1 ml-4 pl-2 rounded text-slate-400 border border-gray-800">Answers {question.answer_count} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 border border-neutral-900 pl-4">
                            <h1 onClick={() => navigate('/answer',{state:{question_id:question.id}})} className="text-lg font-bold text-sky-200 cursor-pointer"> {question.title} <span className="text-gray-600"> {question.closed ? '[ Closed ]' : ''} </span> </h1>
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
                                <MdBookmarkAdd onClick={() => handleSave(question.id)} size={22} color="gray" className="cursor-pointer" />
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-4 mt-2">{question.pos_vote} </div>
                            <div className="pl-12 mt-2">{question.neg_vote} </div>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="flex justify-center mb-6">
                    {nextUrl && (
                        <button onClick={handleLoadMore} disabled={loading} className="mt-4 p-2 bg-red-500  rounded text-gray-200">
                            {loading ? 'Loading...' : 'Load more'}
                        </button>
                    )}
                </div>



            </div>
            <div className="h-1 shadow-2xl shadow-red-500 bg-gradient-to-r from-lime-400 via-orange-400 to-green-400"></div>
        </div>
    )
}

export default Questions 