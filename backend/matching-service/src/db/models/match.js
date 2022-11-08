import mongoose from "mongoose";

const Schema = mongoose.Schema;
let MatchSchema = new Schema({
  difficulty: {
    type: Number,
    required: true,
  },
  userId1: {
    type: String,
    required: true,
  },
  userId2: {
    type: String,
  },
  username1: {
    type: String,
    required: true,
  },
  username2: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  categories: [
    {
        type: String,
      }
  ],
});

const MatchModel = mongoose.model("MatchModel", MatchSchema);
export { MatchModel };
