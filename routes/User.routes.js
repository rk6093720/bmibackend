
const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {UserModel} = require("../modals/user.model")

const userController = Router();


userController.post("/signup", (req, res) => {
    const {name,email, password} = req.body;

    bcrypt.hash(password, 5, async function(err, hash) {
        if(err){
            res.send("Something went wrong, plz try again later")
        }
        const user = new UserModel({
            name,
            email,
            password : hash,
  
        })
        try{
            await user.save()
            res.json({msg : "Signup successfull"})
        }
        catch(err){
            console.log(err)
            res.send("Something went wrong, plz try again")
        }
       
    });
})

userController.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email})
    const hash = user.password;
    bcrypt.compare(password, hash, function(err, result) {
        if(err){
            res.send("Something went wrong, plz try again later")
        }
        if(result){
            const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET);
            res.json({message : "Login successfull", token})
        }
        else{
            res.send("Invalid credentials, plz signup if you haven't")
        }
    });
    
})


userController.get('/profile', (req, res) => {
    if (!req.userId) {
        return res.status(401).json({ error: 'You must be logged in to access this route' });
    }
    User.findById(req.userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        })
        .catch(error => res.status(500).json({ error }));
});



userController.post('/logout', (req, res) => {
  req.destroy((err) => {
    if (err) {
      res.status(500).json({ message: 'Failed to log out' });
    } else {
      res.json({ message: 'Successfully logged out' });
    }
  });
});


module.exports = {
    userController
}