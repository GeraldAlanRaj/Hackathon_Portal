const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    name: String,
    regNo: String,
    email: String
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["admin", "team", "evaluator"],
      default: "team"
    },

    members: {
      type: [MemberSchema],
      default: [],
      validate: {
        validator: function (val) {
          if (this.role === "team") return val.length === 3;
          return true;
        }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
