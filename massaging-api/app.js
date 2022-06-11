let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var cors = require('cors');
const messageRoutes = require("./controllers/messagesController");

app.use(bodyParser.json());
app.use(cors());

app.use("/messages", messageRoutes);
app.listen(3001, () => {
  console.log("app is running on port 3001");
});