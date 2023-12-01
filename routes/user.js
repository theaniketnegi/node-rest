const express = require("express");
const {addUser, deleteUserById, getAllUsers, getUserById, patchUserById} = require("../controllers/user.js")

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(patchUserById)
  .delete(deleteUserById);

module.exports=router;