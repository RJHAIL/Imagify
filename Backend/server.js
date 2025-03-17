import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js'
import userRouter from './Routes/userRoutes.js';
import cookieParser from "cookie-parser";
import imageRouter from './Routes/imageRouter.js';



const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

await connectDB();

app.use('/api/users', userRouter);
app.use('/api/images',imageRouter);

app.get('/', (req, res) => {
    res.send('API Working!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});