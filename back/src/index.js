const express = require("express");
const cors = require("cors");
require("dotenv").config();

const resourceRoutes = require("./routes/api_routes/resource.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta base
app.use("/api/resources", resourceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
