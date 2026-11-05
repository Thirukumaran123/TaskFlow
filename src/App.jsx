import { useEffect, useState } from "react";

const starterTasks = [
  { id: 1, title: "Complete React project", completed: false },
  { id: 2, title: "Practice Python interview questions", completed: true },
  { id: 3, title: "Update my resume", completed: false }
];

function readSavedTasks() {
  try {
    const savedTasks = localStorage.getItem("taskflow-tasks");
    return savedTasks ? JSON.parse(savedTasks) : starterTasks;
  } catch {
    return starterTasks;
  }
}

function App() {
  const [tasks, setTasks] = useState(readSavedTasks);
  const [taskTitle, setTaskTitle] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(event) {
    event.preventDefault();

    const trimmedTitle = taskTitle.trim();
    if (!trimmedTitle) return;

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false
    };

    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTaskTitle("");
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === taskId
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  }

  function editTask(taskId) {
    const selectedTask = tasks.find((item) => item.id === taskId);
    if (!selectedTask) return;

    const updatedTitle = window.prompt("Edit task:", selectedTask.title);
    if (updatedTitle === null || !updatedTitle.trim()) return;

    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === taskId
          ? { ...item, title: updatedTitle.trim() }
          : item
      )
    );
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((item) => item.id !== taskId)
    );
  }

  const filteredTasks = tasks.filter((item) => {
    if (filter === "Pending") return !item.completed;
    if (filter === "Completed") return item.completed;
    return true;
  });

  const completedCount = tasks.filter((item) => item.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="TaskFlow home">
          <span className="brand-mark">✦</span>
          <span>TaskFlow</span>
        </a>

        <p className="menu-label">WORKSPACE</p>
        <nav className="navigation" aria-label="Task filters">
          {["All", "Pending", "Completed"].map((name) => (
            <button
              key={name}
              type="button"
              className={`nav-button ${filter === name ? "active" : ""}`}
              onClick={() => setFilter(name)}
            >
              <span className="nav-icon" aria-hidden="true">
                {name === "All" ? "▤" : name === "Pending" ? "◷" : "✓"}
              </span>
              {name}
              {name === "All" && <span className="nav-count">{tasks.length}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-note">
          <div className="note-icon">✧</div>
          <strong>Stay focused.</strong>
          <span>One task at a time.</span>
        </div>
        <p className="sidebar-footer">TASKFLOW · PERSONAL PLANNER</p>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div>
            <p className="eyebrow">YOUR PRODUCTIVITY SPACE</p>
            <h1>My Tasks</h1>
            <p className="subtitle">Organize your day and get things done.</p>
          </div>
          <div className="profile-avatar" aria-label="Profile">T</div>
        </header>

        <section className="stats-grid" aria-label="Task statistics">
          <article className="stat-card">
            <div className="stat-topline"><span>Total tasks</span><span className="stat-icon purple">▤</span></div>
            <strong>{tasks.length}</strong>
            <small>Tasks in your workspace</small>
          </article>
          <article className="stat-card">
            <div className="stat-topline"><span>Pending</span><span className="stat-icon orange">◷</span></div>
            <strong>{pendingCount}</strong>
            <small>Still to be completed</small>
          </article>
          <article className="stat-card">
            <div className="stat-topline"><span>Completed</span><span className="stat-icon green">✓</span></div>
            <strong>{completedCount}</strong>
            <small>Tasks you have finished</small>
          </article>
        </section>

        <section className="content-panel">
          <form className="task-form" onSubmit={addTask}>
            <label className="sr-only" htmlFor="new-task">New task</label>
            <span className="input-plus" aria-hidden="true">＋</span>
            <input
              id="new-task"
              type="text"
              placeholder="What do you need to accomplish?"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
            />
            <button className="add-button" type="submit">Add task</button>
          </form>

          <div className="list-heading">
            <div>
              <h2>{filter} tasks</h2>
              <p>Your personal task list</p>
            </div>
            <span className="task-total">{filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}</span>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-symbol">✓</div>
                <h3>No tasks here</h3>
                <p>Add a task or choose another filter.</p>
              </div>
            ) : (
              filteredTasks.map((item) => (
                <article className="task-row" key={item.id}>
                  <input
                    className="task-checkbox"
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                    aria-label={`Mark ${item.title} as ${item.completed ? "pending" : "completed"}`}
                  />
                  <span className={`task-title ${item.completed ? "is-completed" : ""}`}>
                    {item.title}
                  </span>
                  <span className={`status ${item.completed ? "status-done" : "status-pending"}`}>
                    {item.completed ? "Completed" : "Pending"}
                  </span>
                  <div className="task-actions">
                    <button type="button" onClick={() => editTask(item.id)} aria-label={`Edit ${item.title}`} title="Edit task">✎</button>
                    <button type="button" onClick={() => deleteTask(item.id)} aria-label={`Delete ${item.title}`} title="Delete task">×</button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        <footer className="main-footer">
          <span>Small steps make progress.</span>
          <span>TaskFlow · Built with React</span>
        </footer>
      </main>
    </div>
  );
}

export default App;