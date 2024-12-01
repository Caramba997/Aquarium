import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import parseFormAndUploadFiles from './formparser.js';
import mongoose from 'mongoose';
import Fish from './models/Fish.js';
import Species from './models/Species.js';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reactBuild = path.join(__dirname, './frontend/build');
const DEV = process.argv.some(arg => arg === '--dev');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
if (!DEV) app.use(express.static(reactBuild));

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));

mongoose.connect(process.env.MONGODB_URL, {
  dbName: 'aquarium',
});

/* API routes */

app.get("/api/fish", async (req, res) => {
  try {
    const id = req.query.id;
    let fish;
    if (id) {
      fish = await Fish.findById(id);
    }
    else {
      fish = await Fish.find();
    }
    return res.json(fish);
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
      } : ''
    };
    let id = null;
    if (fishData.id) {
      id = fishData.id;
      delete fishData.id;
      if (fishData.image === '') {
        delete fishData.image;
      }
    }
    fishData.colors = fishData.colors ? fishData.colors.split(',').map(entry => entry.trim().toLowerCase()) : [];
    fishData.characteristics = fishData.characteristics ? fishData.characteristics.split(',').map(entry => entry.trim().toLowerCase()) : [];
    if (id !== null) {
      const savedFish = await Fish.findByIdAndUpdate(id, fishData, { new: true });
      res.json(savedFish);
    }
    else {
      const fish = new Fish(fishData);
      const savedFish = await fish.save();
      res.json(savedFish);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.delete("/api/fish", async (req, res) => {
  try {
    const id = req.query.id;
    const deleteResult = await Fish.deleteOne({ _id: id });
    console.log(deleteResult);
    res.json({ success: true});
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

/* Frontend routes */

if (!DEV) {
  app.get('*', async (req, res) => {
    res.sendFile(path.join(reactBuild, 'index.html'));
  });
}