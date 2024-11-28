import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import parseFormAndUploadFiles from './formparser.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.API_PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));

mongoose.connect(process.env.MONGODB_URL, {
  dbName: 'aquarium',
});

import Fish from './models/Fish.js';
import Species from './models/Species.js';

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
    const parsedForm = await parseFormAndUploadFiles(req);
    const fishData = {
      ...parsedForm.fields,
      image: parsedForm.image ? {
        name: parsedForm.image.Key
      } : null
    };
    const fish = new Fish(fishData);
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