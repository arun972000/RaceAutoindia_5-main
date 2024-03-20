import express from "express"
import db from "../db.js";

const categoryRoutes = express.Router();

categoryRoutes.get("/categoryList", async (req, res) => {
    try {
        const [results] = await db.execute(`SELECT * FROM categories WHERE parent_id = 0`);
        res.json(results);

    } catch (err) {
        console.log(err)
        res.status(500).json('internal server error')
    }
})

categoryRoutes.get("/main_sub/:category", async (req, res) => {
    try {
        const { category } = req.params;

        const [row] = await db.execute(`SELECT * FROM categories WHERE name = ?`, [category])

        if (row.length > 0) {
            const parent = row[0].id;

            const [results] = await db.execute(`SELECT * FROM categories WHERE parent_id = ${parent}`)

            res.json({ parent: row, data: results })
        } else {
            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "internal server error" })
    }
})


categoryRoutes.post("/create_main", async (req, res) => {
    try {

        const { name, description, keywords, color, block_type } = req.body;

        const name_slug = name.split(" ").join("-")
        const query = [name, name_slug, description, keywords, color, block_type]
        await db.execute(`INSERT INTO categories (name, name_slug, description, keywords, color, block_type) VALUES (?, ?, ?, ?, ?, ?)`, query)
        res.json("main_category created")
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "internal server error" })
    }
})


categoryRoutes.post("/create_sub", async (req, res) => {
    try {
        const { name, description, keywords, color, block_type, parent_name } = req.body; 
        const name_slug = name.split(" ").join("-")
        const [parent] = await db.execute(`SELECT * FROM categories WHERE name = ?`, [parent_name])
        const parent_id = parent[0].id;
        const query = [name, name_slug, description, keywords, color, block_type, parent_id]
        await db.execute(`INSERT INTO categories (name, name_slug, description, keywords, color, block_type, parent_id) VALUES (?,?,?,?,?,?,?)`, query)
        res.json("sub_category created")
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "internal server error" })
    }
})


categoryRoutes.put("/sub_edit/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const { name, description, keywords, color, block_type, parent_name } = req.body;
        const name_slug = name.split(" ").join("-")
        const [parent] = await db.execute(`SELECT * FROM categories WHERE name = ?`, [parent_name])

        const parent_id = parent[0].id;
        const query = [name, name_slug, description, keywords, color, block_type, parent_id, id]
        const [row] = await db.execute(`SELECT * FROM categories WHERE id=?`, [id])
        if (row.length < 1) {
            return res.status(404).json({ message: "item not found" })
        }
        await db.execute(`UPDATE categories SET name = ?, name_slug = ?, description = ?, keywords = ?, color = ?, block_type = ?, parent_id = ? WHERE id = ?`, query)

        res.json({ message: "sub_menu edited" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ err: "internal server error" })
    }
})


export default categoryRoutes;


