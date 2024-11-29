import { useState } from 'react';
import Sidebar from '../../layout/Sidebar';
import api from '../../../../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: "", description: "", coins: "", quantity: "", color: "", image: "" });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        validateField(name, value); // Validate the field dynamically
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm((prev) => ({ ...prev, image: file }));
        validateField('image', file); // Validate file input dynamically
    };

    const validateField = (fieldName, value) => {
        const newErrors = { ...errors };

        switch (fieldName) {
            case 'name':
                if (!value.trim() || value.length < 4) {
                    newErrors.name = "Product name's length must be more than 3.";
                } else {
                    delete newErrors.name;
                }
                break;

            case 'description':
                if (!value.trim() || value.length < 6) {
                    newErrors.description = "Description's length must be more than 5";
                } else {
                    delete newErrors.description;
                }
                break;

            case 'coins':
                if (!value || isNaN(value) || value <= 0) {
                    newErrors.coins = "Coins must be a valid positive number.";
                } else {
                    delete newErrors.coins;
                }
                break;

            case 'quantity':
                if (!value || isNaN(value) || value <= 0) {
                    newErrors.quantity = "Quantity must be a valid positive number.";
                } else {
                    delete newErrors.quantity;
                }
                break;

            case 'color':
                if (!value.trim()) {
                    newErrors.color = "Color is required.";
                } else {
                    delete newErrors.color;
                }
                break;

            case 'image':
                if (!value) {
                    newErrors.image = "Image is required.";
                } else {
                    delete newErrors.image;
                }
                break;

            default:
                break;
        }

        setErrors(newErrors); // Update errors dynamically
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Product name is required.";
        if (!form.description.trim()) newErrors.description = "Description is required.";
        if (!form.coins || isNaN(form.coins) || form.coins <= 0) newErrors.coins = "Coins must be a valid positive number.";
        if (!form.quantity || isNaN(form.quantity) || form.quantity <= 0) newErrors.quantity = "Quantity must be a valid positive number.";
        if (!form.color.trim()) newErrors.color = "Color is required.";
        if (!form.image) newErrors.image = "Image is required.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("description", form.description);
            formData.append("coins", form.coins);
            formData.append("quantity", form.quantity);
            formData.append("color", form.color);
            if (form.image) {
                formData.append("image", form.image);
            }

            const res = await api.post('product/', formData);
            console.log(res);
            if (res.status === 201) {
                toast.success('Product is successfully added');
                setForm({ name: "", description: "", coins: "", quantity: "", color: "", image: "" }); 
                setErrors({}); 
                navigate('/admin/products')
                
            }
            

        } catch (error) {
            console.error(error);
            if (error.status === 400){
                if (error.response && error.response.data && error.response.data.name && error.response.data.name[0] === 'product with this name already exists.'){
                    toast.error('product with this name already exists.')
                }
            }
            else{
                toast.error("Failed to create product.");
            }
        }
    };

    return (
        <div className='bg-gradient-to-br from-black-050 via-slate-950 via-40% '>
            <Sidebar />
            <div className='sm:ml-[200px] '>
                <div className="m-10 mx-14">
                    <h1 className="text-2xl font-bold text-center mb-6 text-slate-400">ADD PRODUCT</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label className="block text-sm font-medium text-gray-600">Product Name</label>
                            <input
                                type="text"
                                name='name'
                                value={form.name}
                                onChange={handleInputChange}
                                className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900"
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>
                        <div className="">
                            <label className="block mt-4 text-sm font-medium text-gray-600">Description</label>
                            <input
                                type="text"
                                name='description'
                                value={form.description}
                                onChange={handleInputChange}
                                className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900"
                            />
                            {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Coins</label>
                                <input
                                    type="number"
                                    name='coins'
                                    value={form.coins}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md focus:outline-none focus:border-blue-900"
                                />
                                {errors.coins && <p className="text-red-500 text-xs">{errors.coins}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Quantity</label>
                                <input
                                    type="number"
                                    name='quantity'
                                    value={form.quantity}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md focus:outline-none focus:border-blue-900"
                                />
                                {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Color</label>
                                <input
                                    type="text"
                                    name='color'
                                    value={form.color}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md focus:outline-none focus:border-blue-900"
                                />
                                {errors.color && <p className="text-red-500 text-xs">{errors.color}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Image</label>
                            <div className="mt-1 flex">
                                <label
                                    htmlFor="fileUpload"
                                    className="block px-4 py-2 border text-slate-400 rounded-md cursor-pointer"
                                >
                                    Upload Image
                                </label>
                                <input
                                    type="file"
                                    id="fileUpload"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                {errors.image && <p className="text-red-500 text-xs items-center flex ml-2">{errors.image}</p>}
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 font-bold bg-blue-950 rounded-md w-full hover:bg-blue-900"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddProduct;






















// import { useState } from 'react'
// import Sidebar from '../../layout/Sidebar'
// import api from '../../../../services/api';
// import toast from 'react-hot-toast';

// function AddProduct()  {

//     const [form, setForm] = useState({name:"",description:"", coins:"", quantity:"", color:"", image:""})
//     const [errors, setErrors] = useState({});

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//         validateForm(name, value)
//     };
    
//     const handleFileChange = (e) => {
//         setForm((prev) => ({ ...prev, image: e.target.files[0] }));
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!form.name.trim()) newErrors.name = "Product name is required.";
//         if (!form.description.trim()) newErrors.description = "Description is required.";
//         if (!form.coins || isNaN(form.coins)) newErrors.coins = "Coins must be a valid number.";
//         if (!form.quantity || isNaN(form.quantity)) newErrors.quantity = "Quantity must be a valid number.";
//         if (!form.color.trim()) newErrors.color = "Color is required.";
//         if (!form.image) newErrors.image = "Image is required.";
//         return newErrors;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const validationErrors = validateForm();
//         if (Object.keys(validationErrors).length > 0) {
//             setErrors(validationErrors);
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append("name", form.name);
//             formData.append("description",form.description)
//             formData.append("coins", form.coins);
//             formData.append("quantity", form.quantity);
//             formData.append("color", form.color);
//             if (form.image) {
//                 formData.append("image", form.image);
//           }


//         const res = await api.post('product/', formData)
//         console.log(res)
//         if (res.status === 200) {
//             toast.success('product is successfully added')
//         }

//         }
//         catch (error) {
//             console.error(error);
//             toast.error("Failed to create product.");
//         }
//         }    

//     return(
//         <div className='bg-gradient-to-br from-black-050 via-slate-950 via-40% '>
//             <Sidebar />
//             <div className='sm:ml-[200px] '>

//                 <div className="m-10 mx-14">
//                     <h1 className="text-2xl font-bold text-center mb-6 text-slate-400">ADD PRODUCT</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="">
//                             <label className="block text-sm font-medium text-gray-600">Product Name</label>
//                             <input type="text" name='name' value={form.name} onChange={handleInputChange} className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
//                             {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
//                         </div>
//                         <div className="">
//                             <label className="block mt-4 text-sm font-medium text-gray-600">Description</label>
//                             <input type="text" name='description' value={form.description} onChange={handleInputChange} className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
//                             {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600">Coins</label>
//                                 <input type="number" name='coins' value={form.coins} onChange={handleInputChange} className="block w-full  px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md focus:outline-none   focus:border-blue-900" />
//                                 {errors.coins && <p className="text-red-500 text-xs">{errors.coins}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600">Quantity</label>
//                                 <input type="number" name='quantity' value={form.quantity} onChange={handleInputChange} className="block w-full  px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md appearance-none focus:outline-none focus:border-blue-900" />
//                                 {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-600">color</label>
//                                 <input type="text" name='color' value={form.color} onChange={handleInputChange} className="block w-full px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md focus:outline-none focus:border-blue-900" />
//                                 {errors.color && <p className="text-red-500 text-xs">{errors.color}</p>}
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-600">Image</label>
//                             <div className=" mt-1 flex">
//                                 <label htmlFor="fileUpload" className="block  px-4 py-2 border text-slate-400  rounded-md cursor-pointer "> Upload Image </label>
//                                 <input type="file" id="fileUpload" onChange={handleFileChange} className="hidden" />
//                                 {errors.image && <p className="text-red-500 text-xs items-center flex ml-2">{errors.image}</p>}
//                             </div>
//                         </div>
//                         <div className="flex justify-center mt-6">
//                             <button type="submit" className="px-6 py-2 font-bold bg-blue-950 rounded-md w-full hover:bg-blue-900">Submit</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default AddProduct

 