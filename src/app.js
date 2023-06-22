const mongoose=require("mongoose");
const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
const bodyparser=require("body-parser");
const cookieparser=require("cookie-parser")
const PORT=9000;
const url="mongodb://127.0.0.1:27017/6JUN"

mongoose.connect(url).then(()=>{
    console.log("Db Connected");
}).catch(err=>{
    console.log(err);
})
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cookieparser());

const viewPath=path.join(__dirname,"../template/views");
const publicPath=path.join(__dirname,"../public");
app.use('/public', express.static(publicPath));
//app.use(express.static(publicPath));
// app.use(express.static('public'));

app.set("view engine","hbs");
app.set("views",viewPath);

const userrouter=require("../router/userrouter");
app.use("/",userrouter);


app.listen(PORT,()=>{
    console.log("Server running on port : "+PORT);
})