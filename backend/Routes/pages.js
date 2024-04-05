import express from "express";
import db from "../db.js";

const pageRoutes = express.Router();

pageRoutes.get("/pageData/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const [results] = await db.execute(
      `SELECT page_content FROM pages WHERE slug = ?`,
      [slug]
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
});

export default pageRoutes;
