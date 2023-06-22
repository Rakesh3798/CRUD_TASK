const User=require("../model/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const path=require("path");
const fs=require("fs");
const multer=require("multer");
const cookieparser=require("cookie-parser")
const auth=require("../middleware/auth");


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/profile')
//     },
//     filename: function (req, file, cb) {
//         cb(null,file.fieldname + '-' + Date.now() + '.jpg')
//     }
//   })
  
//   const upload = multer({ storage: storage })

const AddUser=async(req,resp)=>{
    try {
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            img:req.file.filename
        });
        console.log(user);
        await user.save();
        resp.render("index",{"msg":"Register successfully"})
    } catch (error) {
        console.log(error);
    }
}

const DisplayView=async(req,resp)=>{
    try {
        const user=await User.find();
        resp.render("display",{data:user})
    } catch (error) {
        console.log(error);
    }
}

const DeleteUser=async(req,resp)=>{
    const _id=req.query.did
    try {
        await User.findByIdAndDelete(_id)
        
        resp.redirect("display")
        fs.unlinkSync(path.join(__dirname, `../public/profile/${this.img}`));
    } catch (error) {
        console.log(error);
    }
}

const Updatepage=async(req,resp)=>{
    const _id=req.query.uid
    try {
        const user=await User.findOne({_id:_id})
        resp.render("update",{data:user});        
    } catch (error) {
        console.log(error);
    }
}

const UpdateUser=async(req,resp)=>{
    try {
        console.log(req.file.filename);
        const user=  await User.findByIdAndUpdate(req.body.id,{
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            img:req.file.filename
        });
        console.log(user);
        fs.unlinkSync(path.join(__dirname, `../public/profile/${this.img}`));
        resp.redirect("display");
    } catch (error) {
        // const user=  await User.findByIdAndUpdate(req.body.id,{
        //     name:req.body.name,
        //     email:req.body.email,
        //     password:req.body.password,
        //     img:req.file.filename
        // });
        // resp.redirect("display");
        console.log(error);
    }
}
const loginUser=async(req,resp)=>{
    try {
        const user=await User.findOne({email:req.body.email});
        console.log(user);
        const isvaild=await bcrypt.compare(req.body.password,user.password)
        console.log(isvaild);
        if (isvaild) {
            const token=await user.generateToken();
            console.log(token);
            resp.cookie("jwt",token);
            resp.redirect("display");
        } else {
            resp.render("login",{msg:"Invaild email and password"})
        }
    } catch (error) {
        resp.render("login",{msg:"Invaild email and password"})
        
    }
}

// const logoutToken=async(req,resp)=>{
//     try {
//         const user=req.user;
//         const token=req.token;

//       user.Tokens=user.Tokens.filter(ele=>{
//         return ele.token!=token
//       })
//         await user.save();
//         resp.clearcookie("jwt");
//         resp.render("login")
//     } catch (error) {
//         console.log(error);
//     }
// }
const logoutToken=async(req,resp)=>{
    try {
        const tk=user.Tokens.filter(ele=>{
            return ele.token!=token
        })
            await user.save();
            resp.clearcookie("jwt")
            resp.render("login")
        if (tk[0]==undefined) {
            resp.render("login")
            
        } else {
            const user=req.user
            const token=req.token            
        }
    } catch (error) {
        resp.render("login")
        
    }
}
// const logoutAllToken=async(req,resp)=>{
//     try {
//         const user=req.user;
//         const token=req.token;

//         user.Tokens=[];

//         await user.save();
//         resp.clearcookie("jwt");
//         resp.render("login")
//     } catch (error) {
//     console.log(error);        
//     }
// }
const logoutAllToken=async(req,resp)=>{
    try {
        const tk=[];
            await user.save();
            resp.clearcookie("jwt")
            resp.render("login")
        if (tk[0]==undefined) {
            resp.render("login")
            
        } else {
            const user=req.user
            const token=req.token            
        }
    } catch (error) {
        resp.render("login")
        
    }
}
module.exports={
    AddUser,
    DisplayView,
    DeleteUser,
    Updatepage,
    UpdateUser,
    loginUser,
    logoutToken,
    logoutAllToken
};