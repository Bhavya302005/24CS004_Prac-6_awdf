import React, { useState, useEffect } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from './api'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import UpdateTaskModal from './components/UpdateTaskModal'
import Toast from './components/Toast'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState(null)
  const [editingTask, setEditingTask] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, 3500)
  }

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      setError(err.message || 'Could not connect to backend server')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleCreateTask = async (taskData) => {
    const created = await createTask(taskData)
    setTasks((prev) => [created, ...prev])
  }

  const handleToggleComplete = async (id, completed) => {
    try {
      const updated = await updateTask(id, { completed })
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)))
      showToast(completed ? 'Task marked complete' : 'Task marked active')
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  const handleUpdateTask = async (id, updatedFields) => {
    try {
      const updated = await updateTask(id, updatedFields)
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)))
      showToast('Task updated successfully!', 'success')
      return updated
    } catch (err) {
      showToast(err.message || 'Failed to update task', 'error')
      throw err
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t._id !== id))
      showToast('Task deleted successfully', 'success')
    } catch (err) {
      showToast(err.message, 'error')
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-inner">
          <div>
            <h1>Task Management System</h1>
            <p className="subtitle">Practical 6: React + Express + MongoDB Full-Stack</p>
          </div>
          <button className="btn btn-secondary" onClick={loadTasks}>
            Refresh Data
          </button>
        </div>
      </header>

      <Toast toast={toast} onClose={() => setToast(null)} />

      <UpdateTaskModal
        task={editingTask}
        isOpen={Boolean(editingTask)}
        onClose={() => setEditingTask(null)}
        onUpdateTask={handleUpdateTask}
      />

      <main className="main-content">
        {error && (
          <div className="error-banner">
            <p><strong>Connection Error:</strong> {error}</p>
            <p className="subtext">Make sure backend is running on http://localhost:5000</p>
            <button className="btn btn-primary" onClick={loadTasks}>
              Retry Connection
            </button>
          </div>
        )}

        <div className="layout-grid">
          <aside className="sidebar">
            <TaskForm onTaskCreated={handleCreateTask} showToast={showToast} />
          </aside>

          <section className="content">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading tasks from database...</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onToggleComplete={handleToggleComplete}
                onUpdateTask={(task) => setEditingTask(task)}
                onEditTask={(task) => setEditingTask(task)}
                onDeleteTask={handleDeleteTask}
              />
            )}
          </section>
        </div>
      </main>

      <footer className="footer">
        <p>Full-Stack MERN Architecture | CHARUSAT Practical Evaluation</p>
      </footer>
    </div>
  )
}

export default App
