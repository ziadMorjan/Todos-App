import { useEffect, useState, Fragment } from "react";
import { useCRUD } from "../hooks/useCRUD";
import "./Todo.css";

export const Todo = () => {
  const { state, create, delTodo, updateTodo, getAll, error, isLoading } =
    useCRUD();
  const [form, setForm] = useState({ name: "", description: "" });
  const [search, setSearch] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  //store data to filtered array when user add name Todo
  useEffect(() => {
    const filtered = state.filter((todo) =>
      todo.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTodos(filtered);
  }, [search, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "search") {
      setSearch(value);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateTodo(editId, form);
        setIsEdit(false);
        setEditId(null);
      } else {
        await create(form);
      }
      setForm({ name: "", description: "" });
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    await delTodo(id);
  };

  const handleUpdate = (item) => {
    setForm({ name: item.name, description: item.description });
    setEditId(item._id);
    setIsEdit(true);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo App</h1>

      <form className="todo-inputs" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search ToDo Name"
          name="search"
          value={search}
          onChange={handleChange}
        />

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
        <button type="submit">{isEdit ? "Update" : "Add"}</button>
      </form>

      {error && (
        <h3 style={{ color: "red" }} colSpan="5">
          {error}
        </h3>
      )}
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
          {filteredTodos.length === 0 && <h3 style={{color : 'rgb(0, 94, 196)'}}>Not Found Todo</h3>}
          {isLoading ? (
            <tr>
              <td colSpan="5">Loading todos .......</td>
            </tr>
          ) : (
            filteredTodos.map((item, index) => (
              <Fragment key={item._id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.createdAt}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(item)}
                      className="update-btn"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
