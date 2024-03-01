const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const mongoUrl = "mongodb+srv://admin:admin@cluster0.njeb9m7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log(e);
    });

require('./UserDetails')
const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
    res.send({ status: "Started" })
})

app.post("/register", async (req, res) => {
    const { name, email, mobile, password } = req.body;
    const oldUser = await User.findOne({ email: email });

    if (oldUser) {
        return res.send({ data: "Email already exists!" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        await User.create({
            name: name,
            email: email,
            mobile,
            password: encryptedPassword,
        });
        res.send({ status: "ok", data: "User Created!" });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
});

app.post('/login-user', async (req, res) => {
    const {email,password} = req.body;
    console.log("email",email,password)
    const oldUser = await User.findOne({ email: email });
    if (!oldUser) {
        return res.send({ data: "User doesn't exist!!" });
    }
    if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
        console.log(token);
        if (res.status(201)) {
            return res.send({ status: "ok", data: token});
        }
        else {
            return res.send({ error: "error" });
        }
    }
})
app.listen(5001, () => {
    console.log("Node js Server Started");
})