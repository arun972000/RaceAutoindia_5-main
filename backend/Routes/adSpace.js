import express from "express";
import db from "../db.js";

const adSpaceRoutes = express.Router();

adSpaceRoutes.get("/titles", async (req, res) => {
  try {
    const [results] = await db.execute(`SELECT ad_space FROM ad_spaces`);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal error" });
  }
});

adSpaceRoutes.get("/single_ad/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const [results] = await db.execute(
      `SELECT ad_code_728 FROM ad_spaces WHERE ad_space = ?`,
      [title]
    );
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json("internal server error");
  }
});

adSpaceRoutes.put("/update_ad/:title",async(req,res)=>{
    try{
        const {title}=req.params;
        const {image_code}=req.body
        const [results]=await db.execute(`UPDATE ad_spaces SET ad_code_728 = ? WHERE ad_space = ?`,[image_code,title])
        res.json({message:"updated successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }
})

export default adSpaceRoutes;
