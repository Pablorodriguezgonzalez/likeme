import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../models/postsModel.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (err) {
    console.error("Error al obtener los posts:", err.message);
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

export const addPost = async (req, res) => {
  try {
    const { titulo, img, descripcion } = req.body;
    const newPost = await createPost({ titulo, img, descripcion });
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Error al crear el post:", err.message);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

export const updateExistingPost = async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, img, descripcion } = req.body;
    const updated = await updatePost(id, { titulo, img, descripcion });

    if (!updated) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error al actualizar el post:", err.message);
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};

export const deleteExistingPost = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deletePost(id);

    if (!deleted) {
      return res.status(404).json({ error: "Post no encontrado" });
    }

    res.json({ message: "Post eliminado correctamente", post: deleted });
  } catch (err) {
    console.error("Error al eliminar el post:", err.message);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};
