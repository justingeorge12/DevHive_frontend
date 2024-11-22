import { useState } from "react"
import Sidebar from "../../layout/Sidebar"
import toast from "react-hot-toast";
import api from "../../../../services/api";

function EditProduct({editData, onClose, fetchProducts}) {

  const [formData, setFormData] = useState({name:editData.name, description:editData.description, coins:editData.coins, quantity:editData.quantity, color:editData.color, image:editData.image})
  const [errors, setErrors] = useState({});
  const [isImageUpdated, setIsImageUpdated] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value); // Validate the field dynamically
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
    setIsImageUpdated(true);
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
    if (!formData.name.trim()) newErrors.name = "Product name is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.coins || isNaN(formData.coins) || formData.coins <= 0) newErrors.coins = "Coins must be a valid positive number.";
    if (!formData.quantity || isNaN(formData.quantity) || formData.quantity <= 0) newErrors.quantity = "Quantity must be a valid positive number.";
    if (!formData.color.trim()) newErrors.color = "Color is required.";
    if (!formData.image) newErrors.image = "Image is required.";
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
        const data = new FormData();

        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("coins", formData.coins);
        data.append("quantity", formData.quantity);
        data.append("color", formData.color);
        if (isImageUpdated) {
          // Append the new image file
          data.append("image", formData.image);
      }

        console.log('bfr submit', data, '-----------------------------------')

        const res = await api.put(`product/${editData.id}/`, data, {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });
        console.log(res);
        if (res.status === 200) {
            toast.success('Product is successfully added');
            setErrors({}); 
            onClose()
            fetchProducts()
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

  
  return(
        <div className='fixed inset-0 sm:ml-[200px]  bg-black bg-opacity-50 flex items-center justify-center z-50 p-10'>
          <div className="relative bg-black m-10 mx-14 border border-slate-600 rounded-md p-6 scroll-auto">
            <h1 className="text-2xl font-bold text-center mb-6 text-slate-400">EDIT PRODUCT</h1>
            <div className="absolute top-4 right-4 bg-slate-800 rounded-md px-2 hover:text-red-600" >
              <button onClick={() => onClose()} > ✕ </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="">
                <label className="block text-sm font-medium text-gray-600">Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-600 mt-4">description</label>
                  <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
                  {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Coins</label>
                    <input type="number" name="coins" value={formData.coins} onChange={handleInputChange} className="block w-full  px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md focus:outline-none   focus:border-blue-900" />
                    {errors.coins && <p className="text-red-500 text-xs">{errors.coins}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Quantity</label>
                    <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} className="block w-full  px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md appearance-none focus:outline-none focus:border-blue-900" />
                    {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">color</label>
                    <input type="text" name="color" value={formData.color} onChange={handleInputChange} className="block w-full px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md focus:outline-none focus:border-blue-900" />
                    {errors.color && <p className="text-red-500 text-xs">{errors.color}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Image</label>
                  <div className=" mt-1 flex">
                      <label htmlFor="fileUpload" className="block  px-4 py-2 border text-slate-400  rounded-md cursor-pointer "> Upload Image </label>
                      <input type="file" id="fileUpload" onChange={handleFileChange} className="hidden" />
                      {errors.image && <p className="text-red-500 text-xs items-center flex ml-2">{errors.image}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-1 font-medium text-gray-600">image preview</label>
                  <img src={isImageUpdated ? URL.createObjectURL(formData.image) : editData.image} alt="prodcut preview" className="h-12" />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                  <button type="submit" className="px-6 py-2 font-bold bg-blue-950 rounded-md w-full hover:bg-blue-900">Submit</button>
              </div>
          </form>
        </div>
      </div>

  )
}

export default EditProduct