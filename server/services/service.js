import axios from "axios";

export const ApiService  = {

  GetApi: async (BASE_URL,endPoint, params) => {
    try {
     
      
      return await axios.get(`${BASE_URL}/${endPoint}`, {
        params: params,
      });
      
     
    } catch (error) {
      
      return error?.response?.data?.errors?.non_field_errors[0];
    }
  },

};
