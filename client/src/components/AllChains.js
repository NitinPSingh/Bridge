import React, {useState} from 'react'
import {chains} from '../constants/constant'

export default function AllChains({setSelected, selected}) {
    const [showAll,
        setShowAll] = useState(false);

    const handleSelect = (i) => {
        setSelected(i)
        setShowAll(false)
    }
    return ( 
    <div>
        <div onClick={()=>setShowAll(!showAll)}
            className="relative bg-gray-800 text-[16px] leading-[16px] text-white cursor-pointer border-gray-600  flex h-[54px] w-full flex-col items-center justify-center   rounded-[8px] px-[8px] py-[12px] bg-[white] ">

           {selected.name}
        </div>

        <ul
            className={`flex flex-wrap relative gap-[8px] overflow-y-scroll slim-scrollbar ${showAll
            ? 'max-h-[200px]'
            : ""}`}>

            {showAll && chains.map((i) => (
                <li
                    onClick={() => handleSelect(i)}
                    className={`relative overflow-hidden flex h-[56px] w-[92px] flex-col items-center justify-center space-y-[12px] rounded-[8px] px-[8px] py-[12px] bg-[white] border-[1px] ${i.chainId == selected.chainId
                    ? "bg-gray-800 text-white border-gray-600 cursor-not-allowed"
                    : "hover:bg-gray-200 hover:text-gray-900 cursor-pointer"}`}>

                    <span className="max-w-[56px] truncate text-[12px] leading-[16px]">{i.name}</span>
                </li>
            ))}
        </ul>
       

    </div> 

    )
}