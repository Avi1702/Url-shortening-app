const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const shortId=require("shortid")

const app=express()
app.use(express.json())
app.use(cors())

const Data_schema=mongoose.Schema({

    full:{
        type:String,
        require:true
    },
    short:{
        type:String,
        require:true,
        default:shortId.generate
    },
    clicks:{
        type:Number,
        require:true,
        default:0
    }

})

const Url_data=new mongoose.model("Url_Data",Data_schema)

mongoose.connect("mongodb://localhost:27017/URL_shortening")

app.get("/",async(req,res)=>{

    const urls=await Url_data.find()
    // console.log(urls)
    res.send(urls)
})

app.post("/short",async(req,res)=>{

    // console.log("hi")
    let {data}=req.body

    //  console.log(data)
     const temp=await new Url_data({
        full:data
     })

     await temp.save()
     res.send("shortened successfull")

})

// app.get("/:short",(req,res)=>{

//     console.log("hi")
//     const {short}=req.params
//     console.log(short)
//     res.send("visited")
// })


app.listen(5000,console.log("port is running at port 5000"))