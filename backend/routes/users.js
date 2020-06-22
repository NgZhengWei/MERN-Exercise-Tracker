const router = require('express').Router(); //to create routes
let User = require('../models/user.model'); //mongoose model for user

router.route('/').get((req, res) => { //handles get requests at /users url
    User.find() //mongoose method to get a list of all users from MongoDB Atlas. Returns a promise in JSON format.
        .then(users => res.json(users)) //then return users we got from DB in json format
        .catch(err => res.status(400).json('Error: ' + err)); //if there is an error, will return status 400 with the error
});
//these routes are called endpoints
router.route('add/').post((req, res) => { //handles post requests at /users/add
    const username = req.body.username; //new username is part of the body

    const newUser = new User({username});

    newUser.save() //save to MongoDB Atlas DB
        .then(() => res.json('User added!')) //if saved, return test of user added
        .catch(err => res.status(400).json('Error: ' + err)); //else return error message
});

module.exports = router;  //standard line for router files. Find out more in express docs on routers