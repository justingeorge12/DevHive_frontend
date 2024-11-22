import { useLocation, useNavigate } from "react-router-dom"
import api from "../../../../../services/api"
import { useEffect, useState } from "react"
import Nav from "../../../NavFoot/Nav"
import AddAddressModal from "../Modal/AddAddressModal"
import CommonConfirmModal from "../Modal/CommonConfirmModal"
import toast from "react-hot-toast"

function OneProductView() {

    const location = useLocation()
    const navigate = useNavigate()

    const product_id = location.state?.product_id || ''
    const [productDetail, setProductDetail] = useState([])
    const [userCoins, setUserCoins] = useState(null)
    const [addressLoading, setAddressLoading] = useState(false)
    const [userAddress, setUserAddress] = useState([])
    const [addressModalOpen, setAddressModalOpen] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [orderConfirmModal, setOrderConfirmModal] = useState(false)

    const fetchProduct = async () => {
        try{

            const res = await api.get(`userproduct/${product_id}`)
            setProductDetail(res.data)
            if (res.data.quantity < 1) {
                navigate('/store')
            }
            console.log(res)
        }
        catch(err) {
            navigate('/store')
            if (err.response.data.detail === 'You do not have enough coins to access this product.'){
                toast.error('You do not have enough coins to access this product.')
            }
        }
    }

    const fetchUserCoin = async () => {
        const res = await api.get(`/usercoins`)
        if (res.status == 200){
            setUserCoins(res.data)
        }

    }



    const fetchAddress = async () => {
        setAddressLoading(true)
        try{
            const res = await api.get('useraddress')
            setUserAddress(res.data)
            console.log(res, 'addddddddddddddrssssssss')
        }
        catch(err) {
            console.log(err)
            
        }
        finally{
            setAddressLoading(false)
        }
    }

    useEffect(() => {
        fetchUserCoin()
        fetchProduct()
        fetchAddress()

    }, [])


    const handleAddressSelect = (address) => {
        setSelectedAddress(address); // Store the selected address
        setIsDropdownOpen(false); // Close the dropdown
      };

    
    const orderProduct = async () => {
        setOrderConfirmModal(false)

        try{
            const res = await api.post('createorder/', {product_id:product_id, address_id:selectedAddress.id})
            console.log(res.data)
            if (res.status === 201){
                navigate('/ordersuccess', {state:{address:selectedAddress, product:productDetail, orderdetail:res.data}})
            }
        }
        catch (err) {
            if (err.response && err.response.data){
                navigate('/ordercancel', {state:{detail:err.response.data}})
            }
            else{
                toast.error('there is some error while ordering, try after some time')
            }
        }
    }


      

    return(
        <div>
            <Nav />
            <div className="mt-24">
                <div className="m-2 mx-10 opacity-70 justify-end flex ">
                    <div className="border p-2 px-4 rounded-md flex">
                        <p className="font-bold font-mono text-xs sm:text-sm md:text-base">Your coins : </p>
                        <p className="font-mono text-xs sm:text-sm md:text-base">🪙 {userCoins?.coins}</p>
                    </div>
                </div>
                

                <div className=" mx-10 border-slate-700">
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                        <div className="flex justify-center">
                            <img src={productDetail.image} alt="" className="h-64 rounded-md"/>
                        </div>
                        <div className="p-4">
                            <div>
                                <h1 className="text-2xl font-black">{productDetail.name}</h1>
                                <h1 className="text-lg mt-3 text-slate-400">{productDetail.description}</h1>
                                <h1 className="mt-1 text-slate-400">You need <span className="text-orange-300 font-bold">   {productDetail.coins} </span> for order this item</h1>
                            </div>
                        </div>
                        <div className="p-4 border relative  border-slate-800 ">
                            <div className="flex">
                                <h1 className="border-b px-4 font-mono text-lg">Address</h1>
                            </div>
                            <div className="relative">
                                <div  className="flex justify-between text-slate-400 cursor-pointer  ">
                                    <h1 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{selectedAddress ? `${selectedAddress.name}, ${selectedAddress.address},${selectedAddress.city}` : 'Select Address.....▽'}  </h1>
                                    {userAddress.length < 3 ?
                                        <button onClick={() => setAddressModalOpen(true)} className="border px-2 py-1 border-blue-900 text-blue-700 rounded-md">add address</button>
                                    :
                                    <div className="relative group inline-block">
                                        <button data-tooltip-target="tooltip" type="button" className="border px-2 py-1 border-zinc-500 text-zinc-500 rounded-md cursor-not-allowed"> add address</button>
                                        <div id="tooltip" role="tooltip"  className="absolute z-10 invisible group-hover:visible p-2 text-sm font-medium bg-gray-900 rounded-lg shadow-sm ">
                                            You can only add address up to 3. You may edit an existing address or delete one to try again.
                                        </div>
                                    </div>
                                    }
                                    
                                </div>
                                

                                {isDropdownOpen && (
                                    <div className="absolute mt-2 w-full border border-slate-600 rounded-md z-10" >
                                        {addressLoading ?
                                            (
                                            <p className="p-2 text-slate-300"> Loading....</p>
                                        )
                                        :
                                        userAddress.length > 0 ? 
                                            (
                                                <div className="p-2 space-y-2">
                                                    {userAddress.map((data,ndx) => (
                                                        <div key={ndx} className="flex items-center gap-2 p-2 border border-slate-800 rounded-md">
                                                            <input type="radio" id={`address-${ndx}`} name="selectedAddress" value={data.id} onChange={() => handleAddressSelect(data)} checked={selectedAddress?.id === data.id} className="cursor-pointer" />
                                                            <label htmlFor={`address-${ndx}`} className="cursor-pointer">
                                                                <p className="text-slate-400">{data.name}, {data.address}, {data.city}</p>
                                                                <p className="text-slate-400 text-sm">{data.state}, {data.country}, {data.pincode}, {data.number} </p>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )
                                            :
                                            (
                                                <p className="p-2 text-slate-600"> No address added</p>
                                            )}
                                    </div>
                                )}

                            </div>


                        </div>
                    </div>
                </div>
                
                {addressModalOpen &&
                    <AddAddressModal onClose={() => setAddressModalOpen(false)} fetchAddress={fetchAddress} />
                }

                {orderConfirmModal && 
                    <CommonConfirmModal onClose={() => setOrderConfirmModal(false)} message={'place the order'} orderProduct={orderProduct} />
                }

            </div>
            {selectedAddress ? 
                <div className="mt-20 ">
                    <button onClick={() => setOrderConfirmModal(true)} className="w-full border border-slate-800 p-2 text-lg font-semibold bg-gradient-to-r from-black-050 via-blue-950 to-black-050 ">Place Order</button>
                </div>
            : 
                <div className="mt-20 ">
                    <button className="w-full border border-slate-800 p-2 text-lg font-semibold cursor-not-allowed bg-gradient-to-r from-black-050 via-zinc-700 to-black-050 ">Place Order</button>
                </div>
            }
        </div>
    )
}

export default OneProductView