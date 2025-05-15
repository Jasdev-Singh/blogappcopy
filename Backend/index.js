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


const frontendurl = "https://blogappcopy-blogs.up.railway.app";


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
