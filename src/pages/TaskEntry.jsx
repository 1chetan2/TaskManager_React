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

  const [file, setFile] = useState(null);
  const [storageType, setStorageType] = useState("internal");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // file store on local storage
  const saveToLocalStorage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("taskFile", reader.result);
      alert("File stored in localStorage");
    };
    reader.readAsDataURL(file);
  };

  //file store on google drive
  const uploadToServer = async (file) => {
    const data = new FormData();
    data.append("file", file);

    await axios.post("http://localhost:5207/api/FileUpload/upload", data);
    alert("File uploaded");
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

      if (file) {
        storageType === "internal"
          ? saveToLocalStorage(file)
          : await uploadToServer(file);
      }

      alert("Task saved successfully");
    } catch (err) {
      console.log(err);
      alert("Error saving task");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Task Entry</h2>

        <div style={styles.field}>
          <label style={styles.label}>Date</label>
          <input style={styles.input} type="date" name="date" onChange={handleChange} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Task Name</label>
          <input style={styles.input} name="taskName" onChange={handleChange} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea style={styles.textarea} name="task" onChange={handleChange} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Hours</label>
          <input style={styles.input} type="number" name="hours" onChange={handleChange} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Status</label>
          <select style={styles.input} name="statusValue" onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Upload File</label>
          <input style={styles.input} type="file" onChange={handleFileChange} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Storage Type</label>
          <select
            style={styles.input}
            onChange={(e) => setStorageType(e.target.value)}
          >
            <option value="internal">Internal (localStorage)</option>
            <option value="external">External (Google Drive)</option>
          </select>
        </div>

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
    backgroundColor: "#eef2f7",
    fontFamily: "Segoe UI, sans-serif"
  },
  card: {
    width: "420px",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#2c3e50"
  },
  field: {
    display: "flex",
    flexDirection: "column"
  },
  label: {
    marginBottom: "4px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#555"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #dcdcdc",
    fontSize: "14px"
  },
  textarea: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #dcdcdc",
    minHeight: "80px",
    fontSize: "14px"
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer"
  }
};
