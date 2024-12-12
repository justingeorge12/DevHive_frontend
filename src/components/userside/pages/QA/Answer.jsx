import Nav from "../../NavFoot/Nav"
import avatar from '../../../../assets/images/noProfile.jpg'
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../../../services/api"

import ReactQuill from 'react-quill';
import toast from "react-hot-toast"
import { MdBookmarkAdd } from "react-icons/md";

import { useRef } from "react"


function Answer() {

    const location = useLocation()
    const navigate = useNavigate()

    const question_id = location.state?.question_id || ''

    const [quesDetails, setQuesDetails] = useState({})
    const [value, setValue] = useState('')
    const [answers, setAnswers] = useState([])
    const [loading, setLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchQuesDetails = async () => {
        
        try{
            setLoading(true)
            const res = await api.get(`questionmanage/${question_id}`)
            
            setQuesDetails(res.data)
            console.log(res, 'qqq')
        }
        catch (err) {
            console.log(err)
            toast.error(err)
        }
        finally{
            setLoading(false)
        }
        
    }
    
    const fetchAnswer = async () => {

        try{
            setLoading(true)
            const res = await api.get('addlistanswer', {params:{question_id:question_id}})
            
            setAnswers(res.data)
            
            console.log(res)
        } 
        catch (err) {
            console.log(err)
            toast.error('there is a error, try again after some time')
        }
        finally{
            setLoading(false)
        }
    }
    
    useEffect(() => {

        fetchQuesDetails()
        fetchAnswer()
    },[])



    

    const modules = {
        toolbar: [
          [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'align': [] }],
          [{ 'color': [] }, { 'background': [] }],
          ['link', 'image'],
          ['clean']  // remove formatting button
        ],
      };
    
    
      const formats = [
        'header', 'font',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'align', 'color', 'background',
        'link', 'image'
      ];



    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(value.length)
        console.log(value)

        if (!value.trim()) {
            toast.error('Answer cannot be empty!');
            return;
        }

        if (value.trim().split(/\s+/).length < 8 ){
            toast.error( 'there should be atleast 8 words in the answer' )
            return

        }

        try{
            setIsSubmitting(true);
            const res = await api.post('addlistanswer',{question:question_id, body:value})

            setValue('')

            if (res.status === 201 ) {
                toast.success('answer is successfully addedd')
                // fetchAnswer()
                console.log(res.data)
                const newAnswer = res.data;
                setAnswers((prevAnswers) => [newAnswer, ...prevAnswers]);

            }
        }
        catch (err) {
            console.log(err)
            setValue('')
            toast.error('there is a isssue with submition')
        }
        finally{
            setIsSubmitting(false)
        }

        
    }


    
    const handleVote = async (id , type) => {
        try{
            const res = await api.post('manageanswervote',{answer_id:id, vote_type:type})
            if(res.status === 200) {

                const { pos_vote, neg_vote} = res.data;

                toast('thanks for your feedback 🪄')

                setAnswers(prevAnswer => prevAnswer.map(answer => 
                    answer.id === id ? {...answer, pos_vote:pos_vote, neg_vote:neg_vote }
                    :
                    answer
                ))
            }

        }


        catch(err) {
            console.log(err)
            if (err.status === 403) {
                toast.error('you cannot upvote or downvote for your own answer')
            }
        }
    }


    const handleAnswerSave = async (answer_id,question_id ) => {

        try{
            const res = await api.post('saveanswer', {answer_id:answer_id, question_id:question_id})
            
            if (res.data === "your answer is saved successfully ") {
                toast.success(res.data)
            } 
            else{
                toast.error(res.data)
            }

        }
        catch(err) {
            console.log(err)
            toast.error('there is a error with saving the question')
        }
    }


    const formRef = useRef(null); 

    const scrollToForm = () => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };


    return(
        <div>
            <Nav />
            <div className="mt-20">
                <div className="m-24">
                    <div className="border border-gray-800 rounded-md">
                        <div className="m-6">
                            <div className="flex justify-end border rounded-lg gap-4 border-slate-800">
                                <p className="text-sm mt-1"> <span className="text-slate-400">asked:</span> {quesDetails.created} </p>
                                <div className="items-center flex gap-2 bg-slate-900 px-2 py-1 rounded-md">
                                    <img onClick={() => navigate(`/${quesDetails.user?.username}`,{state:{user_id:quesDetails.user?.id}})} src={quesDetails.user?.profile || avatar} className="h-12 w-12 rounded" alt="" />
                                    <div className="text-sm">
                                        <p>{quesDetails.user?.username} </p>
                                        <p className="text-xs text-gray-400">‣ {quesDetails.user?.total_votes}</p>
                                    </div>
                                </div>
                               
                            </div>
                            <h1 className="text-lg font-bold text-sky-300"> {quesDetails.title} <span className="text-gray-600"> {quesDetails.closed ? '[ Closed ]' : ''} </span> </h1>
                            <div className="mt-1 p-1 text-red-100" dangerouslySetInnerHTML={{ __html: quesDetails.body }} />
                            
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="flex justify-between">
                            <h1 className="text-3xl font-bold text-slate-300">Answers [ {quesDetails.answer_count} ]</h1>
                            {quesDetails.closed ? '' :
                            <button onClick={scrollToForm} className="p-2 md:text-sm text-xs text-neutral-400 border rounded-md border-x-orange-400 border-r-green-300 border-t-yellow-300 border-lime-300">YOUR ANSWER</button>
                            }

                        </div>

                        {answers.length === 0 ? 
                        <div className="mt-6 p-4 border border-red-200 ">
                            <p> There are no answer for this question <span className="text-red-500"> !!!! </span></p> 
                        </div>
                        : ''}


                        {answers.map((ans, index) => (
                            <div key={index} className="mt-10">
                                
                            <div className="border border-slate-700 shadow-md rounded-md bg-gradient-to-tl from-black-050 via-slate-950 to-black-050">
                                
                                <div className="m-6">
                                    <div className="border border-slate-900 flex items-center p-2">
                                        <img onClick={() => navigate(`/${ans.user.username}`)} src={ans.user.profile} alt="" className="h-12 w-12 rounded cursor-pointer" />
                                        <h1 onClick={() => navigate(`/${ans.user.username}`)} className="ml-6 cursor-pointer"> {ans.user.username} </h1>
                                    </div>
                                    <div className="mt-4 border border-slate-900 p-2">
                                        <div className="mt-1 p-1 text-red-100" dangerouslySetInnerHTML={{ __html: ans.body }} />
                                    </div>

                                    <div className="flex justify-between mt-6 p-2">
                                        <div className="flex gap-4">
                                        {/* <p onClick={() => console.log('upvoteddd')} className="text-red-200"><span className="text-xs text-gray-400">upvote </span>⇧</p>
                                            <p className="text-red-200"><span className="text-xs text-gray-400">downvote</span> ⇩</p> */}
                                                <p onClick={() => {handleVote(ans.id, 'upvote'); console.log('upvottted')}} className="text-red-200 cursor-pointer"><span className="text-xs text-gray-400">upvote </span>⇧</p> 
                                                <p onClick={() => {handleVote(ans.id, 'downvote'); console.log('downvoteddddd')} } className="text-red-200 cursor-pointer"><span className="text-xs text-gray-400">downvote</span> ⇩</p>
                                        </div>
                                        <div>
                                            <MdBookmarkAdd onClick={() => handleAnswerSave(ans.id, ans.question)} size={22} color="gray" className="cursor-pointer" />

                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="px-4 ">{ans.pos_vote} </div>
                                        <div className="pl-12">{ans.neg_vote} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}



                    </div>

                    
                    <div className="mt-10 ">
                        {quesDetails.closed ? 
                         <div className="border border-slate-600 p-2 justify-center flex ">
                            <p>
                                You cannot add answer ! Answers is closed by Questioner
                            </p>
                         </div> 
                        : 
                            <div ref={formRef}>
                                <form onSubmit={handleSubmit}>
                                    <h1 className="text-2xl">Add your answer</h1>
                                    <div className="mt-4">
                                        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
                                    </div>
                                    <button disabled={isSubmitting} className=" mt-6 bg-gradient-to-r from-slate-800 via-slate-950 to-slate-800 w-full py-2 rounded-md shadow-sm shadow-slate-800 font-bold  text-red-100 hover:text-orange-300 ">{isSubmitting ? 'Posting...' : 'Post Answer'}</button>
                                </form>
                            </div>
                        }
                        
                    </div>

                </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-lime-400 via-orange-400 to-green-400"></div>

        </div>
    )
}

export default Answer


