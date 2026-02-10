
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TaskEntry from './pages/TaskEntry';
import TasksTable from './components/TaskTable';



function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/task-entry" element={<TaskEntry />} />
        <Route path="taskstable" element={<TasksTable />} />

      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
