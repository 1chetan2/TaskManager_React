import { useEffect, useState } from "react";
import { addStudent, updateStudent } from "../services/studentService";

export default function StudentForm({ show, onClose, selected, refresh }) {

  const [form, setForm] = useState({
    studentName: "",
    email: "",
    course: "",
    enrollmentDate: ""
  });

  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    selected
      ? await updateStudent(selected.id, form)
      : await addStudent(form);

    refresh();
    onClose();
  };

  return (
    <div className="modal show d-block bg-dark bg-opacity-50">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5>{selected ? "Edit Student" : "Add Student"}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">

              <input
                className="form-control mb-2"
                name="studentName"
                placeholder="Student Name"
                value={form.studentName}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                className="form-control mb-2"       
                name="course"                   
                placeholder="Course"        
                value={form.course}             
                onChange={handleChange}         
                required
              />

              <input 
                type="date"
                className="form-control"
                name="enrollmentDate"
                value={form.enrollmentDate?.substring(0, 10)}
                onChange={handleChange}
                required
              />
              </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button className="btn btn-success">
                {selected ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
