import React from 'react'

function Toast({ toast, onClose }) {
  if (!toast) return null

  return (
    <div className={`toast toast-${toast.type}`}>
      <span>{toast.message}</span>
      <button onClick={onClose} className="toast-close">
        &times;
      </button>
    </div>
  )
}

export default Toast
