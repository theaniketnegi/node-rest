const User = require("../models/user.js")

async function getAllUsers(req, res){
    const dbUsers = await User.find({});
    return res.json(dbUsers);
}

async function getUserById(req, res){
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "Not found!" });
    return res.json(user);
}

async function patchUserById(req, res){
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
    if (!user) return res.status(404).json({ msg: "User doesn't exist" });

    await User.findByIdAndUpdate(id, {
      lastName: newUser.last_name,
      firstName: newUser.first_name,
      gender: newUser.gender,
      jobTitle: newUser.job_title,
      email: newUser.email,
    });

    return res.json({ status: "Success", id });
}

async function deleteUserById(req, res){
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.json({ status: "Success", id });
}

async function addUser(req, res){
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
      jobTitle: body.job_title,
    });
    console.log(result);
    return res.status(201).json({ msg: "Success!", id:result._id });
}

module.exports = {getAllUsers, getUserById, patchUserById, deleteUserById, addUser};