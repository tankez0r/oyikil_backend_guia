import express from 'express';
import personas from './routes/personas';
import errorHandler from './middleware/errorHandler';
import postRoutes from './routes/postRoutes';
import login from './routes/login';
import logout from './routes/logout';
import cookieParser from 'cookie-parser';
import cors from 'cors'




const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/imagenesposts', express.static('./imagenesposts'));
app.use(cors({ credentials: true, origin: ["https://martintorres-webportfolio.com.ar/", /\.martintorres-webportfolio\.com\.ar$/] }))
app.options('*', cors({ credentials: true, origin: ["https://martintorres-webportfolio.com.ar/", /\.martintorres-webportfolio\.com\.ar$/] }))
app.use('/guiatelefonica', personas);
app.use('/posteos', postRoutes);
app.use('/login', login);
app.use('/logout', logout);
app.use(errorHandler);




export default app;
