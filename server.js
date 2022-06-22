const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const categoryRoute = require("./src/routes/category.router");
const subCategoryRoute = require("./src/routes/subcategory.router");

app.use("/api/categories", categoryRoute);
app.use("/api/subcategories", subCategoryRoute);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
