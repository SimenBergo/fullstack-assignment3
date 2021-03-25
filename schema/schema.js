const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const bcrypt   = require('bcrypt');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        set: toLower,
        unique: true
    }, 
    role: {
        type: String,
        required: true,
        enum : ['Student', 'Teacher'],
        default: 'Student'
    },
    password: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true,
        enum : ['On-Campus', 'Home-Office'],
        default: 'On-Campus'
    },
    status: {
        type: String,
        required: true,
        enum : ['Available', 'Busy'],
        default: 'Available'
    }
});

UserSchema.pre('save',
    async function(next) {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    }
);

UserSchema.methods.isValidPassword = async function(password) {
    const user      = this;
    const compare   =  await bcrypt.compare(password, user.password);

    return compare;
};

function toLower (str) {
    return str.toLowerCase();
};

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;