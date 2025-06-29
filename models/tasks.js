const db = require("../library/mongodb")
const collectionName = "tasks"

// This is used to insert the task details 
const insertOne = (data) => {
    return db.get().collection(collectionName).insertOne(data)
}


// This is used to find the task by the @condition and projection 
const findOne = async (cond, proj) => {
    return db.get().collection(collectionName).findOne(cond, proj)
}

// This is used to update a task by condition
const updateOne = (cond, update, options = {}) => {
    return db.get().collection(collectionName).updateOne(cond, update, options);
}

// This is used to find many tasks by a condition
const getAll = async (cond, skip, limit) => {
    return db.get().collection(collectionName).find(cond).skip(skip || 0).limit(limit || 10).toArray();
}

// This is used to delete a task by condition
const deleteOne = (cond) => {
    return db.get().collection(collectionName).deleteOne(cond);
}

// This is used to count tasks by condition
const count = async (cond = {}) => {
    return db.get().collection(collectionName).countDocuments(cond);
}

module.exports = { insertOne, findOne, updateOne, getAll, deleteOne, count }
