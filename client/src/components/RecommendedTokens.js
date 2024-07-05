import React from 'react'

export default function RecommendedTokens({tokens,handleToken}) {

    return (
        <div className='h-[250px] overflow-y-scroll slim-scrollbar'>
            
          <ul>
          {tokens && tokens.map((i)=>
            <li onClick={()=>handleToken(i)}
                className="p-[12px] hover:bg-gray-200 hover:text-gray-900 cursor-pointer rounded-inner flex justify-between items-center border-[1px] cursor-pointer hover:bg-surface-3 border-transparent">
                <div className="flex shrink-0 items-center justify-center space-x-[8px]">
                    <div className="relative">
                        <img
                            src={i.logoURI}
                            alt="image alt"
                            className="rounded-full h-[28px] w-[28px]" />
                           </div>
                            <div className="flex flex-col items-start justify-center">
                                
                                <span className="text-[14px] leading-[18px]">{i.name}</span>
                                <span
                            className="truncate text-light-text-default text-[10px] leading-[18px]">{i.address}</span>
                            </div>
                          
                        </div>
                        
                    </li>)}
                    </ul>

                    {console.log(tokens)}
                    </div>
                    )
                  }