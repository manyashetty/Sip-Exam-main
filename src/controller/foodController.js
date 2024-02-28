import mongoose from "mongoose";
import Food from "../database/foodDB";

const fetchAvailable = async() => {
    /**
     * Display a list of available food items with details.
     */
    try {
        var data = await Food.aggregate({ $match: { count: { $gt: 0 } } }, )
        return { success: true, data: data }
    } catch (e) {
        return { success: false }
    }
}


module.exports = (
    fetchAvailable
)