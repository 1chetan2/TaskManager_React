import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
  try {
    const res = await axios.get("https://localhost:7119/api/TaskItem");
    console.log("DATA:", res.data);
    setTasks(res.data);
  } catch (err) {
    console.log("ERROR:", err);
  }
};


  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">Task List </h5>
        <button onClick={() => window.history.back()}>
        ← Back
      </button>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr className="bg-primary">
              <th>Date</th>
              <th>Task Name</th>
              <th>Description</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={i}>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.taskName}</td>
                <td>{t.task}</td>
                <td>{t.hours}</td>
                <td>{t.statusValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
