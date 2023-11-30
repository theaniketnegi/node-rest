const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `<ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    if(!user)
      return res.status(404).json({msg:"Not found!"});
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const newUser = req.body;

    const checkUserExists = users.find(user=>user.id===id) ? true : false;
    if(!checkUserExists)
      return res.status(404).json({msg:"User doesn't exist"});
    const newUsers = users.map((user) => {
      if (user.id === id) return { ...newUser, id };
      else return user;
    });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(newUsers), (err, _) => {
      return res.json({ status: "Success", id });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const newUsers = users.filter((user) => user.id !== id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(newUsers), (err, _) => {
      return res.json({ status: "Success", id });
    });
  });

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, _) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
