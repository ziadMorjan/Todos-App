import "./Todo.css";
import { Fragment, useState } from "react";
import { useCRUD } from "../hooks/useCRUD"; // Corrected import

export const Todo = () => {
  const { state , create, deleteOne, updateOne } = useCRUD();
  const [form, setForm] = useState({ name: "", description: "", id: null }); // Added `id` for update

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) {
      // If we have an id, we're updating
      await updateOne({
        _id: form.id,
        name: form.name,
        description: form.description,
      });
    } else {
      // If no id, we're creating
      await create({
        name: form.name,
        description: form.description,
      });
    }
    setForm({ name: "", description: "", id: null }); // Clear form after submit
  };

  const handleDelete = async (id) => {
    await deleteOne(id);
  };

  const handleUpdate = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      id: item._id, 
    });
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo App</h1>

      <form className="todo-inputs" onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Task Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          required
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">{form.id ? "Update" : "Add"}</button>
      </form>

      <table className="todo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.map((item ,index ) => (
            <Fragment key={item._id}>
              <tr>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.createdAt}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="update-btn"
                    onClick={() => handleUpdate(item)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};
