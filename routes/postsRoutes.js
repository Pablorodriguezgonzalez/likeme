import express from "express";
import {
  getAllPosts,
  addPost,
  updateExistingPost,
  deleteExistingPost,
} from "../controllers/postsController.js";

const router = express.Router();

router.get("/posts", getAllPosts);
router.post("/posts", addPost);
router.put("/posts/:id", updateExistingPost);
router.delete("/posts/:id", deleteExistingPost);

export default router;
