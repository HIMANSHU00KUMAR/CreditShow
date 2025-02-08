const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const uploadController = require("./controllers/uploadController");
const multer = require("multer");
const cors = require("cors");   


dotenv.config();

const app = express();

const port = 3000;

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const upload = multer({ storage: multer.memoryStorage() });


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/upload", upload.single("file"), uploadController.uploadXML);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
