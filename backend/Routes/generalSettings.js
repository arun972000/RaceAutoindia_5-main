import express from "express";
import db from "../db.js";

const settingRoutes = express.Router();

settingRoutes.get("/headerCode", async (req, res) => {
  try {
    const [results] = await db.execute(
      `SELECT custom_header_codes FROM general_settings WHERE id = 1`
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
});

settingRoutes.put("/update_header", async (req, res) => {
  try {
    const payload = req.body;
    const [results] = await db.execute(
      `UPDATE general_settings SET custom_header_codes = ? WHERE id = 1`,
      [payload.headerCode]
    );

    res.json({ message: "header updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server err" });
  }
});

settingRoutes.get("/fonts", async (req, res) => {
  try {
    const [results] = await db.execute(
      `SELECT id, font_name, font_key, font_url, font_family FROM fonts`
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal error");
  }
});

settingRoutes.get("/default-font", async (req, res) => {
    try {
      const [results] = await db.execute(
        `SELECT id, font_name, font_key, font_url, font_family FROM fonts WHERE is_default = 1`
      );
      res.json(results);
    } catch (err) {
      console.log(err);
      res.status(500).json("internal error");
    }
  });

settingRoutes.get("/font/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [results] = await db.execute(
      `SELECT id, font_name, font_key, font_url, font_family FROM fonts WHERE id = ${id}`
    );

    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal error");
  }
});

settingRoutes.put("/font-edit/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [row] = await db.execute(
      `UPDATE fonts SET is_default = 0 WHERE is_default = 1`
    );

    const [results] = await db.execute(
      `UPDATE fonts SET is_default = 1 WHERE id = ${id}`
    );

    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal error");
  }
});

export default settingRoutes;
