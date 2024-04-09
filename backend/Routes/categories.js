import express from "express";
import db from "../db.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/categoryList", async (req, res) => {
  try {
    const [results] = await db.execute(
      `SELECT id, name, name_slug, description, keywords, show_at_homepage, show_on_menu, color, block_type FROM categories WHERE parent_id = 0`
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

categoryRoutes.get("/categoryList_sub", async (req, res) => {
  try {
    const [results] = await db.execute(`SELECT * FROM categories`);

    const row = results.map((item) => {
      const parentValue = results.find((data) => item.parent_id == data.id);

      if (parentValue) {
        return { ...item, parent: parentValue.name };
      } else {
        return { ...item, parent: null };
      }
    });

    const filteredData = row.filter((item) => item.parent !== null);

    res.json(filteredData);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

categoryRoutes.get("/single/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.execute(
      `SELECT * FROM categories WHERE id = ${id}`
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

categoryRoutes.get("/main_sub/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const [row] = await db.execute(`SELECT * FROM categories WHERE id = ?`, [
      category,
    ]);

    if (row.length > 0) {
      const parent = row[0].id;

      const [results] = await db.execute(
        `SELECT * FROM categories WHERE parent_id = ${parent}`
      );

      res.json({ parent: row, data: results });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

categoryRoutes.post("/create_main", async (req, res) => {
  try {
    const { name, description, keywords, color, block_type } = req.body;

    const name_slug = name.split(" ").join("-");
    const query = [name, name_slug, description, keywords, color, block_type];
    await db.execute(
      `INSERT INTO categories (name, name_slug, description, keywords, color, block_type) VALUES (?, ?, ?, ?, ?, ?)`,
      query
    );
    res.json("main_category created");
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

categoryRoutes.post("/create_sub", async (req, res) => {
  try {
    const { name, description, keywords, color, block_type, parent_name } =
      req.body;
    const name_slug = name.split(" ").join("-");
    const [parent] = await db.execute(
      `SELECT * FROM categories WHERE name = ?`,
      [parent_name]
    );
    const parent_id = parent[0].id;
    const query = [
      name,
      name_slug,
      description,
      keywords,
      color,
      block_type,
      parent_id,
    ];
    await db.execute(
      `INSERT INTO categories (name, name_slug, description, keywords, color, block_type, parent_id) VALUES (?,?,?,?,?,?,?)`,
      query
    );
    res.json("sub_category created");
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

categoryRoutes.put("/edit-main/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      categoryName,
      description,
      keywords,
      color,
      blockType,
      show_on_menu,
      show_at_homepage,
    } = req.body;

    const name_slug = categoryName.split(" ").join("-");

    const query = [
      categoryName,
      name_slug,
      description,
      keywords,
      color,
      blockType,
      show_on_menu,
      show_at_homepage,
      id,
    ];

    const [row] = await db.execute(`SELECT * FROM categories WHERE id=?`, [id]);
    if (row.length < 1) {
      return res.status(404).json({ message: "item not found" });
    }
    await db.execute(
      `UPDATE categories SET name = ?, name_slug = ?, description = ?, keywords = ?, color = ?, block_type = ?, show_on_menu = ?, show_at_homepage= ? WHERE id = ?`,
      query
    );

    res.json({ message: "sub_menu edited" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

categoryRoutes.put("/edit-sub/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      categoryName,
      description,
      keywords,
      show_on_menu,
      show_at_homepage,
      parent_id,
    } = req.body;

    const name_slug = categoryName.split(" ").join("-");

    const query = [
      categoryName,
      name_slug,
      description,
      keywords,
      parent_id,
      show_on_menu,
      show_at_homepage,
      id,
    ];


    const [row] = await db.execute(`SELECT * FROM categories WHERE id=?`, [id]);
    if (row.length < 1) {
      return res.status(404).json({ message: "item not found" });
    }
    await db.execute(
      `UPDATE categories SET name = ?, name_slug = ?, description = ?, keywords = ?, parent_id = ?, show_on_menu = ?, show_at_homepage= ? WHERE id = ?`,
      query
    );

    res.json({ message: "sub_menu edited" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "internal server error" });
  }
});

export default categoryRoutes;
