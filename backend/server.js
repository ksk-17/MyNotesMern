const express= require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const noteRoutes = require("./routes/noteRoutes");
const path = require("path");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use('/api/users',userRoutes);
app.use('/api/notes',noteRoutes);

//--------------------deployement----------------//

__dirname = path.resolve();


if(process.env.NODE_ENV === 'production'){
    console.log("hi")
    app.use(express.static(path.join(__dirname,'/frontend/build')));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
    })
}else{
    app.get('/',(req,res)=>{
        res.send("Api is running..");
    })
}

//-----------------------------------------------//
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`server started on port ${PORT}`));
