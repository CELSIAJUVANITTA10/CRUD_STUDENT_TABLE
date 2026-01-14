// const express=require("express");
// const fs=require("fs");
// const cors=require("cors");
// const app=express();
// const PORT=5000;
// app.use(cors());
// app.use(express.json());
// app.listen(PORT,()=>{
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

const express=require("express");
const fs=require("fs");
const cors=require("cors");
const app=express();
const PORT=5000;
app.use(cors());
app.use(express.json());

const readData =()=>{
    const data=fs.readFileSync("data.json");
    return JSON.parse(data);
}
const writeData =(data)=>{
    fs.writeFileSync("data.json",JSON.stringify(data,null,2));
}

app.get("/users",(req,res)=>{
    const data=readData();
    res.json(data.users);
})
app.post("/users",(req,res)=>{
    const data=readData();
    const newUser={
        id:Date.now(),
        name :req.body.name,
        email:req.body.email,
        dept:req.body.dept,
        address:req.body.address,
        age:req.body.age
    }
    data.users.push(newUser);
    writeData(data);
    res.json(newUser);

});
app.put("/users/:id",(req,res)=>{
    const data=readData();
    const postId =Number(req.params.id);
    data.users=data.users.map(p=>
        p.id===postId?{...p,...req.body}:p
    )
    writeData(data);
    res.json({message:"Post Updated"})
});
app.delete("/users/:id",(req,res)=>{
    const data=readData();
    const postId=Number(req.params.id);
    data.users=data.users.filter(p=>p.id!==postId);
    writeData(data);
    res.json({message:"Post Deleted"});
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

