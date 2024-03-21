import express from "express"
import db from "../db.js";

const routingRouter = express.Router();


routingRouter.get("/all-routes", async (req, res) => {
    try {
        const [results] = await db.execute(`SELECT * FROM routes`)
        res.status(200).json(results)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})



export default routingRouter;