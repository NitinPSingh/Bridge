
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bridgeRoutes from './routes/bridge.js'



const initializeExpress = () => {
    const app = express();
    const port =3001
   
    app.use(bodyParser.json({ limit: '30mb', extended: true }))
    app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
    app.use(cors());
    app.use('/',bridgeRoutes);

   
 
    app.listen( port,()=>{console.log('Express server started on port %s',port )});
    
};
  
const initializeApp = async ()=> {
 
    initializeExpress();
};
  
initializeApp();
