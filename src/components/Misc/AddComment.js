import React from "react";

const AddComment = ({ 
    width="w-full md:w-1/2",
    rows=2
}) => {
  return (
    <div className={`mt-4 border border-primary shadow-cs ${width}`}>
      <div htmlFor="" className="px-3 text-base py-2 font-bold text-gray-4">
        Add comment @mention
      </div>

      <textarea
        autoFocus
        name=""
        id=""
        cols="5"
        rows={rows}
        className="pt-4 border-t border-primary w-full p-4 outline-none shadow-inner"
      ></textarea>
    </div>
  );
};

export default AddComment;
