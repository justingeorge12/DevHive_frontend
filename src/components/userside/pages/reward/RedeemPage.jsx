import Bot from '../../../../assets/images/deBot.webp'
import cap from '../../../../assets/images/cap.png'
import hoodie from '../../../../assets/images/hoodie_.jpeg'
import { useEffect, useState } from 'react'
import api from '../../../../services/api'
import { useNavigate } from 'react-router-dom'


function RedeemPage() {

    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [userCoins, setUserCoins] = useState(null)


    const fetchUser = async () => {
        const res = await api.get('userproduct')
        setProducts(res.data)
    }

    const fetchUserCoin = async () => {
        const res = await api.get(`/usercoins`)
        if (res.status == 200){
            setUserCoins(res.data)
        }
    }

    useEffect(() => {
        fetchUser()
        fetchUserCoin()
    }, [])

    return(
        <div>
                <div className="m-10 border border-slate-900">
                    <div className=" m-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                        {products.map((product, ndx) => (
                            <div key={ndx} className="border my-6 border-zinc-700 p-2  rounded-md w-72 shadow-md shadow-slate-700 hover:shadow-zinc-600">
                                <div className='border border-slate-800 p-1 '>
                                    <div className="flex justify-center rounded-md">
                                        <img src={product.image} alt="" className="h-56 rounded-md" />
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <div className="mt-4 mx-2 ">
                                            <h1 className="font-bold">{product.name}</h1>
                                            <p className="text-sm text-gray-400"> {product.description}  </p>
                                        </div>
                                        <div className='mt-4 mx-2 '>
                                        {product.coins <= userCoins?.coins ? 
                                            <button onClick={() => navigate('/oneproductview', {state:{product_id:product.id}})} className='px-2 py-1 bg-blue-900 rounded-md'>{product.coins}</button>
                                        :
                                            <button className='px-2 py-1 bg-zinc-800 cursor-not-allowed rounded-md'>{product.coins}</button>
                                        }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
    )
}

export default RedeemPage