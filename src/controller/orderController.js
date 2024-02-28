import mongoose from "mongoose";
const dotenv = require('dotenv');

dotenv.config();

const fetchAvailable = async() => {
    /**
     * Display a list of available food items with details.
     */
    try {
        await
        return { success: true }
    } catch (e) {
        return { success: false }
    }
}


module.exports = (
    fetchAvailable
)