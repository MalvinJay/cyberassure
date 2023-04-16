import React from "react";

const AddComment = ({ 
    width="w-full md:w-1/2",
    rows=2,
    handleInputChange
}) => {
  return (
    <div className={`mt-4 border border-primary shadow-cs ${width}`}>
      <div htmlFor="" className="px-3 text-base py-2 font-bold text-gray-4">
        Add comment @mention
      </div>

      <textarea
        // autoFocus
        name=""
        id=""
        cols="5"
        rows={rows}
        className="border-t border-primary w-full p-2 outline-none shadow-inner"
        onChange={(e) => handleInputChange(e.target.value)}
      ></textarea>
    </div>
  );
};

export default AddComment;
