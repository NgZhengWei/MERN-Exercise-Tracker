const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({ //structure described in this case for MongoDB
    username: { //validation for the username
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema); //compile schema into a model
//model is a class used to construct documents. In this case the doc is a User with properties and behaviors as declared in the schema.
module.exports = User;