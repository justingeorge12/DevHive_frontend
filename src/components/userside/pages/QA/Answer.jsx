import Nav from "../../NavFoot/Nav"
import avatar from '../../../../assets/images/hjwrE.png'
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import api from "../../../../services/api"

import ReactQuill from 'react-quill';
import toast from "react-hot-toast"
import { MdBookmarkAdd } from "react-icons/md";

import { useRef } from "react"


function Answer() {

    const location = useLocation()

    const question_id = location.state?.question_id || ''

    const [quesDetails, setQuesDetails] = useState({})
    const [value, setValue] = useState('')
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        const fetchQuesDetails = async () => {

            try{
                const res = await api.get(`questionmanage/${question_id}`)
                
                setQuesDetails(res.data)
            }
            catch (err) {
                console.log(err)
                toast.error(err)
            }
            
        }

        const fetchAnswer = async () => {
            
            const res = await api.get('addlistanswer', {params:{question_id:question_id}})

            setAnswers(res.data)
        }


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

        try{
            const res = await api.post('addlistanswer',{question:question_id, body:value})
            console.log(res, 'rslt  ')
            setValue('')

            if (res.status === 201 ) {
                toast.success('answer is successfully addedd')
            }
        }
        catch (err) {
            console.log(err)
            setValue('')
            toast.error('there is a isssue with submition')
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
                            <h1 className="text-lg font-bold text-sky-300"> {quesDetails.title} </h1>
                            <div className="mt-1 p-1 text-red-100" dangerouslySetInnerHTML={{ __html: quesDetails.body }} />
                            
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="flex justify-between">
                            <h1 className="text-3xl font-bold text-slate-300">Answers</h1>
                            <button onClick={scrollToForm} className="p-2 md:text-sm text-xs text-neutral-400 border rounded-md border-x-orange-400 border-r-green-300 border-t-yellow-300 border-lime-300">YOUR ANSWER</button>

                        </div>

                        {answers.length === 0 ? 
                        <div className="mt-6 p-4 border border-red-200 ">
                            <p> there are no answer for this question <span className="text-red-500"> !!!! </span></p> 
                        </div>
                        : ''}


                        {answers.map((ans, index) => (
                            <div key={index} className="mt-10">
                            <div className="border border-slate-700 shadow-md rounded-md bg-gradient-to-tl from-black-050 via-slate-950 to-black-050">
                                <div className="m-6">
                                    <div className="border border-slate-900 flex items-center p-2">
                                        <img src={avatar} alt="" className="h-12 w-12 rounded" />
                                        <h1 className="ml-6"> Muhammed Muhammed </h1>
                                    </div>
                                    <div className="mt-4 border border-slate-900 p-2">
                                    <div className="mt-1 p-1 text-red-100" dangerouslySetInnerHTML={{ __html: ans.body }} />

                                    </div>

                                    <div className="flex justify-between mt-6 p-2">
                                        <div className="flex gap-4">
                                        <p onClick={() => console.log('upvoteddd')} className="text-red-200"><span className="text-xs text-gray-400">upvote </span>⇧</p>
                                            <p className="text-red-200"><span className="text-xs text-gray-400">downvote</span> ⇩</p>
                                        </div>
                                        <div>
                                            <MdBookmarkAdd size={22} color="gray" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}



                    </div>

                    <div className="mt-10 ">
                        <div ref={formRef}>
                            <form onSubmit={handleSubmit}>
                                <h1 className="text-2xl">Add your answer</h1>
                                <div className="mt-4">
                                    <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
                                </div>
                                <button className=" mt-6 bg-gradient-to-r from-slate-800 via-slate-950 to-slate-800 w-full py-2 rounded-md shadow-sm shadow-slate-800 font-bold  text-red-100 hover:text-orange-300 ">Post answer</button>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-lime-400 via-orange-400 to-green-400"></div>

        </div>
    )
}

export default Answer


