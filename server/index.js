
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import route from './routes/userRouter'


const app = express()

const port = process.env.PORT || 8000;

app.use(cors());
// app.use(json());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((res, req, next) =>{
    res.header("Access-Control-Allow-Origin", '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if(req.method ==='OPTIONS'){
        res.heaser('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE,GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/api/v1', route)

app.listen(port, ()=> {
    console.log(`server is running on ${port}`);
})


export default app;