import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  species: String,
  date_since: Date,
  date_death: Date,
  sex: String,
  colors: [String],
  characteristics: [String],
  image: {
    name: String
  }
});

export default mongoose.model("fish", itemSchema);