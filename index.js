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
    return res.json(users.find((user) => user.id === id));
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const newUser = req.body;

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
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, _) => {
    return res.json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
