const { MongoClient } = require('mongodb')
require("dotenv").config()

const state = { db: null }
/**
 * Method to connect to the mongodb
 * @param {*} url
 * @returns connection object
 */
const MONGODB_URL = process.env.MONGODB_URL
const DB_NAME = process.env.DB_NAME
exports.connect = async () => {
    if (state.db) return

    const client = new MongoClient(MONGODB_URL)

    try {
        await client.connect()
        console.log(`MongoDB connected successfully for db ${DB_NAME}-------------`)
        state.db = client.db(DB_NAME)
    } catch (err) {
        console.log(`MongoDB error connecting to ${MONGODB_URL}`, err.message)
    }
}

/**
 * Method to get the connection object of the mongodb
 * @returns db object
 */
exports.get = () => {
    return state.db
}
/**
 * Method to close the mongodb connection
 */
exports.close = async (callback) => {
    if (state.db) {
        try {
            await state.db.client.close()
            state.db = null
            state.mode = null
            if (callback) callback()
        } catch (err) {
            if (callback) callback(err)
        }
    }
}
