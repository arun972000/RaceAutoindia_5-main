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

pageRoutes.get("/leftBar", async (req, res) => {
  try {
    const [results] = await db.execute(`SELECT * FROM pages WHERE id = 20`);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server");
  }
});

pageRoutes.put("/edit-leftbar", async (req, res) => {
  try {
    const {visibility} = req.body;
    const [results] = await db.execute(`UPDATE pages SET visibility = ? WHERE id = 20`, [
      visibility
    ]);
    res.json("updated");
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
    
  }
});

export default pageRoutes;
