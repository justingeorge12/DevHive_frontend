
import { useState } from "react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-20 shadow-sm shadow-sky-600 fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="flex justify-between items-center h-full mx-8">
        <h1 className="font-bold text-2xl text-white">DevHive</h1>

        {/* Hamburger Menu Icon (visible on small screens) */}
        <div className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-1 cursor-pointer">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </div>

        {/* Menu Items */}
        <div className={`md:flex space-x-8 mr-8 font-bold hidden ${isOpen ? "block" : "hidden"} md:space-x-8`}>
          <p className="text-white">Users</p>
          <p className="text-white">Tags</p>
          <p className="text-white">Q&A</p>
          <div className="avatar text-white">O</div>
        </div>
      </div>

      {/* Mobile Menu (dropdown) */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-2 mt-4 text-center">
          <p className="text-white">Users</p>
          <p className="text-white">Tags</p>
          <p className="text-white">Q&A</p>
          <div className="avatar text-white">O</div>
        </div>
      )}
    </div>
  );
}

export default Nav;








// function Nav() {

//     return(
//         <>
//             <div className="h-20 shadow-sm shadow-sky-600 fixed top-0 left-0 right-0 z-50 bg-black">
//                 <div className="flex justify-between items-center h-full mx-8">
//                     <h1 className="font-bold text-2xl">DevHive</h1>
//                     <div className="flex space-x-8 mr-8 font-bold">
//                         <p>users</p>
//                         <p>Tags</p>
//                         <p>Q&A</p>
//                         <div className="avatar">O</div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Nav



