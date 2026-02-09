import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/studentService";

export default function StudentTable({
  search,
  sortColumn,
  sortOrder,
  page,
  setPage,
  reload,
  onEdit,
  refresh
}) {

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadData();
  }, [search, sortColumn, sortOrder, page, reload]);

  const loadData = async () => {
    const res = await getStudents({
      page,
      pageSize: 4,
      searchString: search,
      sortColumn,
      sortOrder
    });

    setData(res.data.items);
    setTotalPages(res.data.totalPages);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">

        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Date</th>
              <th width="150">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((s) => (
              <tr key={s.id}>
                <td>{s.studentName}</td>
                <td>{s.email}</td>
                <td>{s.course}</td>
                <td>{new Date(s.enrollmentDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEdit(s)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => {
                      if (window.confirm("Delete student?")) {
                        deleteStudent(s.id).then(refresh);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="d-flex justify-content-center gap-1">
          <button
            className="btn btn-outline-secondary"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`btn ${page === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-secondary"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}
