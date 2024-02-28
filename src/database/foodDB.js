import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    count: { type: Number, default: 0, required: true }
}, {
    collection: "Food"
});

foodSchema.pre('save', function(next) {
    this.foodID = this._id.toString();
    this._id = undefined;
    next();
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;