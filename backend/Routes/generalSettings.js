import express from "express"
import db from "../db.js";

const settingRoutes=express.Router();


settingRoutes.get("/headerCode",async(req,res)=>{
    try{
        const [results]=await db.execute(`SELECT custom_header_codes FROM general_settings WHERE id = 1`)
        res.json(results)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }
})

settingRoutes.put("/update_header",async(req,res)=>{
    try{
        const payload=req.body;
        const [results]=await db.execute(`UPDATE general_settings SET custom_header_codes = ? WHERE id = 1`,[payload.headerCode])

        res.json({message:"header updated successfully"})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"internal server err"})
    }
})



export default settingRoutes;