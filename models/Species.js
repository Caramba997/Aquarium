import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String
});

export default mongoose.model("species", itemSchema);