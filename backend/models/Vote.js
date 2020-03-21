const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Vote = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    }
});

Vote.set("toObject", {
    virtuals: true
});
Vote.set("toJSON", {
    virtuals: true
});

module.exports = mongoose.model("Vote", Vote);