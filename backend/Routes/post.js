import express from "express"
import db from "../db.js";
import path from "path"
import multer from 'multer';
import sharp from "sharp";
import fs from "fs"


const postRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/postUpload')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
        // + '-' + path.extname(file.originalname)
    }
})

const upload = multer({ storage: storage })

const singleUpload = upload.single('image_default')


postRoutes.get("/", async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM posts');
        res.json(results);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "internal err" })
    }
})

postRoutes.get("/sliced-all", async (req, res) => {
    try {
        const [results] = await db.execute('SELECT * FROM posts ORDER BY id DESC LIMIT 10');
        res.json(results);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "internal err" })
    }
})



postRoutes.post('/upload', singleUpload, async (req, res) => {
    try {
        const { originalname } = req.file;

        const image_default = "./public/postUpload/" + originalname

        const image_big = "./public/postUpload/" + "750" + originalname;

        const image_small = "./public/postUpload/" + "140" + originalname;

        const image_mid = "./public/postUpload/" + "380" + originalname;

        try {
            await fs.promises.access("./public/postUpload");
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.promises.mkdir("./public/postUpload");
            } else {
                throw err;
            }
        }


        res.status(200).json({ message: 'post submitted successfully' });

        if (res.statusCode == 200) {
            try {
                const {
                    title, title_slug, keywords, summary, content,
                    image_slider, optional_url, is_slider,
                    is_featured, is_recommended, is_breaking,
                    show_right_column, image_description, category,
                    created_at
                } = req.body;

                const [row] = await db.execute(`SELECT id FROM categories WHERE name = ?`, [category])
                if (row.length > 0) {
                    const category_id = row[0].id;

                    const query = [
                        title, title_slug, keywords, summary, content, category_id, image_big, image_default,
                        image_slider, image_mid, image_small, optional_url, is_slider,
                        is_featured, is_recommended, is_breaking,
                        show_right_column, image_description,
                        created_at
                    ];

                    const [results] = await db.execute(`
                    INSERT INTO posts (
                        title, title_slug, keywords, summary, content, category_id, image_big, image_default, image_slider,
                        image_mid, image_small, optional_url, is_slider, is_featured, is_recommended,
                        is_breaking, show_right_column, image_description, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, query);

                    await sharp(`./public/postUpload/${originalname}`)
                        .resize(750, 500)
                        .toFile(image_big);

                    await sharp(`./public/postUpload/${originalname}`)
                        .resize(140, 90)
                        .toFile(image_small);

                    await sharp(`./public/postUpload/${originalname}`)
                        .resize(380, 226)
                        .toFile(image_mid);

                    console.log("post submitted")
                }
            } catch (err) {
                console.error(err);
                throw new Error('Image processing failed.');


            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


postRoutes.get("/sub/:subcategory", async (req, res) => {
    try {
        const { subcategory } = req.params;

        const [row] = await db.execute(`SELECT * FROM categories WHERE name = ?`, [subcategory])

        if (row.length > 0) {
            const category_id = row[0].id;

            const [results] = await db.execute(`SELECT * FROM posts WHERE category_id = ?`, [category_id])

            res.json(results)
        } else {

            res.status(404).json({ message: "not found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "internal error" })
    }
})

postRoutes.get("/main/:maincategory", async (req, res) => {
    try {
        const { maincategory } = req.params;
        const [row] = await db.execute(`SELECT * FROM categories WHERE name = ?`, [maincategory]);

        if (row.length > 0) {
            const parent_id = row[0].id;

            const [subElement] = await db.execute(`SELECT id FROM categories WHERE parent_id = ?`, [parent_id]);

            const placeholder = subElement.map(() => '?').join(",");
            const subId = subElement.map(item => item.id)

            const results = await db.execute(`SELECT * FROM posts WHERE category_id IN (${placeholder})`, subId);


            res.status(200).json(results);
        } else {
            res.status(404).send('Main category not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

postRoutes.get("/main-sliced/:maincategory", async (req, res) => {
    try {
        const { maincategory } = req.params;
        const [row] = await db.execute(`SELECT * FROM categories WHERE name = ?`, [maincategory]);

        if (row.length > 0) {
            const parent_id = row[0].id;

            const [subElement] = await db.execute(`SELECT id FROM categories WHERE parent_id = ?`, [parent_id]);

            const placeholder = subElement.map(() => '?').join(",");
            const subId = subElement.map(item => item.id)

            const results = await db.execute(`SELECT * FROM posts WHERE category_id IN (${placeholder}) ORDER BY id DESC LIMIT 6 `, subId);


            res.status(200).json(results);
        } else {
            res.status(404).send('Main category not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

postRoutes.get("/featured", async (req, res) => {
    try {
        const [results] = await db.execute(`SELECT * FROM posts WHERE is_featured = 1 ORDER BY id DESC LIMIT 4`)
        res.json(results)
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
})

postRoutes.get("/breaking", async (req, res) => {
    try {
        const [results] = await db.execute(`SELECT * FROM posts WHERE is_breaking = 1 ORDER BY id DESC LIMIT 4`)
        res.json(results)
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
})

postRoutes.get("/slider", async (req, res) => {
    try {
        const [results] = await db.execute(`SELECT * FROM posts WHERE is_slider = 1 ORDER BY id DESC LIMIT 4`)
        res.json(results)
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
})



export default postRoutes;