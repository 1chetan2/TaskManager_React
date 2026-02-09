import { useState } from "react";
import axios from "axios";

export default function TaskEntry() {
  const [form, setForm] = useState({
    date: "",
    taskName: "",
    task: "",
    hours: "",
    statusValue: "Pending"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveData = async () => {
    try {
      const payload = {
        date: new Date(form.date).toISOString(),
        taskName: form.taskName,
        task: form.task,
        hours: Number(form.hours),
        statusValue: form.statusValue
      };

      await axios.post("http://localhost:5207/api/TaskItem", payload);
      alert("Task saved successfully");
    } catch (err) {
      console.log(err);
      alert("Error saving task");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Daily Task Entry</h2>

        <label style={styles.label}>Date</label>
        <input style={styles.input} type="date" name="date" onChange={handleChange} />

        <label style={styles.label}>Task Name</label>
        <input
          style={styles.input}
          type="text"
          name="taskName"
          placeholder="Task Name"
          onChange={handleChange}
        />

        <label style={styles.label}>Task Description</label>
        <textarea
          style={styles.textarea}
          name="task"
          placeholder="Describe your task"
          onChange={handleChange}
        />

        <label style={styles.label}>Hours</label>
        <input
          style={styles.input}
          type="number"
          name="hours"
          placeholder="Hours worked"
          onChange={handleChange}
        />

        <label style={styles.label}>Status</label>
        <select style={styles.input} name="statusValue" onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <button style={styles.button} onClick={saveData}>
          Save Task
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f4f6f9"
  },
  card: {
    width: "380px",
    padding: "25px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#333"
  },
  label: {
    fontSize: "14px",
    fontWeight: "500"
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  textarea: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "70px"
  },
  button: {
    marginTop: "12px",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    background: "#0d6efd",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};
