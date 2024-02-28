import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    /**e food Id, user Id, order Id, created At, updated At and status. */
    foodID: { type: String, required: true, unique: true, ref: "Food" },
    userID: { type: String, required: true, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: Number, default: 0, required: true }
}, {
    collection: "Order"
});

orderSchema.pre('save', function(next) {
    this.orderID = this._id.toString();
    this._id = undefined;
    next();
});

const User = mongoose.model('Order', orderSchema);

module.exports = User;