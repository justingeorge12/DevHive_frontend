import { useEffect, useState } from "react"
import Nav from "../NavFoot/Nav"
import api from "../../../services/api"
import toast from "react-hot-toast"


function ListTags() {

    // const tags = [{name:'python', desc:'Python is a dynamically typed, multi-purpose programming language designed to be quick to learn, understand, and use, with a clean and'},
    //     {name:'javasccript', desc:'For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that'},
    //     {name:'java', desc:'Java is a high-level object-oriented programming language. Use this tag when youre having problems using or understanding the language itself.'},
    //     {name:'php', desc:'Python is a dynamically typed, multi-purpose programming language designed to be quick to learn, understand, and use, with a clean and'},
    //     {name:'android', desc:'For questions about programming in ECMAScript (JavaScript/JS) and its different dialects/implementations (except for ActionScript). Note that'},
    //     {name:'html', desc:'Java is a high-level object-oriented programming language. Use this tag when youre having problems using or understanding the language itself.'},
        
    // ]

    const [tags, setTags] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            try{
                const res = await api.get('listtags')

                if (res.status === 200) {
                    setTags(res.data)
                }
                else{
                    toast.error('there is a error while fetch data')
                }
                

            }

            catch (err) {
                console.log(err)
                if (err.message === "Network Error") {
                    toast.error('server error')
                }
                else{
                    toast.error('error while fetch data')
                }
            }    
        
        }
        
        fetchData()
    },[])

    return(
        <div>
            <Nav />
            <div className="mt-20">
                <div className="m-24 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    {tags.map((tag) =>(

                        <div key={tag.id} className="w-full border border-zinc-800  gap-4 p-3">
                            <h1>{tag.name}</h1>
                            <p className="text-sm"> {tag.description} </p>
                        </div>

                    ))}
                    
                </div>
            </div>
        </div>
    )
}

export default ListTags