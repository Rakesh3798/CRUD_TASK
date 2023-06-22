const { AddUser,DisplayView,DeleteUser,Updatepage,UpdateUser,loginUser,logoutToken,logoutAllToken } = require("../controller/usercontroller");
const router=require("express").Router();
const path=require("path");
const fs=require("fs");
const multer=require("multer");
const auth=require("../middleware/auth");


router.get("/",(req,resp)=>{
    resp.render("index");
})
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/profile')
    },
    filename: function (req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + '.jpg')
    }
  })
  
  const upload = multer({ storage: storage })
  

router.post("/adduser",upload.single("file"),AddUser);
router.get("/display",DisplayView);
router.get("/delete",DeleteUser);
router.get("/update",Updatepage);
router.post("/updateuser",upload.single("file"),UpdateUser)
router.get("/loginpage",(req,resp)=>{
    resp.render("login");
})
router.post("/login",loginUser);
router.get("/logout",logoutToken);
router.get("/logoutall",logoutAllToken);

module.exports=router;