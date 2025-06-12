const express = require("express");
require('dotenv').config();
const router = require("./routes/api_routes");

const server = express();
server.use(express.json());
server.use("/",router);

const PORT = 3000;
server.listen(PORT,()=>{
    console.log(`listening in port ${PORT}`)});