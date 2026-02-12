// import { useEffect, useState } from "react";
// import axios from "axios";


// export default function TaskTable() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   const loadTasks = async () => {
//     try {
//       const res = await axios.get("http://localhost:5207/api/TaskItem");
//       console.log("DATA:", res.data);
//       setTasks(res.data);
//     } catch (err) {
//       console.log("ERROR:", err);
//     }
//   };

//   return (
//     <div className="card shadow-sm">
//       <div className="card-body">
//         <h5 className="mb-3">Task List </h5>
//         <button onClick={() => window.history.back()}>← Back</button>
//         <table className="table table-bordered">
//           <thead className="table-light">
//             <tr className="bg-success text-white  ">
//               <th>Date</th>
//               <th>Task Name</th>
//               <th>Description</th>
//               <th>Hours</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.map((t, i) => (
//               <tr key={i}>
//                 <td>{new Date(t.date).toLocaleDateString()}</td>
//                 <td>{t.taskName}</td>
//                 <td>{t.task}</td>
//                 <td>{t.hours}</td>
//                 <td className={t.statusValue === "Completed" ? "text-success" : "text-warning"}>{t.statusValue}</td>
//               </tr>
//             ))}
//           </tbody>
//           <tr><button
//                     onClick={() => {
//                       const file = localStorage.getItem("taskFile");
//                       if (file) window.open(file);
//                     }}
//                   >
//                     View Stored File
//                   </button></tr>
//         </table>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

export default function TaskDashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5207/api/TaskItem");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) =>
        t.taskName?.toLowerCase().includes(search.toLowerCase())
      )
      .filter((t) => (filter === "All" ? true : t.statusValue === filter));
  }, [tasks, search, filter]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.statusValue === "Completed").length,
    pending: tasks.filter((t) => t.statusValue === "Pending").length,
  };

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Task Data</h2>
        <button
          className="btn btn-outline-secondary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Total Tasks</h6>
              <h3 className="fw-bold">{stats.total}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Completed</h6>
              <h3 className="fw-bold text-success">{stats.completed}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Pending</h6>
              <h3 className="fw-bold text-warning">{stats.pending}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by task name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div>
          {["All", "Completed", "Pending"].map((status) => (
            <button
              key={status}
              className={`btn me-2 ${
                filter === status ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Task Name</th>
                <th>Description</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((t, i) => (
                  <tr key={i}>
                    <td>
                      {t.date
                        ? new Date(t.date).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="fw-semibold">{t.taskName}</td>
                    <td>{t.task}</td>
                    <td>{t.hours}</td>
                    <td>
                      <span
                        className={`badge ${
                          t.statusValue === "Completed"
                            ? "text-success"
                            : "text-warning "
                        }`}
                      >
                        {t.statusValue}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
