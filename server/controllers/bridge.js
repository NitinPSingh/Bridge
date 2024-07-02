import { endpoints, uri } from "../constanst/xyapis.js"
import { ApiService } from "../services/service.js"

export const getQuotes = async (req,res) => {
  
    const params = req.query;
    
    try {
        const data =await ApiService.GetApi(uri,endpoints.getQuotes,params)
   
        res.status(200).json(data.data); 
    }
    catch (err) {
        res.status(500).json({ error:err.message});
    }


}


export const getSupportedTokens = async (req,res) => {
    try {
        const data = await ApiService.GetApi(uri,endpoints.getSupportedTokens,"")
        console.log(data.data)
        res.status(200).json(data.data); 
    }
    catch (err) {
        res.status(500).json({ error:err.message});
    }


}