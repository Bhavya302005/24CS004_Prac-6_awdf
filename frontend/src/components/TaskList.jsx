import React, { useState } from 'react'

function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditTask, onUpdateTask }) {
  const [filter, setFilter] = useState('all')
  const handleEditClick = onUpdateTask || onEditTask

  const handleDelete = (task) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${task.title}"?`)
    if (confirmed) {
      onDeleteTask(task._id)
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  return (
    <div className="card task-list-card">
      <div className="list-header">
        <div>
          <h3>Tasks ({tasks.length})</h3>
          <p className="subtitle">Persisted live in MongoDB</p>
        </div>

        <div className="filter-group">
          {['all', 'active', 'completed'].map((type) => (
            <button
              key={type}
              className={filter === type ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks found in this view.</p>
        </div>
      ) : (
        <div className="task-items">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className={task.completed ? 'task-row completed' : 'task-row'}
            >
              <div className="task-checkbox-area">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task._id, !task.completed)}
                />
              </div>

              <div className="task-info">
                <div className="task-title-line">
                  <h4 className={task.completed ? 'line-through' : ''}>
                    {task.title}
                  </h4>
                  <span className={`priority-tag priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </div>
                {task.description && (
                  <p className="task-desc-text">{task.description}</p>
                )}
                <span className="task-date">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="task-actions">
                <button
                  className="action-btn update-btn"
                  onClick={() => handleEditClick && handleEditClick(task)}
                  title="Update task details"
                  id={`update-btn-${task._id}`}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Update
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(task)}
                  title="Delete task"
                  id={`delete-btn-${task._id}`}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList
