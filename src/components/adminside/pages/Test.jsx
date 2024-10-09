
import { useState } from "react";

function Tags() {
  const arr = [
    { id: 1, name: "python" },
    { id: 2, name: "javascript" },
    { id: 3, name: "dart" },
    { id: 4, name: "angular" }
  ];

  const [addModel, setAddModel] = useState(false);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-4">
      <div className="mt-6">
        <div className="flex justify-center">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl font-mono text-rose-200">
            TAG'S
          </h1>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setAddModel(!addModel)}
            className="bg-orange-600 px-3 py-1 md:px-4 md:py-2 rounded-md shadow-2xl font-mono text-sm md:text-base"
          >
            ADD TAGS
          </button>
        </div>

        {/* Model Toggle */}
        {addModel && (
          <div className="absolute bg-gray-100 p-4 rounded-md shadow-lg mt-2 w-full sm:w-auto">
            <h2>Modal Opened</h2>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <div className="w-full max-w-[600px]">
            <div className="flex justify-between p-2 border-b">
              <h1 className="text-sm sm:text-base">Id</h1>
              <h2 className="text-sm sm:text-base">Name</h2>
              <h2 className="text-sm sm:text-base">Description</h2>
            </div>
          </div>
        </div>

        <hr className="my-2 border-red-700" />

        {arr.map((data, index) => (
          <div key={index} className="flex justify-center">
            <div className="w-full max-w-[600px]">
              <div className="flex justify-between p-2 border-b">
                <h1 className="text-sm sm:text-base">{data.id}</h1>
                <h2 className="text-sm sm:text-base">{data.name}</h2>
                <h3 className="text-sm sm:text-base">Sample </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tags;
