const express=require('express')
const {connected} = require('./connection')
const cors=require('cors')
const multer=require('multer')
const app=express()

const path=require('path')
const Videorouter=require('./Routes/Video')
const bodyParser = require("body-parser"); 
const {UserRoute}=require('./Routes/User')
app.use(cors({
    origin: "*", // Allow all origins (change to specific domain in production)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow cookies & authentication headers
  }));
app.use(express.json())
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log("Incoming Headers:", req.headers);
    next();
  });
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/user",UserRoute)
// app.use("/uploads", express.static("uploads"));
app.use("/video",Videorouter);

app.get("/",async(req,res)=>{
    try {

        res.send({msg:"hello world"})
    } catch (error) {
        res.send({"error":error})
    }
} )

app.post("/upload", upload.single('file'), (req, res) => {
    // console.log("Headers:", req.headers);
    // console.log("Body:", req.body);
    // console.log("File:", req.file);
  
    // if (!req.file) {
    //   return res.status(400).json({ error: "No file uploaded" });
    // }
  
    res.json({ message: "Upload successful", file: req.file });
  });
  

app.listen(2200,async(req,res)=>{
    await connected
    console.log("connected to server")
})