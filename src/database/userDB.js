import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: Number, default: 0, required: true },
}, {
    collection: "User"
});

userSchema.pre('save', function(next) {
    this.userID = this._id.toString();
    this._id = undefined;
    next();
});

const User = mongoose.model('User', userSchema);

export { User };  