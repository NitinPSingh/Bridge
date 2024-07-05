import React from 'react'

export default function QuoteCard({ind, props, selectedIndx, setSelectedIndx, setCurrQuote}) {

    const exchangeRate = parseFloat(props
        ?.dstQuoteTokenAmount) / parseFloat(props
        ?.srcQuoteTokenAmount);
    const bridgeFee = parseFloat(props
        ?.bridgeDescription
            ?.bridgeFeeAmount) / Math.pow(10, props
        ?.srcQuoteToken
            ?.decimals);

    const bridgeFeeUsd = bridgeFee * props
        ?.srcQuoteTokenUsdValue;
    const handleQuote = () => {
        setCurrQuote(props)
        setSelectedIndx(ind)

    }
    return (
        <div className="flex flex-col text-left">

            <div
                onClick={() => handleQuote()}
                style={ind == selectedIndx
                ? {
                    backgroundColor: 'black',
                    color: "white"
                }
                : {
                    backgroundColor: 'white',
                    color: "black"
                }}
                className=" cursor-pointer   rounded-[16px] border-[1px] border-solid p-[16px] border-text-interaction">

                <div className=" flex items-baseline  ">
                    <h4 className="text-[24px]/[30px] font-semibold">{exchangeRate}</h4>
                    <span className="text-[12px]/[16px] font-normal">{props
                            ?.dstQuoteToken
                                ?.symbol}</span>
                </div>

                <p className="text-text-primary text-[14px]/[18px]">Bridge
                    <span className="text-text-primary text-[14px]/[18px] font-semibold">
                        &nbsp;{props
                            ?.bridgeDescription
                                ?.bridgeFeeToken
                                    ?.symbol}
                        &nbsp;</span>from<span className="text-text-primary text-[14px]/[18px] font-semibold">&nbsp; {props
                            ?.srcQuoteToken
                                ?.symbol}
                        &nbsp;</span>to<span className="text-text-primary text-[14px]/[18px] font-semibold">&nbsp; {props
                            ?.dstQuoteToken
                                ?.symbol}
                    </span>
                </p>
                <div className="text-text-secondary flex items-center ] text-[12px]/[16px]">
                    <span>via
                    </span>
                    {props
                        ?.bridgeDescription
                            ?.provider}

                </div>

                <h3>
                    Gas Required : {props
                        ?.estimatedGas}</h3>
                <h3 className='truncate'>
                    Bridge Fee : {bridgeFeeUsd}
                    $
                </h3>

            </div>

        </div>

    )
}