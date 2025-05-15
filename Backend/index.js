import express from "express"
import postroutes from "./routes/posts.js"
import authroutes from "./routes/auth.js"
import userroutes from "./routes/users.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";
import dotenv from 'dotenv'
dotenv.config();
const app =express()

<<<<<<< HEAD
const frontendurl = "http://localhost:3005";
=======
const frontendurl = "blogappcopy-blogs.up.railway.app";
>>>>>>> 23f4295b1f9433c4aea58e09ef3436dd038b0b7d

app.use(express.json())
app.use(cors());
app.use(cookieParser())
app.use(cors({origin : `${frontendurl}`, credentials:true}));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file=req.file;
    res.status(200).json(file.filename)

}
)

app.use("/api/auth",authroutes)
app.use("/api/posts",postroutes)
app.use("/api/users",userroutes)

app.listen(process.env.PORT || 8800,()=>{
    console.log("connected");
})
