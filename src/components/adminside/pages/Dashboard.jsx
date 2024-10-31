import { useNavigate } from "react-router-dom"
import Nav from "../layout/Nav"

function Dashboard() {

    const navigate = useNavigate()

    return(

            <div>
                <Nav />
                <div className="">
                    <div className="flex flex-col md:flex-row justify-between m-6 space-y-6 md:space-y-0 md:space-x-6">
                        <div className="w-full md:w-[48%] h-[350px] rounded-lg shadow-md bg-black shadow-pink-100 flex items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500">
                            <button></button>
                            <button onClick={() => navigate('users/')} className="absolute top-4 right-4 border border-pink-300 text-pink-200 px-4 py-2 rounded">Uses</button>
                            <div className="m-10  justify-center items-center">
                                <h1 className="font-sans text-xl text-red-100">Find Your Users</h1>
                                <p className="mt-10 text-lg font-mono text-red-200">"Manage your community at a glance! Here’s where you can view and oversee all users on the platform, making sure everything runs smoothly."</p>
                            </div>
                        </div>
                        <div className="w-full md:w-[48%] h-[400px]  rounded-lg shadow-md bg-black shadow-pink-100 flex items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500">
                            <button onClick={() => navigate('allquestions/')} className="absolute top-4 right-4 border border-pink-300 text-pink-300 px-4 py-2 rounded">Questions</button>
                            <div className="m-10  justify-center items-center">
                                <h1 className="font-sans text-xl text-red-100">Questions asked by users</h1>
                                <p className="mt-10 text-lg font-mono text-red-200">"Stay informed and engaged! Here’s where you can explore all the questions from our community, helping us foster a vibrant and knowledgeable environment."</p>
                            </div>
                        </div>
                    </div>     

                    <div className="flex flex-col md:flex-row justify-between m-6 space-y-6 md:space-y-0 md:space-x-6">
                        <div className="w-full md:w-[48%] h-[400px] rounded-lg shadow-md bg-black shadow-pink-100 flex items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500 ">
                            <button onClick={() => navigate('tags/')} className="absolute top-4 right-4 border border-pink-300 text-pink-300 px-4 py-2 rounded">Tags</button>
                            <div className="m-10  justify-center items-center">
                                <h1 className="font-sans text-xl text-red-100">Tags we have</h1>
                                <p className="mt-10 text-lg font-mono text-red-200">"Explore our diverse collection of tags,  Empower your community by managing tags effortlessly."</p>
                            </div>
                        </div>
                        <div className="w-full md:w-[48%] h-[350px]  rounded-lg shadow-md bg-black shadow-pink-100 flex items-center justify-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500">
                            <button className="absolute top-4 right-4 border border-pink-300 text-pink-300 px-4 py-2 rounded">Products</button>
                            <div className="m-10  justify-center items-center">
                                <h1 className="font-sans text-xl text-red-100">Redeem Products</h1>
                                <p className="mt-10 text-lg font-mono text-red-200">"Manage your marketplace with ease! Keep track of products, update listings, and ensure users discover the best offers. Your dashboard, your control!"</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>





    )
}

export default Dashboard
