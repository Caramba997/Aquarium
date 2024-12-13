import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import parseFormAndUploadFiles from './formparser.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import Fish from './models/Fish.js';
import User from './models/User.js';
import { fileURLToPath } from 'node:url';
import { createToken, verifyToken } from './auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const reactBuild = path.join(__dirname, './frontend/build');
const DEV = process.argv.some(arg => arg === '--dev');

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
  credentials: true,
  allowedHeaders: 'Content-Type, Set-Cookie'
}));
app.use(express.json());
app.use(cookieParser());
app.use(verifyToken);
if (!DEV) app.use(express.static(reactBuild));

app.listen(PORT, () => console.log(`Express server running on port ${PORT}`));

mongoose.connect(process.env.MONGODB_URL, {
  dbName: 'aquarium'
});

/* API routes */

if (DEV) {
  app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "Username or Password not present"
      });
    }
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        password: hash,
        created_at: new Date()
      }).then((user) => {
        return res.status(200).json({
          message: "User successfully created",
          user,
        });
      }).catch((error) => {
        return res.status(400).json({
          message: "Error creating user",
          error: error.message,
        });
      });
    });
  });
}

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present"
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    } else {
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const { token, expiration } = createToken(user, 90);
          return res.status(200).json({
            message: "Login successful",
            token: token,
            username: user.username,
            expiration: new Date(Date.now() + expiration * 1000).toISOString()
          });
        }
        else {
          return res.status(400).json({ message: "Login failed" });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
      error: error.message
    });
  }
});

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

app.post("/api/admin/fish", async (req, res) => {
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

app.delete("/api/admin/fish", async (req, res) => {
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

/* Frontend routes */

if (!DEV) {
  app.get('*', async (req, res) => {
    res.sendFile(path.join(reactBuild, 'index.html'));
  });
}