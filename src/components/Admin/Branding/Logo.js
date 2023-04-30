import { Button, Input, Space } from "antd";
import React from "react";

const Logo = () => {
  return (
    <div>
        <span className="block text-sm font-semibold mt-4 mb-2">Logo</span>
        
        <div className="w-[20rem] relative">
            <input type="file" className="w-full absolute inset-0 z-10 h-10 opacity-0" />
            <Space.Compact className="w-full border h-10 border-gray-2 rounded-lg">
                <div className="h-full w-full font-medium text-base flex items-center px-3 text-gray-800">
                    Choose file
                </div>
                <Button
                    type="primary"
                    className="bg-gray-2 h-full text-base text-gray-800"
                >
                    Browse
                </Button>
            </Space.Compact>
        </div>

        <p className="text-sm text-gray-500 pt-4">Please upload a file in JPG/PNG/GIF formats with a maximum height of 32 pixels</p>
    </div>
  );
};

export default Logo;
