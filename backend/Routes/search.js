import express from "express"
import db from "../db.js";

const searchRouter = express.Router();

searchRouter.get("/:word", async (req, res) => {
    try {
        const { word } = req.params;
        
        const [results] = await db.execute(`SELECT * FROM posts WHERE LOWER(content) LIKE LOWER('%${word}%') OR LOWER(title) LIKE LOWER('%${word}%') ORDER BY id DESC`);
        if (results.length === 0) {
            return res.status(404).json("Data not found");
        }
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json("Internal server error");
    }
});





export default searchRouter;