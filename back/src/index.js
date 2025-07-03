require('dotenv').config();
const express = require("express");
const cors = require('cors');
const router = require("./routes/api_routes");

const server = express();
server.use(cors());
server.use(express.json());
server.use("/",router)



const PORT = 3000;
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
