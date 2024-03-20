import express from "express"
import db from "../db.js";
import path from "path"
import multer from 'multer';
import fs from "fs"


const eventRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/eventsUpload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

const singleUpload = upload.single('image_url')

eventRoutes.get("/", async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM event');
        res.json({ results })
    } catch (err) {
        console.error('Error fetching data from reports:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

eventRoutes.get("/data/:title", async (req, res) => {
    try {
        const { title } = req.params

        const [results] = await db.execute('SELECT * FROM event WHERE title = ?',[title]);

        if (results.length > 0) {
            res.json( results )
        } else {
            res.status(404).json({ err: "data not found" })
        }
    } catch (err) {
        console.error('Error fetching data from reports:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

eventRoutes.get("/eventpage/:category", async (req, res) => {
    try {
        const { category } = req.params
        
        const [results] = await db.execute('SELECT * FROM event WHERE category = ?', [category]);

        if (results.length > 0) {
            res.json( results )
        } else {
            res.status(404).json({ err: "data not found" })
        }
    } catch (err) {
        console.error('Error fetching data from reports:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

eventRoutes.post("/upload", singleUpload, async (req, res) => {
    try {
        const  image_url  = req.file;
        const { title, content, location, category, event_date } = req.body;
        
        const [results] = await db.execute('INSERT INTO event (title, image_url, content, location, category, event_date) VALUES (?, ?, ?, ?, ?, ?)', [title, image_url.filename, content, location, category, event_date]);
        res.json(results)
    } catch (err) {
        console.error('Error fetching data from reports:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

eventRoutes.put("/update/:id", singleUpload, async (req, res) => {
    try {
        const{id}=req.params;
        const image_url = req.file;
        const { title, content, location, category, event_date } = req.body;
        const [results] = await db.execute('UPDATE event SET title = ?, image_url = ?, content = ?, location = ?, category = ?, event_date = ? WHERE id = ?', [title, image_url.filename, content, location, category, event_date, id]);
        res.json(results);
    }catch(err){
        console.error('Error fetching data from reports:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


eventRoutes.delete("/delete/:id",async(req,res)=>{
    try {
        const { id } = req.params
        const [rows] = await db.execute('SELECT image_url FROM event WHERE id = ?', [id]);
       
        const imagePath = `public/uploads/${rows[0].image_url}`

        await db.execute(`DELETE FROM event WHERE id = ${id}`)
        
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully.');
            }
        })
        res.json({ message: "recorded and deleted successfully" })
    } catch (err) {
        console.error('Error submitting form:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default eventRoutes;
