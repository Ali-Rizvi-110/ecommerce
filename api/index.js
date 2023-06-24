const express = require('express');
const connectDB = require('./db/connect.js')
const { default: mongoose } = require('mongoose');
const app = express();
const usersRouter = require('./routes/userTasks')
const productRouter = require('./routes/productTasks')
const adminRouter = require('./routes/adminRoutes.js')
const verificationRoute = require('./routes/verificationRoute.js')

const cors = require('cors');

mongoose.set('debug', true);

app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send("First Page")
});

// user inforamtions
app.use('/api/v1/userinfo', usersRouter);
app.use('/api/v1/productinfo', productRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1', verificationRoute);
// app.get('/api/v1/products', (req, res)=>{
//     res.send("Temp page")
// })

const PORT = 4500;
const start = async () => {
    try{
        app.listen(PORT, ()=>{
            console.log(`Server is listning on PORT ${PORT}`)
        })
        await connectDB();
        console.log("Connected to MongoDb DataBase")
    }catch(err){
        console.log(err)
    }
}
start()