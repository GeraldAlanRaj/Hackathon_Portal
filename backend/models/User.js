const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    regNo: { type: String, required: true },
    email: { type: String, required: true }
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
      enum: ["admin", "team"],
      default: "team"
    },

    members: {
      type: [MemberSchema],
      validate: {
        validator: function (val) {
          return this.role === "admin" || val.length === 3;
        },
        message: "A team must have exactly 3 members"
      },
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
