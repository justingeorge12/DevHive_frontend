import Sidebar from "../../layout/Sidebar"

function EditProduct({editData, onClose}) {


  return(
        <div className='fixed inset-0 sm:ml-[200px]  bg-black bg-opacity-50 flex items-center justify-center z-50 p-10'>
          <div className="relative bg-black m-10 mx-14 border border-slate-600 rounded-md p-6">
            <h1 className="text-2xl font-bold text-center mb-6 text-slate-400">EDIT PRODUCT</h1>
            <div className="absolute top-4 right-4 bg-slate-800 rounded-md px-2 hover:text-red-600" >
              <button onClick={() => onClose()} > ✕ </button>
            </div>
            <form>
              <div className="">
                <label className="block text-sm font-medium text-gray-600">Product Name</label>
                  <input type="text" value={editData.name} className="block w-full px-4 py-2 mt-1 border border-slate-600 rounded-md bg-slate-950 focus:outline-none focus:border-blue-900" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">Coins</label>
                    <input type="number" value={editData.coins} className="block w-full  px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md focus:outline-none   focus:border-blue-900" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">Quantity</label>
                    <input type="number" value={editData.quantity} className="block w-full  px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md appearance-none focus:outline-none focus:border-blue-900" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-600">color</label>
                    <input type="text" value={editData.color} className="block w-full px-4 py-2 mt-1 bg-slate-950 border border-slate-600 rounded-md focus:outline-none focus:border-blue-900" />
                </div>
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-600">Image</label>
                  <div className=" mt-1 flex">
                      <label htmlFor="fileUpload" className="block  px-4 py-2 border text-slate-400  rounded-md cursor-pointer "> Upload Image </label>
                      <input type="file" id="fileUpload" className="hidden" />
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