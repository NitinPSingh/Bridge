import React from 'react'
import QuoteCard from './QuoteCard'

export default function QuotesContainer({quotes,selectedIndx ,setSelectedIndx,handleCurrQuote}) {
  return (
    <div className='w-full flex flex-wrap gap-[20px]  !m-[0px] justify-center sm:justify-left'>
        {console.log(quotes)}

        {quotes.map((i,_i)=><QuoteCard key={_i} ind={_i} props={i} setCurrQuote={handleCurrQuote} selectedIndx={selectedIndx} setSelectedIndx={setSelectedIndx}/>)}
    </div>
  )
}
