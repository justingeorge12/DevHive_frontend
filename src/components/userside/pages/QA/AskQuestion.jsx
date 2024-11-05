import Nav from "../../NavFoot/Nav"
import pic from '../../../../assets/images/Pictoral.webp'
import { TiCode, TiContacts, TiInputChecked } from "react-icons/ti";
import { useState, useCallback } from "react";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

import debouce from 'lodash.debounce'
import api from "../../../../services/api";
import toast from "react-hot-toast";



const modules = {
    toolbar: [
      [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean'] 
    ],
  };


  const formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'align', 'color', 'background',
    'link', 'image'
  ];

function AskQuestion() {

    const [title, setTitle] = useState('')                  // question title
    const [instr, setInstr] = useState(false)               // instruction
    const [value, setValue] = useState('');                 // quill 

    const [tags, setTags] = useState([]);                   // tags
    const [input, setInput] = useState('');                 // tags input

    const [TagDatabase, setTagDatabase] = useState([])      // tag from backend
    // const [suggestion, setSuggestion] = useState()

    const [error, setError] = useState([])                   // error validation
    const [isChecked, setIsChecked] = useState(false)        // checkbox


    const handleKeyDown = (e) => {
        const trimmedInput = input.trim();
    
        if ((e.key === ' ' || e.key === ',') && trimmedInput.length && !tags.includes(trimmedInput)) {
          e.preventDefault();
          setTags([...tags, trimmedInput]);
          setInput('');
        }
    
        // Handle backspace for tag deletion
        if (e.key === 'Backspace' && !input.length && tags.length) {
          const newTags = [...tags];
          const removedTag = newTags.pop();
          setTags(newTags);
          setInput(removedTag);  // Optional: to allow editing of last removed tag
        }
      };


      const handleChange =  (e) => {
        setInput(e.target.value) 
        debouceTag(e.target.value)

    }
    
    const debouceTag = useCallback(
        debouce(async(searchtag) => {
            const res = await api.get('questiontags/',{params:{letter:searchtag}})

            setTagDatabase(res.data)

        }, 1000), []
    )

    const handleTitle = (e) => {
        const newErr = {}
        if (e.target.value.trim() === '') {
            console.log('the title should not be empty')
            newErr.space = 'the title should not be empty'
        }

        else if (e.target.value.trim().split(/\s+/).length < 4) {
            console.log('lenth of question is not engough')
            newErr.wordlen = 'there should be atleast 4 words'
        }
        setError(newErr)
        setTitle(e.target.value)
    }







    
    const validateForm = () => {
        const newErr = {}

        if(title.trim() === '') {
            newErr.title = 'the title should not be empty'
        }
         else if (title.trim().split(/\s+/).length <4 ) {
            newErr.title = 'there should be atleast 4 words in the title'
         }

        if (value.trim().split(/\s+/).length < 8 ){
            newErr.value = 'there should be atleast 8 words in the question details'
        }

        if (tags.length === 0) {
            newErr.tags = 'there should be atleast one tag '
        }

        if (!isChecked) {
            newErr.checkbox = 'you must confirm that your question is not in this platform yet'
        }

        setError(newErr) 
        return Object.keys(newErr).length === 0 
    }











    const handleFormSubmit = async (e) => {
        e.preventDefault()

        if (validateForm() ) {
            try{

                const res = await api.post('questionlist',{title,body:value,tags:tags})
                
                setTitle('')
                setValue('')
                setTags([])
                isChecked(false)
                
                toast.success('your Question submitted successfully')
            } 
            catch(err) {
                console.log(err)
                if (err.status === 400){
                    if(err.response && err.response.data.tags){
                        toast.error(err.response.data.tags[0])
                    }
                }
                else{

                    toast.error('there are some error, please try after some time')
                }
            }
        }

        else{
            toast.error('please fix the errors then submit')
        }











        // const newErr = {}

        // if (tags.length > 0) {
        //     console.log('okey to submit')
        //     if (value.trim().split(/\s+/).length >= 8 ) {
        //         toast.success('can be submitted')
        //     }
        //     else {
        //         newErr.valueLength = 'there should be atleast 8 words'
        //         console.log('there 8 words for value')
        //     }
        // }
        // else{
        //     newErr.countTag = 'there should be atleast one tag'
        //     console.log('there shoul 1 tag')
        // }

        // setError(newErr)
    }


















    console.log(title)
    console.log(value)
    console.log(error, '..................rrror.................')
    console.log(tags)
    console.log(isChecked)
    

    return(
        <div>
            <Nav />
            <div className="mt-20">
                <div className="m-10 mt-24 relative">
                    <div className="flex justify-end">
                        <img src={pic} alt="" className="md:h-[261px] md:w-[421px] sm:h-[195px] sm:w-[315px] h-[130px] w-[210px] filter brightness-50 contrast-12 saturate-50" />
                    </div>
                    <div className="absolute inset-0 mt-4">
                        <div className="ml-24 mt-6">
                            <h1 className="sm:text-2xl md:text-4xl p-4 bg-black-050 sm:bg-transparent text-orange-100">Ask Question to public</h1>
                        </div>
                        <div className="m-10 mt-16 mr-72 h-24 bg-gradient-to-r from-slate-900 via-black to-transparent shadow-md shadow-gray-900">
                            <div className="md:flex justify-around">
                                <div className="mt-2 p-4 shadow-slate-800 bg-gradient-to-r from-black via-transparent to-slate-950 shadow-sm rounded text-emerald-500 font-mono text-sm">
                                    Ask Question
                                </div>
                                <div className="mt-9 p-4 shadow-slate-800 bg-slate-950 shadow-sm text-fuchsia-300 font-mono text-sm">
                                    Get Answer from Public
                                </div>
                                <div className="mt-6 p-4 shadow-slate-800 bg-slate-950 shadow-sm text-red-400 font-mono text-sm">
                                    Solve Your Bugs
                                </div>
                                <div className="mr-12 p-4 shadow-slate-800 bg-gradient-to-r from-slate-900 via-black to-transparent shadow-sm text-cyan-200 font-mono text-sm">
                                    Keep Coding
                                </div>
                                <div className="mt-0">
                                    
                                    <TiCode color="yellow" size={40} />
                                </div>
                            </div>
                            
                        </div>

                        <div className="m-10">
                            <p className="text-amber-700 ">When you ask .. 
                                {instr ? <span onClick={() => setInstr(false)} className="ml-36 text-sm cursor-pointer"> ▷ </span>: <span onClick={() => setInstr(true)} className="ml-36 text-sm cursor-pointer"> ▽ </span>}
                            </p>
                            {instr && 
                                <div className="mt-6 p-4 border border-gray-700 text-slate-500">
                                    <p>. Try not to ask the question which already asked, so first check the question is already there in the plateform</p>
                                    <p>. Question should not be a discussion question</p>    
                                    <p>. Ask Technical question only, as it is development helping plateform</p>
                                </div>
                            }

                            <div className="my-20 border border-gray-500">
                                <div className="m-12">
                                    <form onSubmit={handleFormSubmit}>
                                    
                                        <div className="flex flex-col">
                                            <p>Title for your Question</p>
                                            <p className="text-xs text-gray-400">give an understandable question</p>
                                            {error.space && <p className='text-red-400 text-xs flex  justify-end'>{error.space} </p> } 
                                            {error.wordlen && <p className="text-red-400 text-xs flex justify-end">{error.wordlen}</p> }
                                            {error.title && <p className="text-red-400 text-xs">{error.title}</p>}

                                            <input value={title} onChange={handleTitle} type="text" required className="mt-4 bg-black-050 border pl-4 p-2 border-slate-400" placeholder="ask question.."/>
                                        </div>

                                        <div className="mt-10">
                                            <p>What is the details of the problem</p>
                                            <p className="text-xs text-gray-400">explain more about the question</p>
                                            <div className="mt-4">
                                                <div>
                                                    {/* {( value.trim().split(/\s+/).length < 8 )&& <p className="text-red-400 text-xs flex justify-end"> add atleaset 8 words </p> } */}
                                                    {error.value && <p className="text-red-400 text-xs">{error.value}</p>}

                                                    <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10">
                                            <p>Add tags here</p>
                                            <p className="text-xs text-gray-400">add up to 4 tags based about on your question,Please select tag from suggestion</p>
                                            <div className="mt-4">
                                                <div className="tags-container flex gap-3">
                                                    {tags.map((tag, index) => (
                                                    <div key={index} className="tag text-zinc-400">
                                                        {tag} <button className="text-red-500" onClick={() => setTags(tags.filter((_, i) => i !== index))}>x</button>
                                                    </div>
                                                    ))}
                                                </div>
                                                {error.tags && <p className="text-red-400 text-xs">{error.tags}</p>}
                                                <input type="text" value={input} placeholder="Enter a tag" onKeyDown={handleKeyDown} onChange={handleChange} className="bg-black-050 border-slate-400 w-full p-2 border"/>
                                                <div className="p-2 border border-zinc-600">
                                                    {TagDatabase.map((data) => (
                                                        <div>{data.name} </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-10">
                                            <p>Are you trying to ask any of this question</p>
                                            <p className="text-xs text-gray-400">if you find your question, better not to ask your question again</p>
                                            <div className="mt-4">
                                                <div className="border p-2 border-slate-400">
                                                    ⇩
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-6">
                                        {error.checkbox && <p className="text-red-400 text-xs">{error.checkbox}</p>}

                                            <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} className="bg-red-500" /> you are sure that your question not yet in this plateform 
                                        </div>
                                        <div className="mt-6 flex justify-center">
                                            <button type="submit"  className="bg-gradient-to-r from-slate-800 via-slate-950 to-slate-800 w-full py-2 rounded-md shadow-sm shadow-slate-800 font-bold  text-red-100 hover:text-orange-300">Submit Question </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="mb-20 h-1 shadow-2xl shadow-red-500 bg-gradient-to-r from-lime-400 via-orange-400 to-green-400"></div>
                    </div>
                    
                </div>
            </div>
            
        </div>
        
    )
}

export default AskQuestion