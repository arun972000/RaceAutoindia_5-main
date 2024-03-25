import express, { json } from "express";
import cors from "cors";
import newsRoutes from "./Routes/newsLetter.js";
import eventRoutes from "./Routes/events.js";
import postRoutes from "./Routes/post.js";
import categoryRoutes from "./Routes/categories.js";
import searchRouter from "./Routes/search.js";
import loginRoutes from "./Routes/user.js";
import routingRouter from "./Routes/route.js";
import dashboardRoutes from "./Routes/Dashboard.js";


const app = express();

app.use(json());
app.use(cors({
    origin: "*"
   
  }));
  

app.use("/api/newsletter", newsRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/post", postRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/search", searchRouter);
app.use("/api/user", loginRoutes);
app.use("/api/routing", routingRouter);
app.use("/api/dashboard", dashboardRoutes);
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  res.json({ status: true, message: "Our node.js app works" });
});

app.listen(PORT, () => console.log(`App listening at port ${PORT}`));
