import jwt from 'jsonwebtoken'



const userAuth = async(req,res,next) => {   
    try {
        const {token} = req.headers;
        if(!token)
        {
            return res.status(401).json({success:false,message:"Not authorized to access this route"})
        }

        const tokenDecoded = jwt.verify(token,process.env.JWT_SECRET);
         
        if(tokenDecoded.id)
         {
            req.body.userId = tokenDecoded.id;
         }
         else
         {
            res.status(500).json({success:false , message:"Not Authorized.. Login Again!"})
         }

        next();
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Server Error"})
    }
}


export default userAuth;
