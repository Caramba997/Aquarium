const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.EXPRESS_PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL, {
  dbName: 'aquarium',
});

const Fish = require("./models/Fish");
const Species = require("./models/Species");

app.get("/api/fish", async (req, res) => {
  try {
    const fish = await Fish.find();
    res.json(fish);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/fish", async (req, res) => {
  try {
    const fish = new Fish(req.body);
    const savedFish = await fish.save();
    res.json(savedFish);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.get("/api/species", async (req, res) => {
  try {
    const species = await Species.find();
    res.json(species);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});