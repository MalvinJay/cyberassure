import React from "react";

const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-25 min-h-[35rem]">
      <div className="w-20 h-20 rounded-full border-4 border-gray-300 border-t-white animate-spin flex items-center"></div>
    </div>
  );
};

export default LoadingScreen;
