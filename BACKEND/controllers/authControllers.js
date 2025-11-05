exports.loginSuccess = (req, res) => {
    res.json({
        message: 'Login Succesful',
        user: {
            id: req.user.id,
            username: req.user.username,
            role: req.user.role
        }
    });
};

exports.logout=(req,res)=>{
    req.logout(()=>{
        res.json({message:"Logged out Successfully"});
    });
};