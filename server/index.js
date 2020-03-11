
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'
import route from './routes/userRouter'


const app = express()

const port = process.env.PORT || 7000;

app.use(cors());
// app.use(json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1', route)

app.listen(port, ()=> {
    console.log(`server is running on ${port}`);
})


export default app;