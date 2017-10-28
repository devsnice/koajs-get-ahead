const mongoose = require("../utils/mongoose");
const { Schema } = mongoose;

const beautifyUnique = require("mongoose-beautiful-unique-validation");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    surname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      unique: "Two users cannot share the same email ({VALUE})"
    },
    password: {
      type: String,
      required: true
    },
    city: {
      type: String
    },
    birthday: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

userSchema.plugin(beautifyUnique);

const User = mongoose.model("User", userSchema);

module.exports = User;
