import mongoose from "mongoose";

const Schema = mongoose.Schema;
// Duplicate the ID field.

let Memory_rank = new Schema({
  name: {
    type: String
  },
  guesses: {
    type: String
  }
});

Memory_rank.set("toObject", { virtuals: true });
Memory_rank.set("toJSON", { virtuals: true });

export default mongoose.model("Memory_rank", Memory_rank);
