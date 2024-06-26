require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const session = require("express-session");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const projectRoutes = require("./routes/projectRoutes");
const shortsRoutes = require("./routes/shortsRoutes");
const vacancyRoutes = require("./routes/vacancyRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const path = require("path");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "dist")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: "nrub87g84bgfy4g483gfy4",
    resave: true,
    saveUninitialized: true,
  })
);

// MongoDB connection with environment variables
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Routes
    app.use("/", adminRoutes);
    app.use("/api/admins", routes);
    app.use("/api/auth", authRoutes);
    app.use("/api/blogs", blogRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/projects", projectRoutes);
    app.use("/api/shorts", shortsRoutes);
    app.use("/api/vacancies", vacancyRoutes);
    app.use("/api/users", userRoutes);

    // Start the server
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(
        `Server is running on ${process.env.PROTOCOL}://${process.env.SERVER_IP}:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
