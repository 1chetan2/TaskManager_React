import axios from "axios";
import TaskEntry from "../pages/TaskEntry";

const saveData = async () => {
  try {
    const payload = {
      id: 0,
      date: new Date(form.date).toISOString(),
      taskName: form.taskName,
      task: form.task,
      hours: Number(form.hours) 
    };

    const res = await axios.post(
      "https://localhost:7119/api/TaskItem",
      payload,
      {
         headers: { "Content-Type": "application/json" } 
      }
    );

    alert("Task saved successfully ");
    console.log(res.data);
  } catch (error) {
    console.error("Save error:", error.response?.data || error.message);
    alert("Error while saving ");
  }
};
