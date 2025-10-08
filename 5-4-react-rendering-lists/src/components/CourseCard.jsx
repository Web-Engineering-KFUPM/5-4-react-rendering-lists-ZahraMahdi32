import { useState } from "react";
import TaskItem from "./TaskItem";


export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");


// 📘 TASK 4 — PART A (Anchor): Implement toggle using onMutateCourse + .map()
function toggleTask(id) {
  const updatedTasks = (Array.isArray(course.tasks) ? course.tasks : []).map((t) =>
    t.id === id ? { ...t, isDone: !t.isDone } : t
  );
  onMutateCourse(index, () => updatedTasks);
}

function deleteTask(id) {
  const updatedTasks = (Array.isArray(course.tasks) ? course.tasks : []).filter(
    (t) => t.id !== id
  );
  onMutateCourse(index, () => updatedTasks);
}

function addTask(e) {
  e.preventDefault();
  if (!title.trim()) return;

  const newTask = {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(),
    title: title.trim(),
    dueDate: date || null,
    isDone: false,
  };

  const updatedTasks = [
    ...(Array.isArray(course.tasks) ? course.tasks : []),
    newTask,
  ];
  onMutateCourse(index, () => updatedTasks);

  setTitle("");
  setDate("");
}


  return (
    <article className="course card">
      <header className="cardHeader">
        <h2>{course.title}</h2>
        {/* 🟩 PART A (Anchor): Show "All caught up" badge when ALL tasks are done (logical &&) */}
        {course.tasks.length > 0 && course.tasks.every(task => task.isDone) && (
        <span className="badge">All caught up 🎉</span>
          )}

      </header>


      {/* 🟩 PART A (Anchor): If NO tasks → show message; ELSE → render the list (ternary ?: ) */}
      <section className="tasksSection">
        {course.tasks.length === 0 ? (
          <p>No tasks yet. Add your first one below.</p>
        ) : (
          <ul className="tasks">
            {course.tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </ul>
        )}
      </section>


      {/* Add Form (provided) */}
      <form onSubmit={addTask} className="newTask">
        <input
          className="titleField"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          aria-label="Task title"
        />
        <div className="dateRow">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-label="Due date"
          />
          <button type="submit" className="primary">Add</button>
        </div>
      </form>
    </article>
  );
}