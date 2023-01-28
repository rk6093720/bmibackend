const express = require("express");
const { ProfileController } = require("../controller/userprofile.controller");
const { authentication } = require("../middleware/authentication.middleware");
const { authorization } = require("../middleware/authorization.middleware");
const UserProfilerouter = express.Router();
UserProfilerouter.get("/", authentication, ProfileController.getProfile);
// UserProfilerouter.patch(
//   "/editProfile/:id",
//   authentication,
//   authorization,

//   ProfileController.editProfile
// );
const callback = (req, res) => {
    // Patch logic here
    // for example
    let id = req.params.id;
    let updatedData = req.body;
    User.findByIdAndUpdate(id, updatedData, (err, success) => {
        if(err) return res.send({error:err});
        return res.send({message:'Updated Successfully'});
    })
};

if(typeof callback === 'function'){
    UserProfilerouter.patch('/:id', callback);
}else{
    console.log("callback passed is not a function")
}
module.exports = { UserProfilerouter };