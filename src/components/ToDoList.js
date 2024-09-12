import { useState, useEffect } from "react";
import Task from "./Task";
import "./ToDoList.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("lists");
  return list ? JSON.parse(list) : [];
};

function ToDoList() {
  const [todoList, settodoList] = useState(getLocalStorage());
  const [addTask, setaddTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todoList));
  }, [todoList]);

  const handleChange = (event) => {
    setaddTask(event.target.value);
  };

  const handleAddTask = () => {
    if (addTask && isEditing) {
      settodoList(
        todoList.map((task) => {
          if (task.id === editId) {
            return { ...task, name: addTask };
          }
          return task;
        })
      );
      setaddTask("");
      setEditId(null);
      setIsEditing(false);
    } else {
      const newtask = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        name: addTask,
        completed: false,
      };
      settodoList(newtask.name !== "" ? [...todoList, newtask] : todoList);
      setaddTask("");
    }
  };

  const handleDelete = (id) => {
    settodoList(todoList.filter((item) => id !== item.id));
  };

  const handleComplete = (id) => {
    settodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: true };
        }
        return task;
      })
    );
  };

  const handleEdit = (id) => {
    const editTask = todoList.find((task) => task.id === id);
    setaddTask(editTask.name);
    setEditId(id);
    setIsEditing(true);
  };

  return (
    <div className="App">
      <div className="addTask">
        <input type="text" onChange={handleChange} value={addTask} />
        <button
          onClick={handleAddTask}
          style={addTask.length == 0 ? { pointerEvents: "none" } : {}}
        >
          {isEditing ? "Edit Task" : "Add Task"}
        </button>
      </div>
      <div className="list">
        {todoList.map((value, index) => {
          return (
            <Task
              key={value.id}
              task={value}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              handleEdit={handleEdit}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ToDoList;
