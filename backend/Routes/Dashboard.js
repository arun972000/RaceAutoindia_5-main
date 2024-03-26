import express from "express";
import db from "../db.js";

const dashboardRoutes = express.Router();

dashboardRoutes.get("/totalnumbers", async (req, res) => {
  try {
    const [totalpostResult] = await db.execute(
      `SELECT COUNT(*) AS totalPost FROM posts`
    );
    const [totaluserResult] = await db.execute(
      `SELECT COUNT(*) AS totalUser FROM users`
    );

    const totalPost = totalpostResult[0]?.totalPost ?? 0;
    const totalUser = totaluserResult[0]?.totalUser ?? 0;

    res.status(200).json({ totalPost, totalUser });
  } catch (err) {
    console.error("Error fetching total numbers:", err);
    res.status(500).json("Internal server error");
  }
});

dashboardRoutes.get("/postChart/:year", async (req, res) => {
  try {
    const { year } = req.params;
    const [results] = await db.execute(
      `SELECT category_id, created_at FROM posts`
    );

    const postCountsByMonth = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
    };

    results.forEach((item) => {
      const dateString = item.created_at;
      const yeardate = new Date(dateString);
      const DByear = yeardate.getFullYear();

      if (year == DByear) {
        const timestamp = item.created_at;
        const date = new Date(timestamp);
        const month = date.getMonth() + 1;

        postCountsByMonth[month] = (postCountsByMonth[month] || 0) + 1;
      }
    });
    res.status(200).json(postCountsByMonth);
  } catch (err) {
    console.error("Error fetching post chart data:", err);
    res.status(500).json("Internal server error");
  }
});

dashboardRoutes.get("/most_viewed", async (req, res) => {
  try {
    const [results] = await db.execute(
      `SELECT title, title_slug, image_mid, created_at, pageviews FROM posts ORDER BY pageviews DESC LIMIT 6`
    );

    res.json(results);
  } catch (err) {
    console.error("Error fetching post chart data:", err);
    res.status(500).json("Internal server error");
  }
});

export default dashboardRoutes;
