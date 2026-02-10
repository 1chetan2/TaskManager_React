import { useState } from "react";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("Id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [reload, setReload] = useState(false);

  const refresh = () => setReload(!reload);

  return (
    <div className="container-fluid mt-4">
      <h3 className="fw-bold mb-3">Task Manager</h3>{" "}
      <button
        className="btn btn-danger"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
      {/* filter card */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={sortColumn}
                onChange={(e) => setSortColumn(e.target.value)}
              >
                <option value="Id">Sort By</option>
                <option value="StudentName">Name</option>
                <option value="Email">Email</option>
                <option value="Course">Course</option>
                <option value="EnrollmentDate">Date</option>
              </select>
            </div>

            <div className="col-md-3">
              <select
                className="form-select"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <div className="col-md-3 d-flex gap-2">
              {/* <button
                className="btn btn-primary"
                onClick={() => setPage(1)}
              >
                Apply
              </button> */}
              <button
                className="btn btn-primary"
                onClick={() => navigate("/task-entry")}
              >
                Add Task
              </button>
              <button
                className="btn btn-info"
                onClick={() => navigate("/taskstable")}
              >
                View Tasks
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  setSearch("");
                  setSortColumn("Id");
                  setSortOrder("asc");
                  setPage(1);
                }}
              >
                Reset
              </button>
              <button
                className="btn btn-success"
                onClick={() => {
                  setSelectedStudent(null);
                  setShowForm(true);
                }}
              >
                Add Data
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* TABLE */}
      <StudentTable
        search={search}
        sortColumn={sortColumn}
        sortOrder={sortOrder}
        page={page}
        setPage={setPage}
        reload={reload}
        onEdit={(s) => {
          setSelectedStudent(s);
          setShowForm(true);
        }}
        refresh={refresh}
      />
      {/* MODAL FORM */}
      <StudentForm
        show={showForm}
        selected={selectedStudent}
        refresh={refresh}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
}
