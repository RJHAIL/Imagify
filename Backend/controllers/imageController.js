import { response } from "express";
import userModel from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";

 export const generateImage = async (req, res) => {
    try {
        const {userId , prompt} =req.body;
        const user = await userModel.findById(userId); 
        
        if(!user || !prompt)
        {
            return res.json({success:false,message:"Please fill all the fields"})
           
        }

        if(user.creditBalance ==0 || userModel.creditBalance < 0)
        {
            return res.json({success:false,message:"Insufficient Credits" , creditBalance:user.creditBalance})
        }

        const formData = new FormData();
        formData.append("prompt",prompt);

        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
            headers: {
              'x-api-key': process.env.CLIPDROP_API_KEY,
                     },
                  responseType: 'arraybuffer',
                    })

      const base64Image = Buffer.from(data,'binary').toString('base64')
      const resultImage = `data:image/png;base64,${base64Image}`
      
      await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

        return res.status(200).json({success:true,message:"Image Genereated",creditBalance:user.creditBalance-1, resultImage})
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}