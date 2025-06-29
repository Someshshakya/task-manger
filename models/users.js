const db = require("../library/mongodb")
const collectionName = "users"

// This is used to insert the user details 
const insertOne =  (data) => {
  return db.get().collection(collectionName).insertOne(data)
}


// This is used to find the user by the @condition and projection 
const findOne = async (cond,proj) => {
    return db.get().collection(collectionName).findOne(cond,proj)
}

module.exports = { insertOne,findOne }
    