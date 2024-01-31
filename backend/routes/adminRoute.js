import express from "express";
import cookieParser from "cookie-parser";
import { protectadmin } from "../middileware/adminMiddileware.js";
import {
  adminLogin,
  logout,
  addUser,
  allUser,
  getUser,
  editUser,
  deleteUser,
  searchUsers,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(cookieParser());

router.get("/all", protectadmin, allUser);
router.get("/:id", protectadmin, getUser);

router.put("/:id", protectadmin, editUser);
router.delete("/:id", protectadmin, deleteUser);
router.post("/add", protectadmin, addUser);
router.get("/search", protectadmin, searchUsers);
// router.route("/").get(protectadmin, allUser).post(protectadmin, addUser);
// router.route("/:id").get(protectadmin, editUser).put(protectadmin, deleteUser);

router.post("/adminlogin", adminLogin);
router.post("/logout", logout);

export default router;
