const taskCollection = require("../models/tasks")
const { ObjectId } = require('mongodb');
const { search } = require("../routes/users");

const createTask = async (req, res) => {
    try {

        const { title, description } = req.body;

        const task = {
            title,
            description: description || '',
            createdBy: req.user.email,
            createdAt: new Date()
        };

        await taskCollection.insertOne(task);

        res.status(201).json({ message: 'Task created successfully', task });
    } catch (err) {
        console.error('Create Task Error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const email = req.user.email;
        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No fields to update" });
        }
        let updateCondtion = { _id: new ObjectId(id) }
        if (req.user.role==="user") {
            updateCondtion.createdBy = email
        }
        const result = await taskCollection.updateOne(
            updateCondtion,
            { $set: updateFields }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }
        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.error("Update Task Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllTasksByEmail = async (req, res) => {
    try {
        const email = req.user.email;
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search;
        let condition = { createdBy: email }
        if (search !== '' && search !== undefined) {
            condition.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (req.user.role === 'admin') {
            condition = {}
        }
        const tasks = await taskCollection.getAll(condition, skip, limit);
        const totalTask = await taskCollection.count(condition)
        res.status(200).json({ data: tasks, total: totalTask });
    } catch (err) {
        console.error("Get Tasks Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const condition = { _id: new ObjectId(id) }
        if (req.user.role !== "admin") {
            condition.createdBy = req.user.email
        }
        const result = await taskCollection.deleteOne(condition);
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Task not found or not authorized" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Delete Task Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createTask, updateTask, getAllTasksByEmail, deleteTask };
