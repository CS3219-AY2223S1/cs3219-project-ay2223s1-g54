import mongoose from "mongoose";

const Schema = mongoose.Schema;
let TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const TokenModel = mongoose.model("TokenModel", TokenSchema);
export { TokenModel };
