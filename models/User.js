import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Default",
    required: true,
  },
  created_at: Date
});

export default mongoose.model("user", itemSchema);