import { Button } from 'antd'
import React from 'react'
import ColorPicker from './ColorPicker'

const Appearance = () => {
    const headnBackList = ["bg-[#ffece2]", "bg-[#fffae6]", "bg-[#e9fde1]", "bg-[#daf0f5]", "bg-[#f7dce9]", "bg-[#f9ddf2]", "bg-[#f1ddf9]", "bg-[#dde8f9]", "bg-[#ddf9f4]"]
    const menuList = ["bg-[#feab40]", "bg-[#78bb7b]", "bg-[#5ab9c1]", "bg-[#e3ab9a]", "bg-[#a0144f]", "bg-[#a71c1c]", "bg-[#275d2b]", "bg-[#0b5b62]", "bg-[#6c41a1]"]

    return (
        <div className='mt-10'>
            <div className="flex justify-between items-center border-b border-gray-2 pb-4 mt-4 mb-2">
                <span className='text-sm font-semibold'>Appearance</span>
                <Button 
                    type="primary" 
                    className="text-primary bg-white border border-primary rounded-md"
                >
                    Reset to default
                </Button>
            </div>

            <div className='pl-5'>
                <ColorPicker type="header" options={headnBackList} />
                <ColorPicker type="background" headColor="bg-[#f2f3f7]" options={headnBackList} />
                <ColorPicker type="Menu" headColor="bg-[#3789B4]" options={menuList} />
            </div>
        </div>
    )
}

export default Appearance