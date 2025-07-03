const express = require("express");
require('dotenv').config();
const cors = require('cors');
const router = require("./routes/api_routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/",router)



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
