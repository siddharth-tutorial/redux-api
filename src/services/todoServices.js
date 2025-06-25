// GET
export const fetchTodosAPI = async () => {
  const res = await fetch("https://dummyjson.com/todos");
  if (!res.ok) throw new Error("failed to fetch todos");
  const data = await res.json();
  console.log(data);
  return data.todos;
};
// create add

export const addTodoAPI = async (todoText) => {
  const res = await fetch("https://dummyjson.com/todos/add", {
    method: "POST", // Capitalization also corrected
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ todo: todoText, completed: false, userId: 1 }),
  });

  if (!res.ok) throw new Error("Failed to add todo");

  const data = await res.json();
  console.log("Added todo:", data);
  return data;
};

// delete
export const deleteTodoAPI = async (id) => {
  try {
    const res = await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
    } else {
      const data = await res.json();
      console.log("Deleted from server:", data);
    }
  } catch (error) {
    console.error("Error while deleting:", error);
  }

  // Always return ID so we can update local state
  return id;
};

// update todo

export const updateTodoApi = async ({ id, updatedData }) => {
  const res = await fetch(`https://dummyjson.com/todos/${id}`, {
    method: "PUT" /* or PATCH */,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  const data = await res.json();
  console.log("update",data)
  return data;
};
