import pool from "../db/connection.js";

export const getPosts = async () => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
  return result.rows;
};

export const createPost = async ({ titulo, img, descripcion }) => {
  const query =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *";
  const values = [titulo, img, descripcion];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const updatePost = async (id, { titulo, img, descripcion }) => {
  const query =
    "UPDATE posts SET titulo = $1, img = $2, descripcion = $3 WHERE id = $4 RETURNING *";
  const values = [titulo, img, descripcion, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const deletePost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
