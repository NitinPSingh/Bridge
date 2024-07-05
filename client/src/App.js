import React,{useEffect, useMemo, useState} from 'react';
import SelectModal from './components/SelectModal';
import FloatInput from './components/FloatInput';
import {ApiService} from './services/services';
import {endpoints, uri} from './services/api';
import QuotesContainer from './components/QuotesContainer';
import Loader from './components/Loader';

function App() {
    const [model,
        setModel] = useState(false)
    const [modelFor,
        setModelFor] = useState("From")
    const handleFromToken = () => {
        console.log("called")
        setModelFor("From")
        setModel(true)

    }

    const handleToToken = () => {

        setModelFor("To")
        setModel(true)

    }
    const [selectedFrom,
        setSelectedFrom] = useState({"chainId": 1, "name": "ETHEREUM"})
    const [selectedFromTk,
        setSelectedFromTk] = useState({})
    const [selectedTo,
        setSelectedTo] = useState({"chainId": 1, "name": "ETHEREUM"})
    const [selectedToTk,
        setSelectedToTk] = useState({})
    const [tokenAmount,
        setTokenAmount] = useState("")
    const [quotes,
        setQuotes] = useState([])
    const [selectQI,
        setSelectQI] = useState(0)
    const [currQuote,
        setCurrQuote] = useState({})
    const [loading,
        setLoading] = useState(false)
    const [tokens,
        setTokens] = useState({})
    const [message,
        setMessage] = useState(null);
    const fetchData = async() => {
        const data = await ApiService.GetApi(uri, endpoints.getTokens, "")
        setTokens(data.data.recommendedTokens);
    }

    const sortedQuotes = useMemo(() => {
        quotes.sort((a, b) => {
            const exchangeRateA = a.bridgeDescription.dstBridgeTokenAmount / a.srcQuoteTokenAmount;
            const exchangeRateB = b.bridgeDescription.dstBridgeTokenAmount / b.srcQuoteTokenAmount;

            return exchangeRateB - exchangeRateA;
        });
        setCurrQuote(quotes[0])
        setSelectQI(0)
        return quotes
    }, [quotes])

    useEffect(() => {

        fetchData()

    }, [])

    const getQuote = async() => {
        if (validate()) 
            return;
        setLoading(true)
        setCurrQuote({})
        const data = {
            srcChainId: selectedFrom.chainId,
            srcQuoteTokenAddress: selectedFromTk.address,
            dstChainId: selectedTo.chainId,
            dstQuoteTokenAddress: selectedToTk.address,
            slippage: 0,
            srcQuoteTokenAmount: tokenAmount + '0'.repeat(selectedFromTk.decimals)
        }

        const resData = await ApiService.PostApi(uri, endpoints.postQuotes, data)
        if (resData
            ?.data
                ?.errorMsg) {
            setMessage(resData
                ?.data
                    ?.errorMsg)
        } else {
            setQuotes(resData
                ?.data.routes)
            setMessage(null)
        }

        setLoading(false)

    }
    
    useEffect(() => {
        const fetchInterval = setInterval(() => {
            getQuote();

        }, 20000);

        return () => {
            clearInterval(fetchInterval);
        };
    }, [sortedQuotes, message]);

    useEffect(() => {
        getQuote();
    }, [selectedFrom, selectedTo, selectedFromTk, selectedToTk])

    const validate = () => {
        if (!selectedFrom || !selectedFrom.chainId || !selectedFromTk || !selectedFromTk.address || !selectedTo || !selectedTo.chainId || !selectedToTk || !selectedToTk.address || !tokenAmount) {

            let missingFields = [];

            if (!selectedFrom) 
                missingFields.push('src chain');
            
            if (!selectedFromTk || !selectedFromTk.address) 
                missingFields.push('src token ');
            if (!selectedTo) 
                missingFields.push('destination chain');
            
            if (!selectedToTk || !selectedToTk.address) 
                missingFields.push('destination token');
            if (!tokenAmount) 
                missingFields.push('token amount');
            
            let message = `The following fields are missing: ${missingFields.join(', ')}.`;

            return message;
        }

        if (selectedFromTk.chainId === selectedToTk.chainId && selectedFromTk.address === selectedToTk.address) {
            return "Source and destination cannot be the same.";

        }

        return false

    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            getQuote()

        }, 2000)

        return () => clearTimeout(delayDebounceFn)
    }, [tokenAmount])
    return (
        <div
            className="App flex sm:my-[20vh] flex-col w-full justify-center items-center mx-auto sm:flex sm:max-w-[848px] sm:justify-center sm:space-x-[24px]">
            {model && (modelFor === "To"
                ? <SelectModal
                        closeModel={() => setModel(false)}
                        selected={selectedTo}
                        setSelected={setSelectedTo}
                        setSelectedTkn={setSelectedToTk}
                        tokens={tokens}/>
                : <SelectModal
                    closeModel={() => setModel(false)}
                    selected={selectedFrom}
                    setSelected={setSelectedFrom}
                    setSelectedTkn={setSelectedFromTk}
                    tokens={tokens}/>)}
            <div className='sm:flex items-center !m-[0px]'>

                <div
                    className="rounded-[8px]  text-left mb-[4px] flex justify-between space-x-[4px] px-[16px] py-[12px]">
                    <div className="max-w-[120px] sm:max-w-[220px]">
                        <p className=" text-[12px] leading-[16px]">From</p>
                        <div className="relative mb-[2px] mt-[8px]">
                            <FloatInput isDisable={loading} setValue={setTokenAmount} value={tokenAmount}/></div>
                        <p className=" w-full truncate text-[12px] leading-[16px]">≈ $ {currQuote
                                ?.srcQuoteTokenUsdValue || "--"}</p>
                    </div>

                    <button
                        onClick={() => handleFromToken()}
                        disabled={loading}
                        className="rounded-[8px] border group flex h-[72px] min-w-[168px] items-center justify-between px-[16px] py-[12px] bg-surface-2 hover:bg-surface-2-hover cursor-pointer">
                        <div className="flex shrink-0 items-center space-x-[8px]">
                            <div className="relative">
                                <img
                                    src={selectedFromTk
                                    ?.logoURI}
                                    alt="image alt"
                                    className="rounded-full h-[28px] w-[28px]"/>
                            </div>
                            <div className="flex flex-col items-start justify-center truncate">
                                <span className="text-[18px] font-semibold leading-[22px] truncate">{selectedFrom.name}</span>
                                <span className="text-[14px] leading-[18px] ">{selectedFromTk
                                        ?.symbol
                                            ? selectedFromTk
                                                ?.symbol
                                                : "Select Token"}</span>
                            </div>
                        </div>

                    </button>
                </div>
                <div class="  inline-block  rounded-full sm:-rotate-90  cursor-pointer h-[1em]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            d="M13.428 3.387v13.881l4.855-4.854a1.387 1.387 0 0 1 1.96 1.96l-7.221 7.22a1.387 1.387 0 0 1-1.96 0L3.837 14.37l-.007-.007a1.387 1.387 0 1 1 1.96-1.96l4.865 4.865V3.387a1.387 1.387 0 1 1 2.773 0Z"></path>
                    </svg>
                </div>
                <div
                    className="rounded-[8px]  text-left mb-[4px] flex justify-between space-x-[4px] px-[16px] py-[12px]">
                    <div className="max-w-[120px] sm:max-w-[220px]">
                        <p className=" text-[12px] leading-[16px]">To</p>
                        <div className="relative mb-[2px] mt-[8px]">
                            <input
                                className="border-none bg-inherit outline-none truncate  w-full  text-[24px] font-semibold leading-[30px]"
                                placeholder="0.0"
                                disabled
                                value={parseFloat(currQuote
                                ?.dstQuoteTokenAmount) / parseFloat(currQuote
                                ?.srcQuoteTokenAmount)}
                                type="text"/></div>
                        <p className=" w-full truncate text-[12px] leading-[16px]">≈ $ {currQuote
                                ?.dstQuoteTokenUsdValue || "--"}</p>
                    </div>
                    <button
                        onClick={() => handleToToken()}
                        disabled={loading}
                        className="rounded-[8px] border group flex h-[72px] min-w-[168px] items-center justify-between px-[16px] py-[12px] bg-surface-2 hover:bg-surface-2-hover cursor-pointer">
                        <div className="flex shrink-0 items-center space-x-[8px]">
                            <div className="relative">
                                <img
                                    src={selectedToTk
                                    ?.logoURI}
                                    alt="image alt"
                                    className="rounded-full h-[28px] w-[28px]"/>
                            </div>
                            <div className="flex flex-col items-start justify-center max-w-[100%]">
                                <span className="text-[18px] font-semibold leading-[22px] truncate">{selectedTo.name}</span>
                                <span className="text-[14px] leading-[18px] ">{selectedToTk
                                        ?.symbol
                                            ? selectedToTk
                                                ?.symbol
                                                : "Select Token"}</span>
                            </div>
                        </div>

                    </button>
                </div>

            </div>
            {/* <button type="button" disabled={validate()} onClick={getQuote} className="bg-gray-800 relative  text-white  border-gray-600  hover:bg-gray-700  hover:border-gray-600  focus:ring-gray-700 w-full  border border-gray-300 focus:outline-none   font-medium rounded-lg text-sm px-5 py-2.5 !m-[0px] !mb-[40px] " >
                Get Quote
             </button> */}

            {validate()
                ? validate()
                : loading
                    ? <div>
                            <Loader size={"xl"}/>
                            <h3>Getting quotes</h3>
                        </div>

                    : message
                        ? <h3 className='text-[red]'>{message ?? message}
                            </h3>
                        : <QuotesContainer
                            quotes={sortedQuotes}
                            selectedIndx={selectQI}
                            setSelectedIndx={setSelectQI}
                            handleCurrQuote={setCurrQuote}/>}

        </div>
    );
}

export default App;