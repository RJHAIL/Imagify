import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'

//step1: Create a context
 export const AppContext = createContext();

//step2: Create a provider

const AppContextProvider = (props)=>
{
    const [user,setUser]=useState(false);
    const [showLogin,setShowLogin]=useState(false);
    //const [token,setToken] = useState(localStorage.getItem('token'))

    const [token, setToken] = useState(Cookies.get('token'));
    const [credit,setCredit] = useState(false)
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate()

    const loadCreditsData = async ()=>
    {
        
        try {
            
            const {data} = await axios.get(`${backendUrl}/api/users/credits`,{headers:{token}});
            
            console.log(data)
        
            

            if(data.success)
            {
                setCredit(data.credits )
                setUser(data.user)
            }
            
        } catch (error) {
            console.log(error.message)
            toast.error("error")
        }
    }

     const generateImage = async(prompt)=>
     {
        try {
           const {data} = await axios.post(backendUrl+'/api/images/generate-image', {prompt},{headers:{token}});
           if(data.success)
           {
            loadCreditsData()
            return data.resultImage
           }
           else{
            toast.error(data.message)
            loadCreditsData()
            if(data.creditBalance ===0 )
            {
                navigate('/buy')
            }
           }
        } catch (error) {
            toast.error(error.message)
            
        }
     }





    const logout = ()=>
    {
        localStorage.removeItem('token')
        Cookies.remove('token'); 
            setToken('')
            setUser(null)
        
    }

    useEffect(()=>
    {
      if(token)
      {
        loadCreditsData()
      }
    },[token])

   const value={
       user,
       setUser,
       showLogin,
       setShowLogin,
       backendUrl,token,setToken
       ,credit,setCredit,
       loadCreditsData,logout,generateImage
              
   }


    return(
        <AppContext.Provider value={value}>
             {props.children}
        </AppContext.Provider> 
    )
}

export default AppContextProvider;