const User = require("../models/User");

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try{
        const user = await user.create({
            username, email, password
        });

        res.status(201).json({
            success: true,
            user
        })
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).json({success: false, error: "please provide email and password"});
    }

    try{
        const user = await User.findOne({ email }).select("+password");

        if(!user){
            res.status(404).json({ success: false, error: "Invalid credentials"})
        }

        const isMatch = await user.matchPasswords(password);

        if(!isMatch){
            res.status(404).json({successL: false, error: "Invalid Credentials"})
        }

        res.status(200).json({
            success: true,
            token: "iefjwjfpjqwjjqwpjdpqjdpjdpjwdpj",
        })
    }catch (error) {
        res.status(500).json({success: false, error: error.message})
    }
};

exports.forgetpassword = (req, res, next) => {
    res.send("Forget Password Route");
};

exports.resetpassword = (req, res, next) => {
    res.send("Reset Password Route");
}

