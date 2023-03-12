const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router')

const app = express();

const port = 8000;

app.use(bodyParser());
app.use(cors());
app.use("/", router)
app.use("/api/allcontacts", router)
app.use("/api/addcontacts", router)
app.listen(port, ()=> console.log("Server started at port 8000"))