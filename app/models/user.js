const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    name: String,
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true, select: false}
});

userSchema.pre('save', function(next) {

    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if(err)
            return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password){
    let user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', userSchema);
