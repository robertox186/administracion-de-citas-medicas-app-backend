const express = require('express')
const app=express();
const cors=require('cors');
const jwt=require('jsonwebtoken');
const morgan=require('morgan')
const routes=require('./routes/index')

//settings
app.use(cors());
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(routes)


app.set('port',process.env.PORT || 3000)

app.get('/',(req,res)=>{

res.sendStatus(200);

})

//starting the server
app.listen(3000,()=>{
    console.log("servidor iniciado en el puerto 3000")
})