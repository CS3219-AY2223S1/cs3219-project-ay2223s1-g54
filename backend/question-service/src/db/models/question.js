import mongoose from "mongoose";

const Schema = mongoose.Schema;
const QuestionSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  topicTags: [
    {
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
    },
  ],
  content: {
    type: String,
    required: true,
  },
  codeSnippets: [
    {
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
    },
  ],
});

const QuestionModel = mongoose.model("QuestionModel", QuestionSchema);
export { QuestionModel };
