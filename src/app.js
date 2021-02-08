const express = require("express");
require("./db/conn");
const Student = require('./models/students');

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

// created a new Student

// app.post("/students",(req,res)=>{
//     console.log(req.body);
//     const user = new Student(req.body);


//     user.save().then(() => {
//         res.status(201);
//         res.send(user);
//     }).catch((e) => {
//         res.status(400);
//         res.send(e);
//     })

// })



app.post("/students", async(req,res)=>{
   

    try {
         const user = new Student(req.body);
          const createUser = await user.save();
         res.status(201).send(createUser);

    } catch (e) { res.status(400).send(e); }
})



// get request read the data from the server 
app.get("/students", async(req,res)=>{
   

    try {
        const studentData = await Student.find();
        res.send(studentData);

    } catch (e) { 
        res.send(e);
     }
})

//get the indivisual student data
app.get("/students/:id", async(req,res)=>{
    try {
        const _id = req.params.id;
        const studentDta = await Student.findById(_id);
        res.send(studentDta);
    } catch (e) {
        res.send(e);
    }
})

//update the student data by id
app.patch("/students/:id", async(req,res)=>{
    try {
           const _id = req.params.id;
           const updateStudent = await Student.findByIdAndUpdate(_id, req.body,{
               new: true
           }); 
           res.send(updateStudent);
    } catch (e) {
            res.status(404).send(e);
    }
})

app.listen(port , () =>{
    console.log(`connection is established at port ${port}`);
})
