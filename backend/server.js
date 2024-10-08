import dotenv from 'dotenv';
import express from 'express'
import databaseConnection from './utils/database.js';
import cookieParser from 'cookie-parser'
import userRoute from './routes/userRoute.js'
import cors from 'cors'

databaseConnection();

dotenv.config({
    path:".env"
})

const app = express();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin:'https://netflix-clone-frontend-m98w.onrender.com/',
    credentials:true
}
app.use(cors(corsOptions))

//api
app.use("/api/v1/user",userRoute);

app.listen(process.env.PORT,() =>{
    console.log(`Server listening at port ${process.env.PORT}`);
});

