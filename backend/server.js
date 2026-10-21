require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Task = require('./models/Task')

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskmanager'

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`)
  next()
})

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message))

app.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 })
    res.status(200).json(tasks)
  } catch (err) {
    next(err)
  }
})

app.post('/tasks', async (req, res, next) => {
  try {
    const { title, description, priority } = req.body
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const newTask = await Task.create({
      title: title.trim(),
      description: description || '',
      priority: priority || 'medium',
      completed: false
    })

    res.status(201).json(newTask)
  } catch (err) {
    next(err)
  }
})

const updateTaskHandler = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid Task ID format' })
    }

    // Sanitize update payload: remove immutable or protected fields
    const updates = { ...req.body }
    delete updates._id
    delete updates.__v
    delete updates.createdAt

    if (updates.title !== undefined) {
      if (typeof updates.title !== 'string' || !updates.title.trim()) {
        return res.status(400).json({ error: 'Title cannot be empty' })
      }
      updates.title = updates.title.trim()
    }

    if (updates.priority && !['low', 'medium', 'high'].includes(updates.priority)) {
      return res.status(400).json({ error: 'Priority must be low, medium, or high' })
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    )

    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' })
    }

    console.log(`[Backend] Updated task ${id}: "${updatedTask.title}"`)
    res.status(200).json(updatedTask)
  } catch (err) {
    console.error(`[Backend] Error updating task ${req.params.id}:`, err.message)
    next(err)
  }
}

app.put('/tasks/:id', updateTaskHandler)
app.patch('/tasks/:id', updateTaskHandler)
app.put('/task/:id', updateTaskHandler)
app.patch('/task/:id', updateTaskHandler)

app.delete('/tasks/:id', async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid Task ID' })
    }

    const deleted = await Task.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.status(200).json({ message: 'Task deleted successfully', task: deleted })
  } catch (err) {
    next(err)
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
