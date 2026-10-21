import React, { useState, useEffect } from 'react'

function UpdateTaskModal({ task, isOpen, onClose, onUpdateTask }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [completed, setCompleted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (task) {
      setTitle(task.title || '')
      setDescription(task.description || '')
      setPriority(task.priority || 'medium')
      setCompleted(Boolean(task.completed))
      setError(null)
    }
  }, [task])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !task) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Task title cannot be empty')
      return
    }

    try {
      setSubmitting(true)
      setError(null)
      await onUpdateTask(task._id, {
        title: title.trim(),
        description: description.trim(),
        priority,
        completed
      })
      onClose()
    } catch (err) {
      setError(err.message || 'Failed to update task')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Update Task</h3>
            <p className="subtitle">Modify task details and save changes</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {error && (
          <div className="modal-error-alert">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="task-form modal-form">
          <div className="form-group">
            <label htmlFor="update-title">Task Title *</label>
            <input
              id="update-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="update-desc">Description</label>
            <textarea
              id="update-desc"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task details and notes..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="update-priority">Priority</label>
              <select
                id="update-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group checkbox-form-group">
              <label htmlFor="update-completed">Status</label>
              <label className="checkbox-toggle-label">
                <input
                  id="update-completed"
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
                <span>{completed ? 'Completed' : 'Active / Pending'}</span>
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-update-submit"
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTaskModal
