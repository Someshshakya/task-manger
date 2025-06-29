const express = require('express');
const router = express.Router();
const { createTask, updateTask, getAllTasksByEmail, deleteTask } = require('../controllers/tasks');
const authenticate = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole');

const validate = require('../middleware/requestValidator');
const { taskSchema } = require('../validations/tasks');

// this is used to create new tasks 
router.post('/create', authenticate, authorizeRole('user'), validate(taskSchema), createTask);

// Update a task by id
router.put('/:id', authenticate, authorizeRole(['user', 'admin']), updateTask);

// Get all tasks by authenticated user's email
router.get('/all-tasks', authenticate, authorizeRole(['user', 'admin']), getAllTasksByEmail);

// This is used to delete tasks
router.delete('/:id', authenticate, authorizeRole(['user', 'admin']), deleteTask);

module.exports = router;