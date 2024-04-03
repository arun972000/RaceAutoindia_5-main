import express from "express";
import db from "../db.js";
import path from "path";
import multer from "multer";
import sharp from "sharp";
import fs from "fs";

const postRoutes = express.Router();

function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/postUpload");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname);
    // + '-' + path.extname(file.originalname)
  },
});

const upload = multer({ storage: storage });

const singleUpload = upload.single("image_default");

postRoutes.get("/", async (req, res) => {
  try {
    const [results] = await db.execute(
      "SELECT id, image_small, title, user_id, category_id, pageviews, created_at  FROM posts"
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal err" });
  }
});

postRoutes.get("/post-user", async (req, res) => {
  let query = `
  SELECT DISTINCT  
         posts.user_id,
         users.username AS username 
  FROM posts 
  INNER JOIN users ON posts.user_id = users.id
  WHERE 1 = 1`;
  try {
    const [filteredRows] = await db.execute(query);
    res.json(filteredRows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal error" });
  }
});

postRoutes.get("/admin-post", async (req, res) => {
  const filterParams = req.query;
  const offValue = req.query.offset || 1;
  const offset = (offValue - 1) * 10;

  let query = `
  SELECT posts.id, posts.image_small, posts.title, posts.pageviews, posts.created_at, 
         posts.user_id, posts.is_slider, posts.is_breaking, posts.is_featured, 
         posts.category_id, categories.color AS color, categories.name_slug AS name_slug, 
         categories.parent_id AS parent_id, categories.name AS sub_category, 
         users.username AS username 
  FROM posts 
  INNER JOIN users ON posts.user_id = users.id
  INNER JOIN categories ON posts.category_id = categories.id 
  WHERE 1 = 1`;

  let totalPostQuery = `
  SELECT posts.id, posts.image_small, posts.title, posts.pageviews, posts.created_at, 
         posts.user_id, posts.is_slider, posts.is_breaking, posts.is_featured, 
         posts.category_id, categories.color AS color, categories.name_slug AS name_slug, 
         categories.parent_id AS parent_id, categories.name AS sub_category, 
         users.username AS username 
  FROM posts 
  INNER JOIN users ON posts.user_id = users.id
  INNER JOIN categories ON posts.category_id = categories.id 
  WHERE 1 = 1`;

  const queryParams = [];

  if (filterParams.username && filterParams.username !== "none") {
    query += ` AND username = ?`;
    totalPostQuery += ` AND username = ?`;
    queryParams.push(filterParams.username);
  }

  if (filterParams.mainCategory && filterParams.mainCategory !== '') {
    query += ` AND parent_id = ?`;
    totalPostQuery += ` AND parent_id = ?`;
    queryParams.push(filterParams.mainCategory);
  }

  if (filterParams.subCategory && filterParams.subCategory !== '') {
    query += ` AND name_slug = ?`;
    totalPostQuery += ` AND name_slug = ?`;
    queryParams.push(filterParams.subCategory);
  }

  query += ` ORDER BY posts.id DESC LIMIT 10 OFFSET ${offset}`;

  try {
    const [filteredRows] = await db.execute(query, queryParams);
    const [totalPosts] = await db.execute(totalPostQuery, queryParams);
    res.json({ data: filteredRows, totalPost: totalPosts.length });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal error" });
  }
});

postRoutes.get("/is_available/:postType", async (req, res) => {
  try {
    const { postType } = req.params;

    // const [results]=await db.execute(`SELECT id, title, image_small, pageviews FROM posts WHERE ${postType} = 1`)
    const [joinedRow] = await db.execute(
      `SELECT posts.id, posts.image_small, posts.title, posts.pageviews, posts.user_id, posts.is_slider, posts.is_featured, posts.is_breaking, posts.category_id, categories.name_slug AS name_slug, categories.parent_id AS parent_id, categories.color AS color, categories.name AS sub_category, users.username AS username 
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      INNER JOIN categories ON posts.category_id = categories.id
      WHERE ${postType} = 1`
    );

    const [category] = await db.execute(
      `SELECT parent_id, name, name_slug, id FROM categories WHERE parent_id = 0`
    );

    const results = joinedRow.map((item) => {
      const findParent = category.find((obj) => item.parent_id == obj.id);

      if (findParent) {
        return {
          ...item,
          main_category: findParent.name,
          main_category_slug: findParent.name_slug,
        };
      } else {
        return { ...item, main_category: null, main_category_slug: null };
      }
    });

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
});

postRoutes.get("/sliced-all", async (req, res) => {
  try {
    const [results] = await db.execute(
      "SELECT * FROM posts ORDER BY id DESC LIMIT 10"
    );
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal err" });
  }
});

postRoutes.get("/sliderView", async (req, res) => {
  try {
    const [results] = await db.execute(`SELECT * FROM slider WHERE id = 1`);

    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
});

postRoutes.put("/sliderEdit", async (req, res) => {
  try {
    const { slider_type } = req.body;
    await db.execute(`UPDATE slider SET slider_type = ? WHERE id = 1`, [
      slider_type,
    ]);
    res.json("updated slider data");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
});

postRoutes.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let { is_breaking, is_featured, is_slider } = req.body;

    const [row] = await db.execute(
      `SELECT is_slider, is_breaking, is_featured FROM posts WHERE id = ${id}`
    );

    if (is_breaking === null) {
      is_breaking = row[0].is_breaking;
    }
    if (is_featured === null) {
      is_featured = row[0].is_featured;
    }

    if (is_slider === null) {
      is_slider = row[0].is_featured;
    }

    const query = [is_breaking, is_featured, is_slider];

    const [results] = await db.execute(
      `UPDATE posts SET is_breaking = ?, is_featured = ?, is_slider = ? WHERE id = ${id}`,
      query
    );

    res.json({ message: "updated suceesfully", data: results });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal err" });
  }
});

postRoutes.post("/upload", singleUpload, async (req, res) => {
  try {
    const { originalname } = req.file;
    const {
      title,
      keywords,
      summary,
      content,
      is_slider,
      is_featured,
      is_recommended,
      is_breaking,
      category_id,
    } = req.body;
    const title_slug = title.split(" ").join("-");

    const image_default = "./public/postUpload/" + originalname;
    const image_big = "./public/postUpload/750" + originalname;
    const image_small = "./public/postUpload/140" + originalname;
    const image_mid = "./public/postUpload/380" + originalname;

    // Create directories if they don't exist
    try {
      await fs.promises.access("./public/postUpload");
    } catch (err) {
      if (err.code === "ENOENT") {
        await fs.promises.mkdir("./public/postUpload");
      } else {
        throw err;
      }
    }

    const query = [
      title,
      title_slug,
      keywords,
      summary,
      content,
      category_id,
      image_big,
      image_default,
      image_mid,
      image_small,
      is_slider,
      is_featured,
      is_recommended,
      is_breaking,
    ];

    await db.execute(
      `
      INSERT INTO posts (
        title, title_slug, keywords, summary, content, category_id, image_big, image_default, 
        image_mid, image_small, is_slider, is_featured, is_recommended,
        is_breaking
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      query
    );

    // Resize images
    await sharp(`postUpload/${originalname}`)
      .resize(750, 500)
      .toFile(image_big);
    await sharp(`postUpload/${originalname}`)
      .resize(140, 90)
      .toFile(image_small);
    await sharp(`postUpload/${originalname}`)
      .resize(380, 226)
      .toFile(image_mid);

    console.log("Post submitted successfully");
    res.status(200).json({ message: "Post submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

postRoutes.get("/main/:maincategory/:subcategory", async (req, res) => {
  try {
    const { subcategory } = req.params;

    const [row] = await db.execute(
      `SELECT * FROM categories WHERE name_slug = ?`,
      [subcategory]
    );

    if (row.length > 0) {
      const category_id = row[0].id;

      const [results] = await db.execute(
        `SELECT id, title, title_slug, summary, image_big, image_mid, created_at FROM posts WHERE category_id = ? ORDER BY id DESC`,
        [category_id]
      );

      res.json(results);
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal error" });
  }
});

postRoutes.get("/main/:maincategory", async (req, res) => {
  try {
    const { maincategory } = req.params;
    const [row] = await db.execute(
      `SELECT * FROM categories WHERE name_slug = ?`,
      [maincategory]
    );

    if (row.length > 0) {
      const parent_id = row[0].id;

      const [subElement] = await db.execute(
        `SELECT id FROM categories WHERE parent_id = ?`,
        [parent_id]
      );

      const placeholder = subElement.map(() => "?").join(",");
      const subId = subElement.map((item) => item.id);

      const results = await db.execute(
        `SELECT id, title, title_slug, summary, image_big, image_mid, created_at FROM posts WHERE category_id IN (${placeholder})`,
        subId
      );

      res.status(200).json(results);
    } else {
      res.status(404).send("Main category not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

postRoutes.get("/main-sliced/:maincategory", async (req, res) => {
  try {
    const { maincategory } = req.params;
    const [row] = await db.execute(`SELECT * FROM categories WHERE name = ?`, [
      maincategory,
    ]);

    if (row.length > 0) {
      const parent_id = row[0].id;

      const [subElement] = await db.execute(
        `SELECT id FROM categories WHERE parent_id = ?`,
        [parent_id]
      );

      const placeholder = subElement.map(() => "?").join(",");
      const subId = subElement.map((item) => item.id);

      const results = await db.execute(
        `SELECT * FROM posts WHERE category_id IN (${placeholder}) ORDER BY id DESC LIMIT 6 `,
        subId
      );

      res.status(200).json(results);
    } else {
      res.status(404).send("Main category not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

postRoutes.get("/featured", async (req, res) => {
  try {
    const [results] = await db.execute(
      `SELECT id, title, title_slug, summary, image_big, image_mid, created_at FROM posts WHERE is_featured = 1 ORDER BY id DESC LIMIT 4`
    );
    res.json(results);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

postRoutes.get("/breaking", async (req, res) => {
  try {
    const [results] = await db.execute(
      `SELECT id, title, title_slug, summary, image_big, image_mid, created_at FROM posts WHERE is_breaking = 1 ORDER BY id DESC LIMIT 4`
    );
    res.json(results);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

postRoutes.get("/slider", async (req, res) => {
  try {
    const [results] = await db.execute(
      `SELECT id, title, title_slug, summary, image_big, image_mid, created_at FROM posts WHERE is_slider = 1 ORDER BY id DESC LIMIT 4`
    );
    res.json(results);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

postRoutes.get("/singlePost/:title_slug",async(req,res)=>{
  try{
    const {title_slug}=req.params;

    const [results]=await db.execute(`SELECT id, title, image_big, summary, content,created_at FROM posts WHERE title_slug = ?`,[title_slug])
    res.json(results)
  }catch(err){
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
})

postRoutes.get("/single/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [joinedRow] = await db.execute(
      `SELECT posts.id, posts.image_mid, posts.summary, posts.title, posts.content, posts.keywords, posts.pageviews, posts.user_id, posts.is_slider, posts.is_featured, posts.is_breaking, posts.category_id, categories.name_slug AS name_slug, categories.parent_id AS parent_id, categories.color AS color, categories.name AS sub_category, users.username AS username 
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      INNER JOIN categories ON posts.category_id = categories.id
      WHERE posts.id = ${id}`
    );

    const [category] = await db.execute(
      `SELECT parent_id, name, name_slug, id FROM categories WHERE parent_id = 0`
    );

    const results = joinedRow.map((item) => {
      const findParent = category.find((obj) => item.parent_id == obj.id);

      if (findParent) {
        return {
          ...item,
          main_category: findParent.name,
          main_category_slug: findParent.name_slug,
        };
      } else {
        return { ...item, main_category: null, main_category_slug: null };
      }
    });

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
});

export default postRoutes;
