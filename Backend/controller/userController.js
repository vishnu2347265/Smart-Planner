const User = require("../model/UserDetails")
const jwt = require('jsonwebtoken');
const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";

exports.getUser = async (req,res) =>{
    const { token } = req.body;
    try{
        const user = jwt.verify(token, JWT_SECRET);
        const userData = await User.findOne({ _id: user._id }).populate('tasks')
        if (!userData) {
            return res.status(404).json({ msg: 'User not found' });
        }
        return res.send({ status: "ok", data: userData });
    }catch(e){
        res.status(400).send(e);
    }
}
