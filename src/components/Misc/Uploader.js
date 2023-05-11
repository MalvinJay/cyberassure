import React from "react";

const Uploader = ({ handleUpload, children }) => {
  return (
    <div>
      {children}
      <input
        id="upload"
        className="absolute inset-0 h-full w-full cursor-pointer border-none"
        style={{ opacity: 0, appearance: "none" }}
        type="file"
        placeholder=""
        title=""
        onChange={handleUpload}
      />
    </div>
  );
};

export default Uploader;
