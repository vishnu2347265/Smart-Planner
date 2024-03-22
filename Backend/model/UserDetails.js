const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    tasks: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Task' } // Array of Task references
    ]
}, { collection: "UserInfo" });

const User = mongoose.model("UserInfo", UserDetailSchema);
module.exports = User;
