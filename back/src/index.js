const express = require("express");
const cors = require("cors");
require("dotenv").config();

// const resourceRoutes = require("./routes/api_routes/resource.routes");
const router = require("./routes/api_routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/",router)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
