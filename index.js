const express = require("express");
const mongoose = require('mongoose');

const app = express();
const PORT = 8000;
const MONGO_URL = "";
//Connection
mongoose.connect(`${MONGO_URL}/project-01`).then(()=>console.log("MongoDB connected")).catch((err)=>console.log(err));
//Schema
const userSchema = new mongoose.Schema({
  firstName:{
    type: String,
    required: true,

  },
  lastName:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  gender:{
    type: String,
    required: true,
  }, 
  jobTitle:{
    type: String,
    required: true,
  }
}, {timestamps:true})

const User = mongoose.model('user', userSchema);
app.use(express.urlencoded({ extended: false }));

app.get("/users", async (req, res) => {
  const dbUsers = await User.find({});
  const html = `<ul>
        ${dbUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const dbUsers = await User.find({});
  return res.json(dbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user)
      return res.status(404).json({msg:"Not found!"});
    return res.json(user);
  })
  .patch( async (req, res) => {

    const newUser = req.body;
      if (
    !newUser ||
    !newUser.first_name ||
    !newUser.last_name ||
    !newUser.gender ||
    !newUser.email ||
    !newUser.job_title
  )
    res.status(400).json({ msg: "All fields are required!" });
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user)
      return res.status(404).json({msg:"User doesn't exist"});

    await User.findByIdAndUpdate(id, {
      lastName: newUser.last_name,
      firstName: newUser.first_name,
      gender: newUser.gender,
      jobTitle: newUser.job_title,
      email: newUser.email
    })

    return res.json({status:"Success", id});
  })
  .delete(async(req, res) => {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.json({status:"Success", id});
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_title
  )
    res.status(400).json({ msg: "All fields are required!" });

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    gender: body.gender,
    email: body.email,
    jobTitle: body.job_title
  })
  console.log(result);
  return res.status(201).json({msg:"Success!"})
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
